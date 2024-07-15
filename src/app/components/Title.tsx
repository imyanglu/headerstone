/* eslint-disable @next/next/no-img-element */
import { ReactNode } from 'react';
import { JobsData } from '../Const';

type Title = {
  label: ReactNode;
  type?: (typeof JobsData)[number]['slug'] | 'neutral';
};
const Title = ({ label = 'title', type = 'neutral' }: Title) => {
  return (
    <div className="flex justify-center  py-[20px] min-w-[250px] h-[68px] relative items-center">
      <div className="opacity-[0.4] flex-1 hidden sm:flex">
        <img
          src="https://pic.imgdb.cn/item/66840de1d9c307b7e965a9ee.png"
          className="w-[20px] h-[30px] max-w-[none]"
          alt=""
        />
        <img
          src="https://pic.imgdb.cn/item/66840d03d9c307b7e963b6f7.png"
          className="w-[250px] flex-1  max-w-[none] hidden sm:block h-[10px]"
          alt=""
        />
        <img
          src="https://pic.imgdb.cn/item/66840e73d9c307b7e966d6ce.png"
          className="w-[20px] h-[10px]"
          alt=""
        />
      </div>

      <div className="w-[250px] mx-[24px] relative">
        <img src={`/${type}-title.svg`} className="w-[250px] max-w-[none]" alt="" />
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          {label}
        </div>
      </div>
      <div className="opacity-[0.4] flex-1  hidden sm:flex">
        <img
          src="https://pic.imgdb.cn/item/66840f5dd9c307b7e968b267.png"
          className="w-[20px] h-[10px] max-w-[none]"
          alt=""
        />
        <img
          src="https://pic.imgdb.cn/item/66840d03d9c307b7e963b6f7.png"
          className="flex-1 max-w-[none] h-[10px] hidden sm:block"
          alt=""
        />
        <img
          src="https://pic.imgdb.cn/item/66840fd4d9c307b7e969a71b.png"
          className="w-[20px] h-[30px]"
          alt=""
        />
      </div>
    </div>
  );
};
export default Title;
