'use client';
/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';

const Header = ({ code }: { code: string }) => {
  const copyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      alert('复制成功');
    });
  };
  return (
    <div className="w-full h-[80px]  flex items-center shrink-0 fixed top-0 left-0 right-0">
      <div className="absolute top-[1px] z-[10] h-[40px] w-full ">
        <Image src="https://pic.imgdb.cn/item/6683b127d9c307b7e99abe59.png" alt="" fill />
      </div>
      <div className="absolute top-0 bottom-0 w-full h-[80px] shadow-lg">
        <Image fill alt="bg1" src="https://pic.imgdb.cn/item/6683ae9bd9c307b7e993615e.jpg" />
      </div>
      <div className="absolute bottom-0 h-[20px] w-full">
        <Image src="https://pic.imgdb.cn/item/6683b07cd9c307b7e998b6a1.png" alt="" fill />
      </div>

      <div className="border-[4px] shadow-lg outline-[#7c221f] outline-[5px] outline border-[#000] ml-[12px] relative z-[2] rounded-[8px]">
        <div className="outline-[#E3D07F] flex outline outline-[3px] px-[24px] py-[3px]  rounded-[8px] border-[2px] border-[#000] font-bold bg-[#FFFF94] text-[rgb(97,67,38)]">
          标准卡组
        </div>
      </div>
      <div className="ml-auto mr-[24px] border-[4px] shadow-lg   relative z-[99] rounded-[4px]">
        <div
          onClick={copyCode}
          className=" outline-[#E3D07F] flex items-center outline outline-[3px] text-[12px]  rounded-[3px] border-[2px] border-[#000]  bg-[#3D0D0D] text-[#fff]">
          <div className="shrink-0 px-[6px] font-bold cursor-pointer" onClick={() => {}}>
            代码复制
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
