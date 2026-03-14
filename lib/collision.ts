import { Position } from '@/types/game';

export const isWallCollision = (head: Position, gridSize: number) => {
  return head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize;
};

export const isSelfCollision = (head: Position, snake: Position[]) => {
  // We check if the head collides with any segment of the body
  return snake.some((segment, index) => {
    // skip the head itself
    if (index === 0) return false;
    return segment.x === head.x && segment.y === head.y;
  });
};
