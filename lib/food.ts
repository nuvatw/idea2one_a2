import { Position } from '@/types/game';

export const getRandomFoodPosition = (snake: Position[], gridSize: number): Position => {
  let newFood: Position;
  while (true) {
    newFood = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
    // check if on snake
    const isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    if (!isOnSnake) break;
  }
  return newFood;
};
