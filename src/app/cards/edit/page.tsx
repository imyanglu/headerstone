'use client';
import { useRef } from 'react';
import Cards from '../../../../public/data/cards.json';
import { uploadHsCard } from '@/app/api';
const Page = () => {
  const showRef = useRef<HTMLDivElement>(null);
  const upload = async () => {
    const arr = [Cards[0]];
    const errorIds = [];
    for (let i = 0; i < arr.length; i++) {
      try {
        await uploadHsCard(arr[i]);
      } catch (err) {
        errorIds.push(arr[i].id);
      }
    }
  };
  return (
    <div className="w-[100vw] h-[100vh] flex-col justify-center pt-[100px]">
      <div ref={showRef} className="mx-auto text-center">
        0
      </div>
      <div className="bg-[#f00] w-fit mx-auto" onClick={upload}>
        上传
      </div>
    </div>
  );
};
export default Page;
