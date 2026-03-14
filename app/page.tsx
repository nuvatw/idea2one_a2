"use client";

import { useState } from 'react';
import StartScreen from '@/components/StartScreen';
import GameBoard from '@/components/GameBoard';
import GameOverScreen from '@/components/GameOverScreen';
import { GameState } from '@/types/game';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [finalScore, setFinalScore] = useState(0);

  const startGame = () => {
    setFinalScore(0);
    setGameState('playing');
  };

  const handleGameOver = (score: number) => {
    setFinalScore(score);
    setGameState('gameover');
  };

  return (
    <main className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg mx-auto flex items-center justify-center">
        {gameState === 'idle' && <StartScreen onStart={startGame} />}
        {gameState === 'playing' && <GameBoard onGameOver={handleGameOver} />}
        {gameState === 'gameover' && <GameOverScreen score={finalScore} onRestart={startGame} />}
      </div>
    </main>
  );
}
