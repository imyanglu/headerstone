import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="homepage w-[100vw] min-h-[100vh] bg-[#0D0B20]">
      <div className="w-[100vw] aspect-[16/7] flex justify-center items-center">
        <div className="w-[100vw]">
          <div className="w-[320px] aspect-[269/125] relative mx-auto max-w-[80%] ">
            <Image fill src='https://pic.imgdb.cn/item/6682cc04d9c307b7e9487df1.webp' alt="logo" />
          </div>

          <div className="mt-[20px]">
            <h1 className="text-[32px] title w-[fit-content] font-bold text-white mx-auto">炉石传说</h1>
            <div className="text-[rgb(255,208,151)] text-center mt-[16px] text-[20px] font-bold title">查询登顶,热门卡组。制作卡牌。</div>
            <div className="flex text-[14px] justify-center text-[#fff] mt-[24px] font-bold gap-[24px]">
              <div className="btn1 px-[4px] py-[4px] text-center shadow-lg  rounded-[6px] flex justify-center items-center">
                <div className="py-[2px] px-[2px] bg-[#7e3690] rounded-[6px]">
                  <Link href='/' className="block w-[90px] shadow-lg h-[30px] leading-[30px]  bg-gradient-to-r from-[#5A1B87] via-[#AB28C1] to-[#591C87] rounded-[4px]">
                    卡组查询
                  </Link>
                </div>
              </div>
              <div className="btn1 px-[4px] py-[4px] text-center shadow-lg  rounded-[6px] flex justify-center items-center">
                <div className="py-[2px] px-[2px] bg-[#7e3690] rounded-[6px]">
                  <Link href='https://www.hearthcards.net' prefetch={false} className="block w-[90px] shadow-lg h-[30px] leading-[30px]  bg-gradient-to-r from-[#5A1B87] via-[#AB28C1] to-[#591C87] rounded-[4px]">
                    卡组制作
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
