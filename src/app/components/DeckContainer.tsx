'use client';

import { Card } from '@/type';
import { useMemo, useState } from 'react';
import Cost from './Cost';

/* eslint-disable @next/next/no-img-element */

type DeckContainer = {
  selectedCards?: Map<string, Card & { count: number }>;
  onPublish?: () => void;
};

const DeckContainer = ({ selectedCards, onPublish }: DeckContainer) => {
  const [name, setName] = useState('卡组名 点击编辑');
  const processCards = useMemo(() => {
    return Array.from(selectedCards?.values() || []).sort((n1, n2) => n1.cost - n2.cost);
  }, [selectedCards]);
  return (
    <div className="flex flex-col h-full max-h-[600px] mx-auto w-[328px] bg-[#372B47]">
      <div className="deckHead">
        <div className="deckAvatar pr-[42px] z-[2] w-[90%] translate-y-[12px] relative pl-[14px] mx-auto pt-[16px] overflow-hidden pb-[12px]">
          <img
            src="https://pic.imgdb.cn/item/6689730ed9c307b7e9dea892.jpg"
            className="relative z-[-1]"
            alt=""
          />
          <div className="absolute bg-[#00000086] flex items-center top-[16px] z-[2] lef-[0] h-[calc(100%-28px)] w-[calc(100%-56px)] ">
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
              <input
                value={name}
                className="bg-transparent outline-none border-none"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <div className="text-[rgb(252,209,68)]">0/30</div>
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
            key={i.id}
            className="text-[#fff] cursor-pointer mb-[5px] border-[3px] border-[#555555] rounded-[3px] font-bold h-[32px] text-[14px] flex items-center relative w-[calc(100%-60px)] mx-auto bg-[#2A2828]">
            <div className="absolute translate-x-[-25%]">
              <Cost over={999} cost={i.cost} containerClassName="w-[38px] h-[34px]" />
            </div>
            <div
              className=" h-full w-full flex items-center pl-[40px] border-[1px] border-[#000]"
              style={{
                backgroundImage: `url(${i.pic})`,
                backgroundPosition: '40% 30%',
                backgroundSize: '240%',
              }}>
              {i.name}
            </div>
            <div className="bg-[#2A2828] w-[30px] text-center font-bold text-[rgb(252,209,68)]">
              {i.count > 1 ? i.count : ''}
            </div>
          </div>
        ))}
      </div>
      <div
        className="deckFoot w-full h-[fit-content] aspect-[406/109] flex items-center justify-center"
        onClick={onPublish}>
        <div
          style={{
            background: 'linear-gradient(to right,#510E7D,#B320BE,#510E7D)',
          }}
          className="w-[85%] cursor-pointer translate-y-[5px] border-[2px] border-[#a69793] rounded-[8px] flex items-center justify-center h-[40px]  outline outline-[#000] outline-[4px]">
          <div className="text-[16px] font-bold text-[#fff] ">发布</div>
        </div>
      </div>
    </div>
  );
};
export default DeckContainer;
