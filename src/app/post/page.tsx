'use client';
import Image from 'next/image';
import Link from 'next/link';
import { JobsData } from '../Const';
import { useEffect, useRef } from 'react';
import { decodeCode } from '../lib/help';

/* eslint-disable @next/next/no-img-element */

const Heros = JobsData;

const Page = () => {
  const inputRef = useRef();
  const submit = () => {};
  useEffect(() => {
    const result = decodeCode(`
### 铺场骑
# 职业：圣骑士
# 模式：标准模式
#
# 2x (1) 奇迹推销员
# 2x (1) 正义保护者
# 2x (1) 鱼人木乃伊
# 2x (2) 威猛银翼巨龙
# 2x (2) 淘金客
# 2x (2) 采矿事故
# 2x (3) 作战动员
# 2x (3) 决战！
# 1x (3) 戈贡佐姆
# 2x (4) 光速抢购
# 2x (4) 十字军光环
# 1x (4) 布吉舞乐
# 1x (4) 音响工程师普兹克
# 1x (5) 玩具队长塔林姆
# 1x (7) 维和者阿米图斯
# 1x (8) 奇利亚斯豪华版3000型
#   1x (0) 奇利亚斯豪华版3000型
#   1x (3) 输能模块
#   1x (5) 计数模块
# 2x (8) 棱彩光束
# 2x (10) 海巨人
AAECAZ8FBsHEBfTIBY3+BcekBtOpBrrOBgzJoASi1ASU9QWV9QWFjgaZjga8jwb1lQbOnAbUngaSoAbeugYAAQPzswbHpAb2swbHpAbo3gbHpAYAAA==
`);
    console.log(result);
  }, []);
  return (
    <div className="w-[100vw]  relative min-h-[100vh] p-[24px] bg-[#711B1C]">
      <div className="w-[100vw] bottom-0 bg-[#000000] z-[-2]  absolute top-0 left-0">
        <img
          src="https://pic.imgdb.cn/item/66851590d9c307b7e91cba2a.jpg"
          className="w-full h-full"
          alt=""
        />
      </div>
      <div className="flex justify-center items-center">
        <div className="relative w-[80px] h-[80px]">
          <Image src="/standard.svg" fill alt="" />
        </div>
        <div className="text-[#fff] font-bold text-center text-[24px] mt-[6px] ml-[12px]">
          标准卡组
        </div>
      </div>
      <div className="border-[2px] w-[fit-content] shadow-lg outline-[#500f10] outline-[2px] ml-[24px] outline border-[#501516]  relative z-[2] rounded-[12px]">
        <div className=" outline-[#c2b085] flex items-center outline outline-[3px] px-[16px] text-[14px]  py-[3px]  rounded-[12px] border-[2px] border-[#000]  bg-[#3D0D0D] text-[rgb(97,67,38)]">
          <input
            placeholder="代码..."
            className="outline-none text-[14px]  py-[5px]  font-bold bg-[#3D0D0D] text-[#fff]"
            onChange={(e) => {}}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 mt-[24px] md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-[8px] sm:gap-[20px]">
        {Heros.map((item, index) => {
          return (
            <Link
              href="/post/[slug]"
              as={`/post/${item.slug}`}
              key={index}
              className="relative p-[4px] sm:p-[20px] w-full aspect-[6/5]">
              <img src={item.pic} className="w-full cursor-pointer aspect-[6/5]  workCard" alt="" />
              <div className="absolute  sm:scale-1 top-[68%] text-[12px] sm:text-[14px] md:text-[14px] font-bold text-center left-[50%] translate-x-[-50%] text-[rgb(252,209,68)]">
                {item.name}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Page;
