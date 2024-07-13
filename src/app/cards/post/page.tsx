'use client';

import { uploadNewCard } from '@/app/api';
import { JobsData } from '@/app/Const';
import { Card, HsCard } from '@/type';
import { Input, Select, InputNumber, Checkbox } from 'antd';
import { useState } from 'react';

const Page = () => {
  const [card, setCard] = useState<HsCard>({
    id: '',
    name: '',
    clazz: '英雄牌',
    manna: 0,
    attack: 0,
    hp: 0,
    forge: 0,
    decompose: 0,
    rule: '',
    description: '',
    img: '',
    rare: 0,
    faction: '',
    thumbnail: '',
    seriesName: '',
    standard: true,
    childIds: null,
    parentIds: null,
    wild: true,
    child: false,
    artist: '',
  });
  const changeCard = <K extends keyof HsCard>(k: K, v: HsCard[K]) => {
    setCard((a) => ({ ...a, [k]: v }));
  };
  const uploadCard = async () => {
    if (!card) return;
    // uploadNewCard(card);
  };
  return (
    <div className="px-[100px]  min-h-[100vh]">
      <div className=" w-[fit-content] pt-[100px]">
        <form className="grid grid-cols-2 gap-[24px]">
          <Input
            addonBefore={<div className="bg-[#fff]">卡牌</div>}
            placeholder="卡牌名"
            onChange={(e) => {
              changeCard('name', e.target.value);
            }}
          />
          <Input
            addonBefore={<div className="bg-[#]">牌型</div>}
            placeholder="随从/英雄牌/法术牌"
            onChange={(e) => {
              changeCard('clazz', e.target.value);
            }}
          />
          <InputNumber
            addonBefore={<div className="bg-[#]">费用</div>}
            placeholder="消耗费用"
            onChange={(e) => {
              changeCard('manna', Number(e));
            }}
          />
          <InputNumber
            addonBefore={<div className="bg-[#]">攻击</div>}
            placeholder="攻击力"
            onChange={(e) => {
              changeCard('attack', Number(e));
            }}
          />
          <InputNumber
            addonBefore={<div className="bg-[#]">血量</div>}
            placeholder="HP"
            onChange={(e) => {
              changeCard('hp', Number(e));
            }}
          />
          <InputNumber
            addonBefore={<div className="bg-[#]">合成尘</div>}
            placeholder="400"
            onChange={(e) => {
              changeCard('forge', Number(e));
            }}
          />
          <InputNumber
            addonBefore={<div className="bg-[#]">分解尘</div>}
            placeholder="400"
            onChange={(e) => {
              changeCard('decompose', Number(e));
            }}
          />
          <Input
            addonBefore={<div className="bg-[#]">效果</div>}
            placeholder="召唤1/1野兽"
            onChange={(e) => {
              changeCard('rule', e.target.value);
            }}
          />
          <Input
            addonBefore={<div className="bg-[#]">介绍</div>}
            placeholder="哈哈哈哈哈哈..."
            onChange={(e) => {
              changeCard('description', e.target.value);
            }}
          />
          <Input
            addonBefore={<div className="bg-[#]">卡牌地址</div>}
            placeholder="https://"
            onChange={(e) => {
              changeCard('img', e.target.value);
            }}
          />

          <Select
            defaultValue="普通"
            style={{ width: 120 }}
            onChange={(e) => {
              changeCard('rare', Number(e));
            }}
            options={[
              { value: 0, label: '普通' },
              { value: 1, label: '稀有' },
              { value: 2, label: '史诗' },
              { value: 3, label: '传说' },
            ]}
          />
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="选择阵营,中立则不选择."
            onChange={(e) => {
              changeCard('faction', e.toString());
            }}
            options={JobsData.map((a) => ({ value: a.slug, label: a.name }))}
          />
          <Input addonBefore={<div className="bg-[#]">卡包名</div>} placeholder="荒野之地" />
          <div className="flex items-center">
            <Checkbox onChange={() => {}}>标准卡</Checkbox>
            <Checkbox onChange={() => {}}>狂野卡</Checkbox>
            <Checkbox onChange={() => {}}>是否是子卡</Checkbox>
          </div>
          <Input addonBefore={<div className="bg-[#]">子卡</div>} placeholder="id,id" />
          <Input addonBefore={<div className="bg-[#]">父卡</div>} placeholder="id,id" />
          <Input addonBefore={<div className="bg-[#]">作者名</div>} placeholder="荒野之地" />
        </form>
      </div>
      <div>{card.img && <img src={card.img} alt="w-[300px]" />}</div>
    </div>
  );
};
export default Page;
