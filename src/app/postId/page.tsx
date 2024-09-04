'use client';
import { useState } from 'react';
import { decodeCode } from '../lib/help';
import { uploadCardGroup } from '../api';

type Params = {
  code: string;
  winningRate: number; // 胜率
  name: string;
  forge: number;
  preview: boolean; // 是否预览
  time: number;
};
const Page = () => {
  const [params, setParams] = useState<Params>({
    code: '',
    winningRate: 50,
    name: '',
    forge: 0,
    preview: true,
    time: 0,
  });
  const changeParams = <K extends keyof Params>(k: K, v: Params[K]) => {
    setParams((p) => ({ ...p, [k]: v }));
  };
  const submit = () => {
    // const { cards, title, hero } = decodeCode(params.code);
    // const cardIds = [...cards.values()]
    //   .map((c) => Array.from({ length: c.count }, () => c.id))
    //   .flat(2);
    // const mana = [...cards.values()]
    //   .map((c) => Array.from({ length: c.count }, () => c.cost))
    //   .flat(2);
    // console.log(cardIds, 'cc');
    // const req = {
    //   forge: params.forge,
    //   code: params.code,
    //   name: title,
    //   owner: '',
    //   cards: cardIds,
    //   type: hero,
    //   winningRate: params.winningRate + '',
    //   label: '',
    //   mana: mana,
    //   desc: '',
    //   preview: true,
    //   time: params.time,
    // };
    // uploadCardGroup(req);
  };
  return (
    <div className="flex flex-col py-[30px] gap-[16px] items-center">
      <textarea
        placeholder="code"
        className="border-[1px] h-[200px] border-[#000] w-[200px]"
        value={params.code}
        onChange={(e) => {
          changeParams('code', e.target.value);
        }}
      />
      <input
        placeholder="winningRate"
        className="border-[1px] border-[#000] w-[200px]"
        onChange={(e) => {
          changeParams('winningRate', Number(e.target.value));
        }}
      />
      <input
        placeholder="forge"
        className="border-[1px] border-[#000] w-[200px]"
        onChange={(e) => {
          changeParams('forge', Number(e.target.value));
        }}
      />
      <input
        placeholder="time"
        className="border-[1px] border-[#000] w-[200px]"
        onChange={(e) => {
          changeParams('time', Number(e.target.value));
        }}
      />
      <div className="bg-[#000] px-[12px] py-[4px] text-[#fff]" onClick={submit}>
        提交
      </div>
    </div>
  );
};
export default Page;
