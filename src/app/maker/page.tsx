'use client';
import { Metadata } from 'next';
import { title } from 'process';
import { useContext, useEffect, useRef } from 'react';

const Page = () => {
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const init = () => {
    contextRef.current = canvas.current?.getContext('2d') || null;
    const img = new Image();
    img.src = '/card/mainSection/regular.webp';
    img.onload = () => {
     
      contextRef.current?.drawImage(img, 0, 0);
    };
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="flex">
      <div>选择</div>
      <div className="w-[400px] h-[600px] bg-[#ccc]">
        <canvas ref={canvas} />
      </div>
    </div>
  );
};
export default Page;
