'use client';

import { CardGroupOverview } from '@/type';
import CopyBtn from './CopyBtn';

/* eslint-disable @next/next/no-img-element */

const CardGroup = ({ code, name, pic, winningRate, id }: CardGroupOverview & { pic: string }) => {
  return (
    <div className="flex flex-col w-[220px] items-center mx-auto">
      <a href={`/cards/${id}`}>
        <img src={pic} className="w-[160px] h-[132px]" alt="" />
      </a>
      <div className="text-[rgb(33,163,25)] font-bold mt-[2px] text-[12px]">胜率{winningRate}%</div>
      <a
        className="w-[200px] text-[20px] text-[#614326] text-center font-bold"
        href={`/cards/${id}`}>
        {name}
      </a>
      <div className="border-[4px] mt-[4px] shadow-lg outline-[#e1c892] outline-[5px] outline border-[#000]  relative z-[2] rounded-[10px]">
        <div className=" outline-[#E3D07F] flex items-center outline outline-[3px] pl-[8px] text-[14px]  py-[3px]  rounded-[10px] border-[2px] border-[#000]  bg-[#3D0D0D] text-[#fff]">
          <div className="flex-1 line-clamp-1 break-all">{code}</div>
          {code && <CopyBtn code={code} />}
        </div>
      </div>
    </div>
  );
};
export default CardGroup;
