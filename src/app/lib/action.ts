'use server';

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

const format = (RateList: any, DecksData: any) => {
  const DeckList = [];
  const OtherInfoMap = new Map(DecksData.map((i: any) => [i.id, i]));
  Object.values(RateList['series']['data'])
    .flat(2)
    .forEach((v: any) => {
      const infoId = v['archetype_id'];
      const deckHead: any = OtherInfoMap.get(infoId);
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
  return DeckList;
};

export const initDecks = async () => {
  const data = await fetch('https://hsreplay.net/api/v1/archetypes/?hl=zh-CN', {
    cache: 'default',
    next: { revalidate: 60 * 60 * 2 },
  });
  const rateData = await fetch(
    `
https://hsreplay.net/analytics/query/list_decks_by_win_rate_v2/?GameType=RANKED_STANDARD&LeagueRankRange=BRONZE_THROUGH_GOLD&Region=ALL&TimeRange=CURRENT_PATCH
`,
    {
      cache: 'default',
      next: { revalidate: 60 * 60 * 2 },
    }
  );
  const decks = await data.json();
  const rateDecks = await rateData.json();
  const res = format(rateDecks, decks);

  return res;
};
