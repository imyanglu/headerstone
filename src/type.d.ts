export type Card = {
  id: string;
  name: string;
  type: string;
  cost: number;
  attack: number;
  health: number;
  pic: string;
  label: string;
  level: 'white' | 'blue' | 'purple' | 'gold';
  classes?:
    | 'deathknight'
    | 'druid'
    | 'hunter'
    | 'mage'
    | 'paladin'
    | 'priest'
    | 'rogue'
    | 'shaman'
    | 'warlock'
    | 'warrior'
    | 'all';

  isretine: boolean;
};

export type CardGroupOverview = {
  id: string;
  owner: string;
  cards: string;
  type: string;
  winningRate: string;
  name: string;
  label: string;
  code: string;
  mark: string;
  forge?: number;
};

export type Me = {
  id: string;
  avatar: string;
  nickname: string;
  email: string;
  isSetup: boolean;
  bio: string;
};

export type HsCard = {
  artist: string;
  attack: number;
  cardClass: string;
  collectible: boolean;
  cost: number;
  countAsCopyOfDbfId: number;
  dbfId: number;
  flavor: string;
  howToEarn: string;
  howToEarnGolden: string;
  id: string;
  mechanics: string[];
  name: string;
  rarity: string;
  set: string;
  text: string;
  type: string;
};
export type ReHsCard = {
  cardClass: string;
  dbfId: number;
  health: number;
  heroPowerDbfId: number;
  id: string;
  name: string;
  set: string;
  type: string;
};
