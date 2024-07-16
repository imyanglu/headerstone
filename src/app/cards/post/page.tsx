'use client';

import { getUploadUrl, uploadFile, uploadNewCard } from '@/app/api';
import { JobsData } from '@/app/Const';
import { Card, HsCard } from '@/type';
import { Input, Select, InputNumber, Checkbox, Button } from 'antd';
import { useRef, useState } from 'react';

const Rare = [
  [40, 5],
  [100, 20],
  [400, 100],
  [1600, 400],
];
const Page = () => {
  const fileRef = useRef<HTMLInputElement>(null);
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
  const onChange = () => {
    uploadCardImg();
  };

  const uploadCardImg = async () => {
    const file = fileRef.current?.files?.[0];
    const res = await getUploadUrl();
    if (!res.uploadUrl || !file) return;
    uploadFile(file, res.uploadUrl).then((d) => {
      changeCard('img', d.url);
    });
  };

  const changeRare = (r: number) => {
    const a = Rare[r];
    changeCard('forge', a[0]);
    changeCard('decompose', a[1]);
  };
  const uploadCard = async () => {
    if (!card) return;
    console.log(card);
    uploadNewCard(card).then(() => {
      window.history.back();
    });
  };
  return (
    <div className="px-[100px]  min-h-[100vh] flex">
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
          <Select
            defaultValue="普通"
            style={{ width: 120 }}
            onChange={(e) => {
              changeCard('rare', Number(e));
              changeRare(Number(e));
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
          <InputNumber
            addonBefore={<div className="bg-[#]">合成尘</div>}
            value={card?.forge}
            placeholder="400"
            onChange={(e) => {
              changeCard('forge', Number(e));
            }}
          />
          <InputNumber
            value={card?.decompose}
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
          <div className="flex gap-x-[12px]">
            <Button
              onClick={() => {
                fileRef.current?.click();
              }}>
              图片上传
            </Button>
            <Input
              disabled
              addonBefore={<div className="bg-[#]">卡牌地址</div>}
              value={card.img}
              placeholder="https://"
              onChange={(e) => {
                changeCard('img', e.target.value);
              }}
            />
          </div>

          <Input
            addonBefore={<div className="bg-[#]">卡包名</div>}
            placeholder="荒野之地"
            onChange={(e) => {
              changeCard('seriesName', e.target.value);
            }}
          />
          <Input addonBefore={<div className="bg-[#]">作者名</div>} placeholder="荒野之地" />
          <div className="flex items-center">
            <Checkbox onChange={() => {}}>标准卡</Checkbox>
            <Checkbox onChange={() => {}}>狂野卡</Checkbox>
            <Checkbox onChange={() => {}}>是否是子卡</Checkbox>
          </div>
          <Input addonBefore={<div className="bg-[#]">子卡</div>} placeholder="id,id" />
          <Input addonBefore={<div className="bg-[#]">父卡</div>} placeholder="id,id" />
        </form>
        <Button className="mt-[24px]" type="primary" onClick={uploadCard}>
          上传
        </Button>
      </div>
      <div>{card.img && <img src={card.img} alt="w-[300px]" />}</div>
      <input type="file" accept="image/*" className="hidden" ref={fileRef} onChange={onChange} />
    </div>
  );
};
export default Page;
