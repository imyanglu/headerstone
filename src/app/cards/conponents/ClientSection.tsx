'use client';
import { CardGroupOverview } from '@/type';
import Image from 'next/image';
import CardItem from './CardItem';
import CardGroup from './CardGroup';
import { checkPrimeSync } from 'crypto';
const ClientSection = ({ decks }: { decks: (CardGroupOverview & { pic: string })[] }) => {
  const bestDeck = decks.sort((a, b) => Number(b.winningRate) - Number(a.winningRate))[0];
  return (
    <div className="w-[100vw] bg-[#76191A] flex flex-col min-h-[100vh] ]">
      <div className="fixed top-0 w-full h-[100px] flex items-center bg-[#561212] ">
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
        <div className="hidden md:block border-[4px] shadow-lg outline-[#7c221f] outline-[5px] outline border-[#000] ml-[12px] relative z-[2] rounded-[8px]">
          <div className="outline-[#E3D07F] flex outline outline-[3px] px-[24px] text-[16px] py-[4px]  rounded-[6px] border-[2px] border-[#000] font-bold bg-[#FFFF94] text-[rgb(97,67,38)]">
            卡组查询
          </div>
        </div>
        <div className="ml-[32px] mr-[12px] md:mr-[24px] border-[3px] shadow-lg outline-[#7c221f] outline-[5px] outline border-[#000]  relative z-[20] rounded-[12px]">
          <div className=" outline-[#E3D07F] flex items-center outline outline-[3px] px-[16px] text-[14px]  py-[3px]  rounded-[12px] border-[2px] border-[#000]  bg-[#3D0D0D] text-[rgb(97,67,38)]">
            <input
              placeholder="搜索卡组..."
              className="outline-none text-[14px] w-full md:w-[180px]  py-[4px]  font-bold bg-[#3D0D0D] text-[#fff]"
            />
            <div className="h-[30px] w-[30px] cursor-pointer absolute right-[10px]  flex items-center justify-end">
              <img src="/search.svg" alt="search" className="w-[24px] h-[24px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[100px]" />
      <div className="flex-1 mainSection flex flex-col lg:flex-row">
        <div className="lg:w-[300px] w-full shrink-0 bg-[#531211] pb-[20px]">
          <div className="text-[#fff] font-bold text-center py-[16px]">卡组推荐</div>
          <CardGroup {...bestDeck} />
        </div>
        <div className="flex flex-col px-[16px] w-full pb-[60px]">
          {decks.map((d) => (
            <CardItem key={d.id} {...d} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default ClientSection;
