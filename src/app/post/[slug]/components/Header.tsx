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

        <div className="border-[4px] shadow-lg outline-[#7c221f] outline-[5px] outline border-[#000] ml-[12px] relative z-[2] rounded-[12px]">
          <div className="outline-[#E3D07F] flex outline outline-[3px] px-[24px] py-[3px]  rounded-[12px] border-[2px] border-[#000] font-bold bg-[#FFFF94] text-[rgb(97,67,38)]">
            标准卡组
          </div>
        </div>
        <div className="relative z-10 lg:block hidden">
          <ManaControl onManaClick={onManaClick} selectedMana={mana} />
        </div>
        <div className="border-[2px] w-[fit-content] shadow-lg outline-[#c1b79f] outline-[2px] ml-[24px] outline border-[#d5bebe]  relative z-[2] rounded-[24px]">
          <div className=" outline-[#c2b085] flex items-center outline outline-[3px] px-[16px] text-[14px]  py-[3px]  rounded-[24px] border-[2px] border-[#000]  bg-[#3D0D0D] text-[rgb(97,67,38)]">
            <input
              placeholder="搜索..."
              className="outline-none text-[14px]  py-[3px]  font-bold bg-[#3D0D0D] text-[#fff]"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="h-[110px]" />
    </>
  );
};
export default Header;
