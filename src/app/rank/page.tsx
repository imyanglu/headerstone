import { getRankList } from '../api';
import MainSection from './MainSection';
import Image from 'next/image';

const initRankList = async () => {
  try {
    const d = await getRankList();
    const pagination = d.data.rankList.pagination;
    const users = d.data.rankList.users;
    return { pagination, users: users.map((u, idx) => ({ idx: idx + 1, name: u })) };
  } catch (err) {
    return null;
  }
};

const Page = async () => {
  const data = await initRankList();
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
      <div className="h-[120px]"></div>
      <MainSection rankList={data} />
    </div>
  );
};
export default Page;
