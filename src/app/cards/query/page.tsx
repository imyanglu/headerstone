'use client';
import { AutoSizer, List } from 'react-virtualized';
import Cards from '../../../../public/data/cards.json';
import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { Cost } from '@/app/components';

type Card = {
  artist: string;
  cardClass: string;
  collectible: boolean;
  cost: number;
  dbfId: number;
  flavor: string;
  id: number;
  name: string;
  rarity: string;
  set: string;
  spellSchool: string;
  text: string;
  type: string;
};

const Page = () => {
  const allCards = useRef<Card[]>(Cards);
  const [s, setS] = useState('');
  const processCards = useMemo(() => {
    return allCards.current.filter((i) => i.name.includes(s));
  }, [s]);
  return (
    <div className="w-full  h-[100vh] flex flex-col">
      <div className="fixed top-0 z-[10] w-full h-[100px] flex items-center bg-[#561212] ">
        <div className="absolute top-[1px] z-[10] h-[30px] w-full ">
          <Image src="https://pic.imgdb.cn/item/6683b127d9c307b7e99abe59.png" alt="" fill />
        </div>
        <div className="absolute top-0 bottom-0 w-full h-[100px] shadow-lg">
          <Image fill alt="bg1" src="https://pic.imgdb.cn/item/6683ae9bd9c307b7e993615e.jpg" />
        </div>
        <div className="absolute bottom-0 h-[20px] w-full">
          <Image src="https://pic.imgdb.cn/item/6683b07cd9c307b7e998b6a1.png" alt="" fill />
        </div>
        <a
          href="/"
          className="relative z-2 px-[24px] text-[#fff] font-bold text-[16px] md:text-[26px]">
          LSCX.Xyz
        </a>
        <div className="hidden md:block border-[4px] shadow-lg outline-[#681715] outline-[5px] outline border-[#000] ml-[12px] relative z-[2] rounded-[8px]">
          <div className="outline-[#E3D07F] flex outline outline-[3px] px-[24px] text-[16px] py-[4px]  rounded-[6px] border-[2px] border-[#000] font-bold bg-[#FFFF94] text-[rgb(97,67,38)]">
            单卡查询
          </div>
        </div>
        <div className="ml-auto relative z-[3] mr-[24px] flex items-center">
          {/* <a className="flex outline outline-[3px] px-[16px] text-[12px] sm:text-[16px] py-[4px]  rounded-[6px] border-[2px]  font-bold bg-[#FFFF94] text-[rgb(97,67,38)]">
            新卡速递🥵
          </a> */}

          <a
            href="/decks"
            className="flex ml-[4px] sm:ml-[12px]  text-[12px] px-[16px] sm:text-[16px] py-[4px]  rounded-[6px]  font-bold  text-[#fff]">
            卡组查询
          </a>
        </div>
      </div>
      <div className="h-[100px] " />
      <div className="flex-1 mainSection bg-[#E8D6A8] pt-[4px] px-[24px]">
        <div className="text-[14px]">卡牌数:{processCards.length}</div>
        <div className="mb-[12px] outline-[#c2b085] w-fit mx-auto flex items-center outline outline-[3px] px-[16px] text-[14px]  py-[3px]  rounded-[24px] border-[2px] border-[#5b5656]  bg-[#fff] text-[rgb(97,67,38)]">
          <input
            value={s}
            placeholder="搜索..."
            className="outline-none text-[14px]  py-[3px]  font-bold bg-[#fff] text-[#000]"
            onChange={(e) => setS(e.target.value)}
          />
          <div
            className="h-[30px] w-[30px] cursor-pointer absolute right-[10px]  flex items-center justify-end"
            onClick={() => {}}>
            <img src="/search.svg" alt="search" className="w-[24px] h-[24px]" />
          </div>
        </div>
        <AutoSizer>
          {({ height, width }) => (
            <List
              rowCount={processCards.length}
              rowHeight={73}
              height={height}
              width={width}
              rowRenderer={({ index, style, key }) => {
                const i = processCards[index];
                return (
                  <div style={style} key={key}>
                    <div className="flex items-center h-[72px] relative">
                      <Cost over={9999} cost={i.cost} containerClassName="scale-[0.75]" />

                      <div className="font-bold">{i.name}</div>
                      <div className="ml-[12px]">
                        <div dangerouslySetInnerHTML={{ __html: i.text }} />
                      </div>
                      <div className="absolute  bottom-0 left-0 h-[1px] w-full bg-black"></div>
                    </div>
                  </div>
                );
              }}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  );
};
export default Page;
