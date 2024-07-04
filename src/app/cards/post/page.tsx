'use client';

import { uploadNewCard } from '@/app/api';
import { Card } from '@/type';
import axios from 'axios';
import { useState } from 'react';

const Page = () => {
  const [card, setCard] = useState<Omit<Card, 'id'>>({
    name: '',
    type: '',
    cost: 0,
    attack: 10,
    health: 0,
    pic: '',
    label: '',
    level: 'white',
    isretine: false,
  });
  const changeCard = <K extends keyof Omit<Card, 'id'>>(k: K, v: Card[K]) => {
    setCard((a) => ({ ...a, [k]: v }));
  };
  const uploadCard = async () => {
    console.log(card);
    if (!card) return;
    console.log(card);
    uploadNewCard(card);
  };
  return (
    <div className="px-[100px]">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          uploadCard();
        }}>
        <div>
          <label>name：</label>{' '}
          <input
            name="name"
            value={card?.name}
            onChange={(e) => {
              changeCard('name', e.target.value);
            }}
          />
        </div>
        <div>
          <label>type：</label>{' '}
          <input name="type" onChange={(e) => changeCard('type', e.target.value as any)} />
        </div>
        <div>
          <label>cost：</label>{' '}
          <input name="cost" onChange={(e) => changeCard('cost', e.target.value as any)} />
        </div>
        <div>
          <label>attack：</label>{' '}
          <input name="attack" onChange={(e) => changeCard('attack', e.target.value as any)} />
        </div>
        <div>
          <label>health：</label>{' '}
          <input
            name="health"
            onChange={(e) => {
              changeCard('health', JSON.parse(e.target.value));
            }}
          />
        </div>
        <label>pic：</label>{' '}
        <input
          name="pic"
          onChange={(e) => {
            changeCard('pic', e.target.value);
          }}
        />
        <div>
          <label>label</label>
          <input
            name="label"
            onChange={(e) => {
              changeCard('label', e.target.value);
            }}
          />
        </div>
        <div>
          <label>level</label>
          <input
            name="level"
            onChange={(e) => {
              changeCard('level', e.target.value as any);
            }}
          />
        </div>
        <div>
          <label>类:</label>
          <input
            name="classes"
            onChange={(e) => {
              changeCard('classes', e.target.value as any);
            }}
          />
        </div>
        <div>
          <input
            name="isretine"
            type="checkbox"
            onChange={(e) => {
              changeCard('isretine', e.target.checked);
            }}
          />
        </div>
        <button type="submit">提交</button>
      </form>
    </div>
  );
};
export default Page;
