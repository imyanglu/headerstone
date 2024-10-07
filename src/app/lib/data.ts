import Cards from '../../../public/data/cards.json';

const BanSet = [
  'TGT',
  'BOOMSDAY',
  'ALTERAC_VALLEY',
  'THE_BARRENS',
  'BRM',
  'BLACK_TEMPLE',
  'LEGACY',
  'DEMON_HUNTER_INITIATE',
  'GANGS',
  'PLACEHOLDER_202204',
  'EXPERT1',
  'DALARAN',
  'STORMWIND',
  'DARKMOON_FAIRE',
  'DRAGONS',
  'NAXX',
  'GILNEAS',
  'GVG',
  'HERO_SKINS',
  'ICECROWN',
  'KARA',
  'LOE',
  'LOOTAPALOOZA',
  'REVENDRETH',
  'RETURN_OF_THE_LICH_KING',
  'OG',
  'PATH_OF_ARTHAS',
  'SCHOLOMANCE',
  'THE_SUNKEN_CITY',
  'TROLL',
  'ULDUM',
  'UNGORO',
  'VANILLA',
  'WONDERS',
  'YEAR_OF_THE_DRAGON',
];
const Heros: any[] = [];
const StandardCards: any[] = [];
(Cards as any).forEach((a: any) => {
  if (a.type === 'HERO') {
    Heros.push(a);
  }
  if (a.set && !BanSet.includes(a.set)) {
    StandardCards.push(a);
  }
});

export type DeckByHs = {
  id: string;
  name: string;
  winRate: number;
  totalGames: number;
  costTime: number;
  turns: number;
  deckSideboard: string;
  slug: string;
  playerClass: number;
  cards: string;
  format: number; // 1:狂野 2:标准
};

export { StandardCards, Cards, Heros };
