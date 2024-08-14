'use client';

import { useEffect, useMemo, useState } from 'react';

import { AutoSizer, List } from 'react-virtualized';
import Image from 'next/image';
import useToast from '../lib/hooks';

const Page = ({
  rankList,
}: {
  rankList: {
    pagination: { totalPages: number; totalSize: number };
    users: Array<{ idx: number; name: string }>;
  } | null;
}) => {
  const { addToast } = useToast();
  const [s, setS] = useState('');

  const processUsers = useMemo(() => {
    const users = rankList?.users ?? [];
    return users.filter((u) => u.name.includes(s));
  }, [s, rankList]);
  useEffect(() => {
    if (!rankList) {
      addToast({ type: 'error', title: '', message: '加载失败,请稍后刷新浏览器重试!' });
    }
  }, []);
  return (
    <>
      <div className="mb-[12px] px-[16px] flex justify-center items-center relative">
        <div className="hidden md:block text-[#fff] stroke font-bold text-[12px] absolute left-[24px]">
          传说总人数：{rankList?.users.length ?? '无效'}
        </div>
        <div className="w-[300px] mx-auto outline-[#c2b085] flex items-center outline outline-[3px] px-[16px] text-[14px]  py-[3px]  rounded-[24px] border-[2px] border-[#000]  bg-[#E8D4A8] text-[rgb(97,67,38)]">
          <input
            placeholder="搜索..."
            className="outline-none text-[14px]  py-[3px]  font-bold bg-[#E8D4A8] text-[#65482A]"
            onChange={(e) => {
              setS(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="block mb-[12px] md:hidden text-[#fff] stroke font-bold text-[12px] text-center">
        传说总人数：{rankList?.users.length ?? '无效'}
      </div>
      <div className="h-full flex-1 max-w-[1000px] mx-auto shrink-0 min-h-[300px] w-[80%] ">
        <AutoSizer>
          {({ height, width }) => {
            if (!rankList) return <div className="text-center font-bold" style={{ width }}></div>;
            return (
              <List
                rowCount={processUsers.length || 0}
                rowHeight={60}
                height={height}
                width={width}
                rowRenderer={({ index, style, key }) => {
                  const u = processUsers[index];
                  return (
                    <div
                      style={{ ...style, backgroundColor: index % 2 === 0 ? '#D9C69A' : '#E8D4A8' }}
                      key={key}
                      className="h-[60px] flex items-center xs:px-[4px] md:px-[24px]">
                      <div className="relative w-[50px] h-[50px]">
                        <Image src="/std-rank.avif" fill alt="" />
                        <div className="inset-0 font-bold leading-[50px] text-center text-[#fff] stroke absolute">
                          {u?.idx}
                        </div>
                      </div>
                      <div className="font-bold ml-[12px] text-[#65482A]">{u?.name}</div>
                    </div>
                  );
                }}
              />
            );
          }}
        </AutoSizer>
      </div>
    </>
  );
};
export default Page;
