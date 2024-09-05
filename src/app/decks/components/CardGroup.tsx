'use client';

import { CardGroupOverview } from '@/type';
import CopyBtn from './CopyBtn';
import { DeckByHs } from '@/app/lib/data';
import { useMemo } from 'react';
import { JobsData } from '@/app/Const';
import { generateDeckInfo } from '@/app/lib/help';

/* eslint-disable @next/next/no-img-element */

const CardGroup = ({
  name,
  winRate,
  playerClass,
  id,
  slug,
  cards,
  deckSideboard,
  format,
}: DeckByHs) => {
  const { HeroPic, code } = useMemo(() => {
    const { code } = generateDeckInfo({
      format,
      playerClass,
      components: cards,
      sideboardCards: deckSideboard,
      slug,
    });

    return { HeroPic: JobsData.find((a) => a.slug === slug)?.pic, code };
  }, [slug]);
  return (
    <div className="flex flex-col w-[220px] items-center mx-auto">
      <a href={`/decks/${id}`}>
        <img src={HeroPic} className="w-[160px] h-[132px]" alt="" />
      </a>
      <div className="text-[rgb(33,163,25)] font-bold mt-[2px] text-[12px]">胜率{winRate}%</div>
      <a
        className="w-[200px] text-[20px] text-[#FFFF94] text-center font-bold"
        href={`/decks/${id}`}>
        {name}
      </a>
      {code && (
        <div className="border-[4px] mt-[12px] shadow-lg outline-[#e1c892] outline-[5px] outline border-[#000]  relative  rounded-[10px]">
          <div className=" outline-[#E3D07F] flex items-center outline outline-[3px] pl-[8px] text-[14px]  py-[3px]  rounded-[10px] border-[2px] border-[#000]  bg-[#3D0D0D] text-[#fff]">
            <div className="flex-1 line-clamp-1 break-all">{code}</div>
            <CopyBtn code={code} />
          </div>
        </div>
      )}
    </div>
  );
};
export default CardGroup;
