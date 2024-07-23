import { decode, FormatType, encode } from 'deckstrings';
import { JobsData } from '../Const';
import { Heros, StandardCards } from './data';
export const getImgSrc = (id: string) => {
  return `https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/${id}.png`;
};
export const createCode = (decks: [number, number][], type: (typeof JobsData)[number]['slug']) => {
  const hero = Heros.find((a) => a.type === 'HERO' && a.cardClass === type.toUpperCase());
  console.log(hero);
  if (!hero) return;
  const deck = {
    cards: decks,
    heroes: [hero.dbfId as number],
    format: 2 as FormatType,
  };
  console.log(deck);
  return encode(deck);
};
