/* eslint-disable @next/next/no-img-element */
import { ManaControl } from '@/app/components';
import Image from 'next/image';
import { useRef } from 'react';

type Header = {
  mana?: number[];
  onManaClick?: (mana: number) => void;
  onSearch(s: string): void;
};

const Header = ({ mana, onSearch, onManaClick }: Header) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <div className="w-full h-[100px]  flex items-center shrink-0 fixed top-0 left-0 right-0">
        <div className="absolute top-[1px] z-[10] h-[40px] w-full ">
          <Image src="https://pic.imgdb.cn/item/6683b127d9c307b7e99abe59.png" alt="" fill />
        </div>
        <div className="absolute top-0 bottom-0 w-full h-[100px] shadow-lg">
          <Image fill alt="bg1" src="https://pic.imgdb.cn/item/6683ae9bd9c307b7e993615e.jpg" />
        </div>
        <div className="absolute bottom-0 h-[20px] w-full">
          <Image src="https://pic.imgdb.cn/item/6683b07cd9c307b7e998b6a1.png" alt="" fill />
        </div>

        <img
          className="relative  z-[2] w-[50px] ml-[24px] shake1"
          alt=""
          src="https://pic.imgdb.cn/item/6683bbedd9c307b7e9b96d01.webp"
        />
        <div className="border-[4px] shadow-lg outline-[#7c221f] outline-[5px] outline border-[#000] ml-[12px] relative z-[2] rounded-[24px]">
          <div className="outline-[#E3D07F] flex outline outline-[3px] px-[24px] py-[3px]  rounded-[24px] border-[2px] border-[#000] font-bold bg-[#FFFF94] text-[rgb(97,67,38)]">
            标准卡组
          </div>
        </div>
        <div className="relative z-10 lg:block hidden">
          <ManaControl onManaClick={onManaClick} selectedMana={mana} />
        </div>
      </div>
      <div className="h-[110px]" />
    </>
  );
};
export default Header;
