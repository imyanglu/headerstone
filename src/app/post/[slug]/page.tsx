/* eslint-disable @next/next/no-img-element */
import Image from "next/image"

const Page = () => {
    return <div className="w-[100vw] bg-[#fff] flex flex-col min-h-[100vh] ">
        <div className="w-full h-[100px] relative flex items-center">
            <div className="absolute top-[1px] z-[10] h-[40px] w-full ">
                <Image src='https://pic.imgdb.cn/item/6683b127d9c307b7e99abe59.png'  alt="" fill />
            </div>
            <div className="absolute top-0 bottom-0 w-full h-[100px] shadow-lg">
                <Image fill alt='bg1' src='https://pic.imgdb.cn/item/6683ae9bd9c307b7e993615e.jpg' />
            </div>
            <div className="absolute bottom-0 h-[20px] w-full">
                <Image src='https://pic.imgdb.cn/item/6683b07cd9c307b7e998b6a1.png' alt="" fill />
            </div>
         
            <img className="relative  z-[2] w-[50px] ml-[24px] shake1" alt="" src='https://pic.imgdb.cn/item/6683bbedd9c307b7e9b96d01.webp' />
            <div className="border-[4px] shadow-lg outline-[#7c221f] outline-[5px] outline border-[#000] ml-[12px] relative z-[2] rounded-[24px]">
                <div className="outline-[#E3D07F] flex outline outline-[3px] px-[24px] py-[3px]  rounded-[24px] border-[2px] border-[#000] font-bold bg-[#FFFF94] text-[rgb(97,67,38)]">
                  标准卡组
              </div>
            </div>
                <div className="ml-[32px] border-[4px] shadow-lg outline-[#7c221f] outline-[5px] outline border-[#000]  relative z-[2] rounded-[24px]">
                <div className=" outline-[#E3D07F] flex items-center outline outline-[3px] px-[16px] text-[14px]  py-[3px]  rounded-[24px] border-[2px] border-[#000]  bg-[#3D0D0D] text-[rgb(97,67,38)]">
                      <input placeholder="搜索卡组..." className="outline-none text-[14px]  py-[3px]  font-bold bg-[#3D0D0D] text-[#fff]"/>
                    <div className="h-[30px] w-[30px] cursor-pointer absolute right-[10px]  flex items-center justify-end"><img src='/search.svg' alt='search' className="w-[24px] h-[24px]"/></div>
                </div>
            </div>
        </div>
        <div className="mainSection flex-1 w-[100vw] bg-[#E8D5AA] px-[24px] py-[16px]">
         
        </div>

    </div>
}
export default Page