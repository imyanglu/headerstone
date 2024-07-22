/* eslint-disable @next/next/no-img-element */
const img = 'https://pic.imgdb.cn/item/66840c49d9c307b7e9622a7c.png';
const endImg = 'https://pic.imgdb.cn/item/668586b4d9c307b7e90f56b0.png';
const Cost = ({
  over = 10,
  cost,
  containerClassName,
  isSelected,
}: {
  over?: number;
  cost: number;
  containerClassName?: string;
  isSelected?: boolean;
}) => {
  if (cost >= over)
    return (
      <div
        data-mana={cost}
        className={`cursor-pointer  relative flex justify-center items-center endText w-[58px] h-[32px] ${containerClassName}`}>
        <img data-mana={cost} className="w-full h-full absolute inset-0" src={endImg} alt="" />
        <div
          data-mana={cost}
          className={`font-bold text-[#fff]  relative z-10 text-[14px] leading-[32px] h-[32px] ml-[-2px] ${
            isSelected ? 'selectedCost' : ''
          }`}>
          {cost}&nbsp;&nbsp;&nbsp;+
        </div>
      </div>
    );
  return (
    <div
      data-mana={cost}
      className={` cursor-pointer light relative flex justify-center items-center w-[35px] h-[32px] ${containerClassName}`}>
      <img data-mana={cost} className="w-full h-full absolute inset-0" src={img} alt="" />
      <div
        data-mana={cost}
        className={`font-black text-[#fff] relative z-10 leading-[32px] h-[32px] ${
          isSelected ? 'selectedCost' : ''
        }`}>
        {cost}
      </div>
    </div>
  );
};

export default Cost;
