/* eslint-disable @next/next/no-img-element */
const img = 'https://pic.imgdb.cn/item/66840c49d9c307b7e9622a7c.png'
const endImg = 'https://pic.imgdb.cn/item/668586b4d9c307b7e90f56b0.png'
const MannaControl = () => {
    return <div className="ml-[32px] border-[4px] shadow-lg outline-[#7c221f] outline-[5px] outline border-[#000]  relative z-[2] rounded-[24px]">
        <div className=" outline-[#E3D07F] flex items-center outline outline-[3px] px-[12px] text-[14px]  py-[1px]  rounded-[24px] border-[2px] border-[#000]  bg-[#3D0D0D] text-[rgb(97,67,38)]">
            {Array.from({ length: 11 }).map((_, i) => {
                const isEnd = i === 10
                if (!isEnd) return <div key={i} className="cursor-pointer light relative flex justify-center items-center w-[35px] h-[32px]" >
                    <img className="w-full h-full absolute inset-0" src={ img} alt="" />
                    <div className="font-black text-[#fff] relative z-10 leading-[35px] h-[32px]">{i}</div>
                </div>
                return <div key={i} className="cursor-pointer relative flex justify-center items-center w-[58px] h-[32px] endText" >
                    <img className="w-full h-full absolute inset-0" src={endImg} alt="" />
                    <div className="font-bold text-[#fff] relative z-10 text-[14px] leading-[35px] h-[32px] ml-[-2px]">{i}&nbsp;&nbsp;&nbsp;+</div>
                </div>
            })}

        </div>
    </div>

}
export default MannaControl