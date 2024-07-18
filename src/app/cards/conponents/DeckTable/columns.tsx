/* eslint-disable @next/next/no-img-element */
import { JobsData } from '@/app/Const';
import { CardGroupOverview } from '@/type';
import { ColumnDef } from '@tanstack/react-table';
import CopyBtn from '../CopyBtn';

export const WeaponColumn: ColumnDef<CardGroupOverview> = {
  id: 'type',
  header: () => <div className="w-[32px]"></div>,
  cell: ({ row }) => {
    const hero = JobsData.find((a) => a.slug === row.original.type);
    return <img className=" w-[32px] h-[32px] " src={hero?.weapon} alt="" />;
  },
  size: 40,
};
export const NameColumn: ColumnDef<CardGroupOverview> = {
  id: 'name',

  accessorFn: (row) => row.name,
  header: () => <span className="">卡组名</span>,
  cell: ({ row }) => {
    const { id, name, forge } = row.original;
    return (
      <div className="mx-auto flex flex-col justify-center items-center py-[12px]">
        <a href={`/cards/${id}`} className="font-bold line-clamp-1 break-all">
          {name}
        </a>
        <div className="flex items-center mt-[4px] h-[18px]">
          {forge && (
            <>
              <img
                className="w-[12px] h-[17px]"
                src="https://pic.imgdb.cn/item/6697b0ddd9c307b7e96455fc.png"
                alt=""
              />
              <p className="text-[12px] ml-[4px]">{forge}</p>
            </>
          )}
        </div>
      </div>
    );
  },
};

export const WinRateColumn: ColumnDef<CardGroupOverview> = {
  header: '胜率',
  cell: ({ row }) => {
    const rate = row.original.winningRate;
    return (
      <div className="text-center text-[12px] sm:text-[16px]">
        <strong className="text-[rgb(31,173,30)]">{rate}%</strong>
      </div>
    );
  },
};

export const CodeColumn: ColumnDef<CardGroupOverview> = {
  header: '代码',
  cell: ({ row }) => {
    const code = row.original.code;
    return (
      <div className="border-[4px] w-[100px] mx-auto md:w-[200px] lg:w-[300px] shrink-0 mt-[4px] shadow-lg outline-[#e1c892] outline-[5px] outline border-[#000]  relative z-[2] rounded-[10px]">
        <div className=" outline-[#E3D07F] flex items-center outline outline-[3px] pl-[8px] text-[14px]  py-[3px]  rounded-[10px] border-[2px] border-[#000]  bg-[#3D0D0D] text-[#fff]">
          <div className="flex-1 line-clamp-1 break-all">{code}</div>
          {code && <CopyBtn code={code} />}
        </div>
      </div>
    );
  },
};
