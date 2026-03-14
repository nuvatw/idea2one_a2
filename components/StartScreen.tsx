import React from 'react';
import Image from 'next/image';

type Props = {
  onStart: () => void;
};

export default function StartScreen({ onStart }: Props) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-800 border-2 border-gray-600 rounded-lg text-center w-full max-w-sm mx-auto shadow-xl">
      <div className="mb-6 flex justify-center">
        <Image
          src="/white nuva logo.png"
          alt="Nuva Logo"
          width={150}
          height={60}
          priority
          className="object-contain"
          style={{ width: 'auto', height: '60px' }}
        />
      </div>
      <h1 className="text-4xl font-bold mb-8 text-green-400 tracking-wider">SNAKE GAME</h1>
      <p className="mb-8 text-gray-300">Press Start to Play</p>
      
      <button 
        onClick={onStart}
        className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-4 px-8 rounded-md mb-8 transition-colors min-h-[44px] shadow-lg"
      >
        START
      </button>
      
      <p className="text-sm text-gray-400">Use Arrow Keys to Move</p>
    </div>
  );
}
