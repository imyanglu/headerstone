'use client';

import { useEffect, useState } from 'react';
import useToast from '../lib/hooks';
import Toast from '../components/Toast';
import { getRankList } from '../api';
import { AutoSizer, List } from 'react-virtualized';
import Image from 'next/image';
const Page = () => {
  const { addToast } = useToast();

  const [rankList, setRankList] = useState<{
    pagination: { totalPages: number; totalSize: number };
    users: Array<{ rank: number; accountid: string }>;
  } | null>(null);

  const initRankList = async () => {
    getRankList().then((d) => {
      setRankList(d.data.rankList);
    });
  };

  useEffect(() => {
    initRankList();
  }, []);

  return (
    <div className="h-[100vh] bg-[#E8D4A8]  flex flex-col">
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
            亚服标准榜
          </div>
        </div>
        <div className="ml-auto relative z-[3] mr-[24px] flex items-center">
          <a
            href="/decks"
            className="flex px-[16px] text-[12px] sm:text-[16px] py-[4px] text-[#fff]  font-bold  ">
            卡组查询
          </a>
          <a
            href="/cards/query"
            className="flex ml-[4px] sm:ml-[12px]  text-[12px] px-[16px] sm:text-[16px] py-[4px]  rounded-[6px]  font-bold  text-[#fff]">
            卡牌库
          </a>
        </div>
      </div>
      <div className="h-[100px]"></div>

      <div className="h-full flex-1 max-w-[1000px] mx-auto shrink-0 min-h-[300px] w-[80%] ">
        <AutoSizer>
          {({ height, width }) => (
            <List
              rowCount={rankList?.users.length || 0}
              rowHeight={60}
              height={height}
              width={width}
              rowRenderer={({ index, style, key }) => {
                const u = rankList?.users[index];
                return (
                  <div
                    style={{ ...style, backgroundColor: index % 2 === 0 ? '#D9C69A' : '#E8D4A8' }}
                    key={key}
                    className="h-[60px] flex items-center px-[24px]">
                    <div className="relative w-[50px] h-[50px]">
                      <Image src="/std-rank.avif" fill alt="" />
                      <div className="inset-0 font-bold leading-[50px] text-center text-[#fff] stroke absolute">
                        {u?.rank}
                      </div>
                    </div>
                    <div className="font-bold ml-[12px] text-[#65482A]">{u?.accountid}</div>
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
