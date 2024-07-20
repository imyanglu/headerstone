import Cost from './Cost';

/* eslint-disable @next/next/no-img-element */

type Props = {
  selectedMana?: number[];
  onManaClick?: (mana: number) => void;
};

const MannaControl = ({ selectedMana, onManaClick }: Props) => {
  return (
    <div className="ml-[32px] border-[4px] shadow-lg outline-[#7c221f] outline-[5px] outline border-[#000]  relative z-[2] rounded-[24px]">
      <div
        onClick={(e) => {
          const target = e.target;
          if (target && target instanceof HTMLElement && target.dataset.mana) {
            const mana = target.dataset.mana;
            onManaClick?.(Number(mana));
          }
        }}
        className=" outline-[#E3D07F] flex items-center outline outline-[3px] px-[12px] text-[14px]  py-[1px]  rounded-[24px] border-[2px] border-[#000]  bg-[#3D0D0D] text-[rgb(97,67,38)]">
        {Array.from({ length: 11 }).map((_, i) => {
          return <Cost isSelected={!!selectedMana?.includes(i)} over={10} cost={i} key={i} />;
        })}
      </div>
    </div>
  );
};
export default MannaControl;
