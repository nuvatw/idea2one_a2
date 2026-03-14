import React from 'react';

type Props = {
  score: number;
  onRestart: () => void;
};

export default function GameOverScreen({ score, onRestart }: Props) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-800 border-2 border-gray-600 rounded-lg text-center w-full max-w-sm mx-auto shadow-xl">
      <h1 className="text-4xl font-bold mb-8 text-red-500 tracking-wider">GAME OVER</h1>
      <p className="text-2xl mb-8 text-white font-semibold">Your Score: <span className="text-green-400">{score}</span></p>
      
      <button 
        onClick={onRestart}
        className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-4 px-8 rounded-md transition-colors min-h-[44px] shadow-lg"
      >
        Restart
      </button>
    </div>
  );
}
