import { Direction } from '@/types/game';

export const DIRECTIONS = {
  UP: { x: 0, y: -1 } as Direction,
  DOWN: { x: 0, y: 1 } as Direction,
  LEFT: { x: -1, y: 0 } as Direction,
  RIGHT: { x: 1, y: 0 } as Direction,
};

export const isOppositeDirection = (dir1: Direction, dir2: Direction) => {
  return dir1.x === -dir2.x && dir1.y === -dir2.y;
};
