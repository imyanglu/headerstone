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
};
