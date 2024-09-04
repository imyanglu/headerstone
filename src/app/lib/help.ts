import { decode, FormatType, encode, DeckCard } from 'deckstrings';
import { JobsData } from '../Const';
import { Cards, Heros, StandardCards } from './data';
import { HsCard } from '@/type';
export const getImgSrc = (id: string) => {
  return `https://art.hearthstonejson.com/v1/render/latest/zhCN/512x/${id}.png`;
};

const RareDict = {
  COMMON: 40,
  RARE: 100,
  EPIC: 400,
  LEGENDARY: 1600,
} as const;

export const generateDeckInfo = (deck: {
  playerClass: number;
  components: string;
  sideboardCards: string;
  format: number;
}) => {
  const { components, format, playerClass, sideboardCards } = deck;
  const formatSide: any[] = [];
  JSON.parse(sideboardCards).forEach((i: any[]) => {
    const length = i.length;
    const arr = Array.from({ length: length - 1 }, (_, idx) => {
      return [i[idx + 1][0], i[idx + 1][1], i[0]];
    });

    formatSide.push(...arr);
  });
  const allCards = JSON.parse(components);
  const deckParams = {
    cards: allCards,
    sideboardCards: formatSide,
    heroes: [playerClass],
    format: format as FormatType,
  };
  const decodeResult = encode(deckParams);
  const forge = allCards.reduce((sum: number, cur: [number, number]) => {
    console.log(cur);
    const count = cur[1];
    const dbId = cur[0];
    const curC = StandardCards.find((a) => a.dbfId === dbId);
    console.log(curC.set);
    if (curC.set === 'CORE') return sum;
    const forgeNum =
      count * (RareDict[(curC?.rarity ?? 'COMMON') as keyof typeof RareDict] as number);
    return sum + forgeNum;
  }, 0);
  return { code: decodeResult, forge };
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
  const cardsArr = result.cards;

  const hero = Heros.find((a) => a.dbfId === result.heroes[0]);

  const cardIds = result.cards.map((a) => Array.from({ length: a[1] }, () => a[0])).flat(2);
  const cardMap = new Map<string, HsCard & { count: number }>();
  StandardCards.filter((a) => cardIds.includes(a.dbfId)).forEach((i) => {
    const count = cardsArr.find((item) => item[0] === i.dbfId)?.[1] ?? 1;
    cardMap.set(i.id, { ...i, count });
  });

  return { code, title, cards: cardMap, hero: (hero?.cardClass ?? '').toLowerCase() };
};
