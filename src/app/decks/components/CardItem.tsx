/* eslint-disable @next/next/no-img-element */
import { JobsData } from '@/app/Const';

import CopyBtn from './CopyBtn';
import { DeckByHs } from '@/app/lib/data';
import { useMemo } from 'react';
import { generateDeckInfo } from '@/app/lib/help';

const getTime = (time: number) => {
  if (!time) return '--';

  return (time / 60).toFixed(1) + '分';
};
const CardItem = (data: DeckByHs) => {
  const { name, winRate, id, costTime, playerClass, cards, deckSideboard } = data;
  const hero = JobsData.find((a) => a.slug === data.slug);
  const { code, forge } = useMemo(() => {
    return generateDeckInfo({
      format: 2,
      playerClass,
      components: cards,
      sideboardCards: deckSideboard,
    });
  }, []);
  if (!hero) return null;
  return (
    <>
      <div className="py-[12px] flex w-full items-center">
        <img className=" w-[32px] h-[32px] rounded-full" src={hero.weapon} alt="" />
        <div className="w-[80px] sm:w-[120px] ml-[16px]">
          <a href={`/decks/${id}`} className="font-bold line-clamp-1 break-all">
            {name}
          </a>
          <div className="flex items-center mt-[4px] h-[18px]">
            {forge && (
              <>
                <img
                  className="w-[12px] h-[17px]"
                  src="https://pic.imgdb.cn/item/6697b0ddd9c307b7e96455fc.png"
                  alt=""
                />
                <p className="text-[12px] ml-[4px]">{forge}</p>
              </>
            )}
          </div>
        </div>
        <div className={`ml-[8px] w-[150px] text-[12px] sm:text-[16px] `}>
          胜率:&nbsp;
          <strong className="text-[rgb(31,173,30)]">
            {Number(winRate) === 0 ? '--' : winRate + '%'}
          </strong>
        </div>
        <div className="text-[14px] font-bold pl-[12px] w-[150px] hidden sm:block ">
          平均用时:🕒{getTime(costTime)}
        </div>
        <div
          className={`border-[4px]   md:w-[200px] ml-auto mt-[4px] shadow-lg outline-[#e1c892] outline-[5px] outline border-[#000]  relative z-[2] rounded-[10px] ${'w-[115px]'}`}>
          <div className=" outline-[#E3D07F] flex items-center outline outline-[3px] pl-[8px] text-[14px]  py-[3px]  rounded-[10px] border-[2px] border-[#000]  bg-[#3D0D0D] text-[#fff]">
            <div className="flex-1 line-clamp-1 break-all">{code}</div>
            {code && <CopyBtn code={code} />}
          </div>
        </div>
      </div>
      <div className="w-full h-[2px] bg-black" />
    </>
  );
};
export default CardItem;
