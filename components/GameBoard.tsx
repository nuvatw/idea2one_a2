"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Position } from '@/types/game';
import { GRID_SIZE, GAME_TICK, INITIAL_SNAKE } from '@/lib/gameEngine';
import { DIRECTIONS, isOppositeDirection } from '@/lib/direction';
import { isWallCollision, isSelfCollision } from '@/lib/collision';
import { getRandomFoodPosition } from '@/lib/food';
import ScoreBoard from './ScoreBoard';

type Props = {
  onGameOver: (score: number) => void;
};

export default function GameBoard({ onGameOver }: Props) {
  const [snakeState, setSnakeState] = useState<Position[]>(INITIAL_SNAKE);
  const [foodState, setFoodState] = useState<Position>({ x: 5, y: 7 });
  const [scoreState, setScoreState] = useState(0);

  const snakeRef = useRef(INITIAL_SNAKE);
  const foodRef = useRef({ x: 5, y: 7 });
  const directionRef = useRef(DIRECTIONS.RIGHT);
  const nextTargetDirectionRef = useRef(DIRECTIONS.RIGHT); // to prevent rapid double turns
  const scoreRef = useRef(0);
  
  const requestRef = useRef<number>(0);
  const lastUpdateTimeRef = useRef(0);
  const isGameOverRef = useRef(false);

  // Initialize food properly on mount
  useEffect(() => {
    const initialFood = getRandomFoodPosition(INITIAL_SNAKE, GRID_SIZE);
    foodRef.current = initialFood;
    setFoodState(initialFood);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Prevent default scrolling for arrow keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }
    
    let newDir = directionRef.current;
    
    switch (e.key) {
      case 'ArrowUp':
        newDir = DIRECTIONS.UP;
        break;
      case 'ArrowDown':
        newDir = DIRECTIONS.DOWN;
        break;
      case 'ArrowLeft':
        newDir = DIRECTIONS.LEFT;
        break;
      case 'ArrowRight':
        newDir = DIRECTIONS.RIGHT;
        break;
      default:
        return;
    }

    // prevent reversing
    if (!isOppositeDirection(directionRef.current, newDir)) {
      nextTargetDirectionRef.current = newDir;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const gameLoop = useCallback(function loop(time: number) {
    if (isGameOverRef.current) return;
    
    if (time - lastUpdateTimeRef.current >= GAME_TICK) {
      // update direction for this tick
      directionRef.current = nextTargetDirectionRef.current;
      
      const head = snakeRef.current[0];
      const dir = directionRef.current;
      const newHead = { x: head.x + dir.x, y: head.y + dir.y };

      // Wall collision
      if (isWallCollision(newHead, GRID_SIZE)) {
        isGameOverRef.current = true;
        onGameOver(scoreRef.current);
        return;
      }

      // Self collision -> check against current snake
      if (isSelfCollision(newHead, snakeRef.current)) {
        isGameOverRef.current = true;
        onGameOver(scoreRef.current);
        return;
      }

      const newSnake = [newHead, ...snakeRef.current];

      // Food collision
      if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
        scoreRef.current += 10;
        setScoreState(scoreRef.current);
        
        // Grow snake significantly by duplicating the tail
        const tail = newSnake[newSnake.length - 1];
        for (let i = 0; i < 4; i++) {
          newSnake.push({ ...tail });
        }
        
        const newFood = getRandomFoodPosition(newSnake, GRID_SIZE);
        foodRef.current = newFood;
        setFoodState(newFood);
      } else {
        newSnake.pop(); // remove tail if no food eaten
      }

      snakeRef.current = newSnake;
      setSnakeState([...newSnake]);
      
      lastUpdateTimeRef.current = time;
    }
    
    requestRef.current = requestAnimationFrame(loop);
  }, [onGameOver]);

  useEffect(() => {
    lastUpdateTimeRef.current = performance.now();
    requestRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameLoop]);

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <ScoreBoard score={scoreState} />
      <div 
        className="grid bg-[#2A2A2A] border-4 border-gray-600 rounded-lg shadow-xl shadow-black/50" 
        style={{ 
          gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
          width: '100%',
          aspectRatio: '1 / 1', // remain square
          maxWidth: '400px',
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const isSnake = snakeState.some(s => s.x === x && s.y === y);
          const isHead = snakeState[0]?.x === x && snakeState[0]?.y === y;
          const isFood = foodState.x === x && foodState.y === y;

          return (
            <div 
              key={i} 
              className={`w-full h-full border border-white/5 ${
                isHead ? 'bg-green-400 rounded-sm z-10' :
                isSnake ? 'bg-green-600 rounded-sm' : 
                isFood ? 'bg-red-500 rounded-full scale-75 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 
                'bg-transparent'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
