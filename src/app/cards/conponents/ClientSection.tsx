'use client';
import { CardGroupOverview } from '@/type';
import Image from 'next/image';
import CardItem from './CardItem';
import CardGroup from './CardGroup';
import { useMemo, useState } from 'react';
import HsDecks from './HsDecks';

const ClientSection = ({ decks }: { decks: (CardGroupOverview & { pic: string })[] }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedSection, setSelectedSection] = useState<'all' | 'recommend'>('recommend');
  const bestDeck = useMemo(() => {
    const dArr = decks.sort((a, b) => Number(b.winningRate) - Number(a.winningRate));
    return dArr[0];
  }, [decks]);

  const isSelectedAll = selectedSection === 'all';
  const processDecks = useMemo(() => {
    return decks.filter((a) => a.name.includes(searchText));
  }, [searchText, decks]);

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
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
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
        <div className="flex flex-col flex-1">
          <div className="stroke text-[#FFFF94] relative">
            <div className="w-full flex px-[16px] pt-[24px]">
              <div
                style={{
                  backgroundColor: !isSelectedAll ? '#C09B41' : '#ccc',
                  transform: !isSelectedAll ? 'scale(1)' : 'scale(0.85)',
                }}
                onClick={() => {
                  setSelectedSection('recommend');
                }}
                className="px-[12px] text-[14px] cursor-pointer transition-transform origin-bottom py-[6px] rounded-[8px]  rounded-b-none border-[1px]   outline-[#EAD5A8] outline-[2px] outline">
                推荐卡组
              </div>
              {/* <div
                style={{
                  backgroundColor: isSelectedAll ? '#C09B41' : '#ccc',
                  transform: isSelectedAll ? 'scale(1)' : 'scale(0.85)',
                }}
                onClick={() => {
                  setSelectedSection('all');
                }}
                className="ml-[2px] text-[14px] cursor-pointer origin-bottom transition-transform px-[12px] py-[6px] rounded-[8px] rounded-b-none ">
                全卡组
              </div> */}
              <div className="border-1 absolute bottom-0 left-0 right-0 h-[3px] bg-[#5F1615] " />
            </div>
          </div>
          {isSelectedAll ? (
            <HsDecks />
          ) : (
            <div className="flex transition-opacity flex-col px-[16px] w-full pb-[60px] pt-[8px]">
              {processDecks.map((a) => (
                <CardItem key={a.id} {...a} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ClientSection;
