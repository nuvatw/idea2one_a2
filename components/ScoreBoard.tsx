import React from 'react';

type Props = {
  score: number;
};

export default function ScoreBoard({ score }: Props) {
  return (
    <div className="w-full text-center py-4 mb-4 bg-gray-800 border-2 border-gray-600 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-white tracking-wide">
        Score: <span className="text-green-400">{score}</span>
      </h2>
    </div>
  );
}
