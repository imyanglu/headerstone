import Image from 'next/image';
import Link from 'next/link';
import { JobsData } from '../Const';

/* eslint-disable @next/next/no-img-element */

const Heros = JobsData;

const Page = () => {
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
