import Cards from '../../../public/data/cards.json';
import DecksData from '../../../public/data/deck.json';
import RateList from '../../../public/data/winRateList.json';

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

const OtherInfoMap = new Map(DecksData.map((i) => [i.id, i]));
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
const DeckList: DeckByHs[] = [];
Object.values(RateList['series']['data'])
  .flat(2)
  .forEach((v) => {
    const infoId = v['archetype_id'];
    const deckHead = OtherInfoMap.get(infoId);

    if (deckHead) {
      const deck = {
        id: v.deck_id,
        name: deckHead.name,
        winRate: v.win_rate,
        totalGames: v.total_games,
        costTime: v.avg_game_length_seconds,
        turns: v.avg_num_player_turns,
        slug: deckHead['player_class_name'].toLocaleLowerCase(),
        cards: v.deck_list,
        deckSideboard: v.deck_sideboard,
        playerClass: deckHead.player_class,
        format: !!deckHead.standard_ccp_signature_core ? 2 : 1,
      };
      DeckList.push(deck);
    }
  });
const Decks = DeckList;

export { StandardCards, Cards, Heros, Decks };
