'use client';

import { HsCard } from '@/type';
import { useMemo, useState } from 'react';
import Cost from './Cost';
import List from 'rc-virtual-list';
import Image from 'next/image';

/* eslint-disable @next/next/no-img-element */

type DeckContainer = {
  thumbnail?: string;
  author?: string;
  defaultName: string;
  mode: 'show' | 'edit';
  selectedCards?: Map<string, HsCard & { count: number }>;
  onCardClick?(id: string): void;
  onPublish?: (name: string) => void;
};

const DeckContainer = ({
  thumbnail,
  selectedCards,
  defaultName,
  author,
  mode = 'edit',
  onCardClick,
  onPublish,
}: DeckContainer) => {
  const [name, setName] = useState(defaultName);
  const processCards = useMemo(() => {
    return Array.from(selectedCards?.values() || []).sort((n1, n2) => n1.manna - n2.manna);
  }, [selectedCards]);
  const num = useMemo(() => {
    return processCards.reduce((a, sum) => {
      return a + sum.count;
    }, 0);
  }, [processCards]);
  return (
    <div className="flex flex-col h-full max-h-[600px] mx-auto w-[328px] bg-[#372B47]">
      <div className="deckHead">
        <div className="deckAvatar pr-[42px] z-[2] top-[8px]  w-[90%]  relative pl-[8px] mx-auto pt-[16px] h-[92px]">
          <img
            src={thumbnail ?? 'https://pic.imgdb.cn/item/6689730ed9c307b7e9dea892.jpg'}
            className="relative z-[-1]"
            alt=""
          />
          <div className="absolute  bottom-0 bg-[#00000086] flex items-center top-[16px] z-[2] lef-[0] h-[calc(100%-32px)] w-[calc(100%-43px)] ">
            <div className="relative w-[45px]">
              <img
                className="w-full"
                alt=""
                src="https://pic.imgdb.cn/item/66898c9cd9c307b7e909033f.png"
              />
              <img
                src="/pegasus.svg"
                className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[30px]"
                alt=""
              />
            </div>

            <div className="text-[#fff] text-[14px] stroke ml-[8px]">
              {mode === 'edit' ? (
                <input
                  value={name || defaultName || '未命名 请编辑'}
                  className="bg-transparent outline-none border-none"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              ) : (
                <div>{defaultName}</div>
              )}
              <div className="text-[rgb(252,209,68)]">{num ?? 0}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="deckContainer flex-1 w-full relative overflow-y-scroll hideScrollbar">
        <img
          src="https://pic.imgdb.cn/item/668ae290d9c307b7e9ce6bf2.png"
          className="absolute w-[80px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          alt=""
        />
        {processCards.map((i) => (
          <div
            onClick={() => {
              onCardClick?.(i.id);
            }}
            key={i.id}
            className="text-[#fff] cursor-pointer mb-[5px] border-[3px] border-[#555555] rounded-[3px] font-bold h-[32px] text-[14px] flex items-center relative w-[calc(100%-60px)] mx-auto bg-[#2A2828]">
            <div className="absolute translate-x-[-25%] z-[2]">
              <Cost over={999} cost={i.manna} containerClassName="w-[38px] h-[34px]" />
            </div>
            <div className="h-full w-full relative flex items-center border-[1px] border-[#000]">
              <div className="absolute inset-0 overflow-hidden">
                <div className="w-[240%] absolute h-full ">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={i.img}
                    alt=""
                    object-fit="cover"
                    className="absolute  top-0  aspect-[64/97] translate-x-[-126px] translate-y-[-231px]"
                  />
                </div>
              </div>
              <div className="relative z-[2]  pl-[40px]"> {i.name}</div>
            </div>
            <div className="bg-[#2A2828] w-[30px] text-center font-bold text-[rgb(252,209,68)]">
              {i.count > 1 ? i.count : ''}
            </div>
          </div>
        ))}
      </div>
      <div
        className="deckFoot w-full h-[fit-content] aspect-[406/109] flex items-center justify-center"
        onClick={() => {
          if (mode === 'edit') onPublish?.(name);
        }}>
        <div
          style={{
            background: 'linear-gradient(to right,#510E7D,#B320BE,#510E7D)',
          }}
          className="w-[85%] cursor-pointer translate-y-[5px] border-[2px] border-[#a69793] rounded-[8px] flex items-center justify-center h-[40px]  outline outline-[#000] outline-[4px]">
          <div className="text-[16px] line-clamp-1 font-bold text-[#fff] ">
            {mode === 'edit' ? '发布' : `来自${author ?? '佚名'}的卡组`}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeckContainer;
