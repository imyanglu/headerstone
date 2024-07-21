/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-[100vw] min-h-[100vh] bg-[#0D0B20] hideScrollbar">
      <div className="w-[100vw] homepage h-[calc(100vh-20px)]   flex justify-center items-center relative">
        <div className="w-[100vw]">
          <div className="w-[500px] aspect-[269/125] relative mx-auto max-w-[80%] ">
            <Image fill src="https://pic.imgdb.cn/item/6682cc04d9c307b7e9487df1.webp" alt="logo" />
          </div>
          <div className="mt-[-10px]">
            <h1 className="text-[50px] title w-[fit-content] font-bold text-white mx-auto">
              炉石传说
            </h1>
            <div className="text-[rgb(255,208,151)] text-center mt-[16px] text-[20px] font-bold title">
              查询登顶,热门卡组。制作卡牌。
            </div>
            <div className="flex text-[16px] justify-center text-[#fff] mt-[24px] font-bold gap-[32px]">
              <div className="btn1 px-[4px] py-[4px] text-center shadow-lg  rounded-[6px] flex justify-center items-center">
                <div className="py-[2px] px-[2px] bg-[#7e3690] rounded-[6px]">
                  <Link
                    href="/decks"
                    className="block w-[110px] shadow-lg h-[40px] leading-[40px]  bg-gradient-to-r from-[#5A1B87] via-[#AB28C1] to-[#591C87] rounded-[4px]">
                    卡组查询
                  </Link>
                </div>
              </div>
              <div className="btn1 px-[4px] py-[4px] text-center shadow-lg  rounded-[6px] flex justify-center items-center">
                <div className="py-[2px] px-[2px] bg-[#7e3690] rounded-[6px]">
                  <Link
                    href="https://www.hearthcards.net"
                    prefetch={false}
                    className="block w-[110px] shadow-lg h-[40px] leading-[40px]  bg-gradient-to-r from-[#5A1B87] via-[#AB28C1] to-[#591C87] rounded-[4px]">
                    卡牌制作
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100vw] h-[40px] absolute bottom-0 translate-y-[50%]">
          <Image
            fill
            alt="divider"
            src={'https://pic.imgdb.cn/item/6682dfd5d9c307b7e96a27ec.webp'}
          />
        </div>
      </div>
      <div className="w-[100vw] aspect-[1920/678] relative overflow-hidden flex  justify-center items-center text-[#fff]">
        <div className="w-full aspect-[1920/678] absolute inset-0">
          <Image src="https://pic.imgdb.cn/item/6682e301d9c307b7e96fb8ee.webp" fill alt="room" />
        </div>
        <div className="relative  flex-1 text-center flex flex-col">
          <div className=" font-bold text-[24px]">欢迎自投卡组。</div>
          <div className="text-[16px] font-normal mt-[12px]">分享卡组,谢谢谢谢🙏</div>

          <div className="btn1 mx-auto font-bold px-[4px] py-[4px] text-center shadow-lg mt-[40px] w-[fit-content]  rounded-[6px] flex justify-center items-center">
            <div className=" py-[2px] px-[2px] bg-[#7e3690] rounded-[6px]">
              <Link
                href="/post"
                prefetch={false}
                className="block w-[110px] shadow-lg h-[40px] leading-[40px]  bg-gradient-to-r from-[#5A1B87] via-[#AB28C1] to-[#591C87] rounded-[4px]">
                卡组上传
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="borderImg relative w-[500px] aspect-[1756/987]">
            <Image
              alt="thumbnail"
              fill
              src="https://pic.imgdb.cn/item/6682e8d5d9c307b7e9772433.webp"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
