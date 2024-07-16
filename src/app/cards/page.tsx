/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { HeroDecks, RecommendSection } from './conponents';
import { JobsData } from '../Const';
import { CardGroupOverview } from '@/type';

const fetchData = async () => {
  const cardGroupResult = await fetch('https://8.138.99.181:3000/recommendOverview', {
    cache: 'no-cache',
  }).then((d) => d.json() as Promise<{ cards: CardGroupOverview[] }>);
  const cardsMap = cardGroupResult.cards.map((a) => ({
    ...a,
    pic: JobsData.find((i) => i.slug === a.type)?.pic ?? '',
  }));
  return cardsMap;
};

const Page = async () => {
  const data = await fetchData();
  return (
    <div className="w-[100vw] bg-[#76191A] flex flex-col min-h-[100vh] ">
      <div className="w-full h-[100px] relative flex items-center bg-[#561212] ">
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
        <div className="hidden md:block border-[4px] shadow-lg outline-[#7c221f] outline-[5px] outline border-[#000] ml-[12px] relative z-[2] rounded-[8px]">
          <div className="outline-[#E3D07F] flex outline outline-[3px] px-[24px] py-[3px]  rounded-[6px] border-[2px] border-[#000] font-bold bg-[#FFFF94] text-[rgb(97,67,38)]">
            卡组查询
          </div>
        </div>
      </div>
      <div className="mainSection w-[100vw] bg-[#E8D5AA] px-[24px] py-[16px]">
        <RecommendSection recommendCards={data} />
      </div>
      <div className="h-[4px] w-full bg-[#fff]"></div>
      <div className="h-[2px] mt-[6px] w-full bg-[#fff]"></div>
      <div className="flex flex-col pt-[16px]">
        {JobsData.map((i) => {
          return <HeroDecks key={i.slug} faction={i.slug} />;
        })}
      </div>
    </div>
  );
};
export default Page;
