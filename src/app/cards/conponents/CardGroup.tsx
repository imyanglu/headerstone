/* eslint-disable @next/next/no-img-element */
type Card = {
  name: string;
  pic: string;
  id: string;
};
type CardGroupProps = {
  code?: string;
  name: string;
  pic: string;
  author?: string;
  intr?: string;
  winningRate: string;
  cards: [];
};

const CardGroup = ({ code, name, pic }: CardGroupProps) => {
  return (
    <div className="flex flex-col w-[220px] items-center">
      <img src={pic} className="w-[160px] " alt="" />
      <div className="text-[rgb(33,163,25)] font-bold mt-[2px] text-[12px]">胜率65%</div>
      <div className="w-[200px] text-[20px] text-[#614326] text-center font-bold">{name}</div>

      <div className="border-[4px] mt-[4px] shadow-lg outline-[#e1c892] outline-[5px] outline border-[#000]  relative z-[2] rounded-[10px]">
        <div className=" outline-[#E3D07F] flex items-center outline outline-[3px] pl-[8px] text-[14px]  py-[3px]  rounded-[10px] border-[2px] border-[#000]  bg-[#3D0D0D] text-[#fff]">
          <div className="flex-1 line-clamp-1 break-all">{code}</div>
          <div className="shrink-0 px-[6px] font-bold cursor-pointer">复制</div>
        </div>
      </div>
    </div>
  );
};
export default CardGroup;
