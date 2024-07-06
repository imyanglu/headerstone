'use client';

import { Card } from '@/type';
import { useState } from 'react';

/* eslint-disable @next/next/no-img-element */

const DeckContainer = () => {
  const [name, setName] = useState('圣骑士');
  const [cards, setCards] = useState<Card[]>([]);
  return (
    <div className="flex flex-col h-[fit-content] mx-auto w-[328px]">
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
      <div className="deckContainer h-[500px] w-full"></div>
      <div className="deckFoot w-full h-[fit-content] aspect-[406/109]"></div>
    </div>
  );
};
export default DeckContainer;
