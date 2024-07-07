/* eslint-disable @next/next/no-img-element */
const img = 'https://pic.imgdb.cn/item/66840c49d9c307b7e9622a7c.png';
const endImg = 'https://pic.imgdb.cn/item/668586b4d9c307b7e90f56b0.png';
const Cost = ({ over = 10, cost }: { over?: number; cost: number }) => {
  if (cost >= over)
    return (
      <div className="cursor-pointer relative flex justify-center items-center w-[58px] h-[32px] endText">
        <img className="w-full h-full absolute inset-0" src={endImg} alt="" />
        <div className="font-bold text-[#fff] relative z-10 text-[14px] leading-[35px] h-[32px] ml-[-2px]">
          {cost}&nbsp;&nbsp;&nbsp;+
        </div>
      </div>
    );
  return (
    <div className="cursor-pointer light relative flex justify-center items-center w-[35px] h-[32px]">
      <img className="w-full h-full absolute inset-0" src={img} alt="" />
      <div className="font-black text-[#fff] relative z-10 leading-[35px] h-[32px]">{cost}</div>
    </div>
  );
};

export default Cost;
