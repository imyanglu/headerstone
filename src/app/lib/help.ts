import { decode, FormatType, encode } from 'deckstrings';
import { JobsData } from '../Const';
import { Heros, StandardCards } from './data';
export const getImgSrc = (id: string) => {
  return `https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/${id}.png`;
};
export const createCode = (decks: [number, number][], type: (typeof JobsData)[number]['slug']) => {
  const hero = Heros.find((a) => a.type === 'HERO' && a.cardClass === type.toUpperCase());

  if (!hero) return;
  const deck = {
    cards: decks,
    heroes: [hero.dbfId as number],
    format: 2 as FormatType,
  };

  return encode(deck);
};
export const decodeCode = (text: string) => {
  const patternTitle = /(?<=###\s)(.*?)(?=\n#)/;
  const patternCode = /(?<=\nAAEC)(.*)/;

  // 提取标题
  const titleMatch = text.match(patternTitle);
  const title = titleMatch ? titleMatch[0] : null;

  // 提取套牌代码
  const codeMatch = text.match(patternCode);
  const code = codeMatch ? 'AAEC' + codeMatch[0] : null;
  if (!code) throw new Error('无法解析套牌代码');
  const result = decode(code);
  const cardIds = result.cards.map((a) => Array.from({ length: a[1] }, () => a[0])).flat(2);
  const ids = StandardCards.filter((a) => cardIds.includes(a.dbfId)).map((a) => a.id);
  console.log(ids);

  return { code, title };
};
