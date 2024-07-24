'use client';
import { Modal } from '@/app/components';
import { useState } from 'react';

type Info = {
  code: string;
  author: string;
  rate: string;
  forge: string;
  time: number;
  desc: string;
};
type EditCardGroupModal = {
  visible: boolean;

  name: string;
  onClose: () => void;
  onSubmit: (i: Info) => void;
};

const EditCardGroupModal = ({ visible, name, onClose, onSubmit }: EditCardGroupModal) => {
  const [info, setInfo] = useState<Info>({
    code: '',
    author: '',
    rate: '',
    forge: '',
    time: 0,
    desc: '',
  });
  const changeInfo = <T extends keyof Info>(k: T, v: Info[T]) => {
    setInfo((prev) => ({ ...prev, [k]: v }));
  };

  return (
    <Modal visible={visible}>
      <div className="text-[#fff] pt-[20px] px-[8px]">
        <div className="font-bold text-center text-[18px]">编辑卡组</div>
        <div className="flex items-center mt-[12px]">
          <label htmlFor="cardName" className="w-[50px] font-bold text-[14px]">
            卡组名:
          </label>
          <input
            className="ml-[12px] bg-transparent outline-none"
            id="cardName"
            value={name ?? '卡组名'}
          />
        </div>
        <div className="flex items-center mt-[24px]">
          <label htmlFor="cardName" className="w-[50px]  font-bold text-[14px]">
            胜率:
          </label>
          <input
            className="ml-[12px] text-[14px] line-clamp-1 py-[1px] bg-transparent outline-none border-b-[1px]"
            id="cardName"
            placeholder=""
            value={info.rate ?? ''}
            onChange={(e) => {
              changeInfo('rate', e.target.value);
            }}
          />
        </div>
        <div className="flex items-center mt-[24px]">
          <label htmlFor="cardName" className="w-[50px]  font-bold text-[14px]">
            奥术尘:
          </label>
          <input
            className="ml-[12px] text-[14px] line-clamp-1 py-[1px] bg-transparent outline-none border-b-[1px]"
            id="cardName"
            placeholder=""
            type="number"
            value={info.forge ?? ''}
            onChange={(e) => {
              changeInfo('forge', e.target.value);
            }}
          />
        </div>
        <div className="flex items-center mt-[24px]">
          <label htmlFor="cardName" className="w-[50px]  font-bold text-[14px]">
            代码:
          </label>
          <textarea
            className="ml-[12px] text-[14px] line-clamp-1 py-[1px] bg-transparent outline-none border-b-[1px]"
            id="cardName"
            placeholder=""
            value={info.code ?? ''}
            onChange={(e) => {
              changeInfo('code', e.target.value);
            }}
          />
        </div>
        <div className="flex items-center mt-[24px]">
          <label htmlFor="cardName" className="w-[50px]  font-bold text-[14px]">
            时间/秒:
          </label>
          <input
            className="ml-[12px] text-[14px] line-clamp-1 py-[1px] bg-transparent outline-none border-b-[1px]"
            id="cardName"
            placeholder=""
            type="number"
            value={info.time || ''}
            onChange={(e) => {
              changeInfo('time', Number(e.target.value));
            }}
          />
        </div>
        <div className="flex items-center mt-[24px]">
          <label htmlFor="cardName" className="w-[50px]  font-bold text-[14px]">
            描述:
          </label>
          <input
            className="ml-[12px] font-bold text-[14px] line-clamp-1 bg-transparent outline-none  py-[2px] border-b-[1px]"
            id="cardName"
            placeholder=""
            value={info.desc ?? ''}
            onChange={(e) => {
              changeInfo('desc', e.target.value);
            }}
          />
        </div>
        <div className="flex items-center mt-[24px]">
          <label htmlFor="cardName" className="w-[50px]  font-bold text-[14px]">
            作者:
          </label>
          <input
            className="ml-[12px] font-bold text-[14px] line-clamp-1 bg-transparent outline-none  py-[2px] border-b-[1px]"
            id="cardName"
            placeholder=""
            value={info.author ?? ''}
            onChange={(e) => {
              changeInfo('author', e.target.value);
            }}
          />
        </div>
      </div>

      <div className="flex mt-[24px] pb-[20px]  justify-around">
        <div
          onClick={onClose}
          style={{
            background: 'linear-gradient(to right,rgb(96,91,99), rgb(96,91,99),rgb(96,91,99))',
          }}
          className="cursor-pointer font-bold  w-[100px] text-center text-[#fff] outline-[4px] border-[3px] border-[#7e7b7b] outline outline-[#332e2a] rounded-[4px] text-[14px] py-[4px] ">
          关闭
        </div>
        <div
          onClick={() => {
            onSubmit(info);
          }}
          style={{
            background: 'linear-gradient(to right,#510E7D,#B320BE,#510E7D)',
          }}
          className="cursor-pointer font-bold ml-[16px] w-[100px] text-center text-[rgb(252,209,68)] outline-[4px] border-[3px] border-[#7e7b7b] outline outline-[#332e2a] rounded-[4px] text-[14px] py-[4px] ">
          提交
        </div>
      </div>
    </Modal>
  );
};
export default EditCardGroupModal;
