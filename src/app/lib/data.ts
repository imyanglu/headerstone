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
Cards.forEach((a) => {
  if (a.type === 'HERO') {
    Heros.push(a);
  }
  if (a.set && !BanSet.includes(a.set)) {
    StandardCards.push(a);
  }
});

export { StandardCards, Cards, Heros };
