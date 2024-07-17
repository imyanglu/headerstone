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
  id: string;
  name: string; //卡名
  clazz: string; //卡牌类型 法术 随从
  manna: number; //法力消耗
  attack: number; //攻击力
  hp: number; //生命值
  forge: number; //合成费用
  decompose: number; //分解费用
  rule: string; //规则
  description: string; //描述
  img: string; //图片
  rare: number; //稀有度
  faction: string; //阵营
  thumbnail: string; // 缩略图
  seriesName: string; //系列名称
  standard: boolean; //是否标准卡
  childIds: string[] | null; //子卡牌
  parentIds: string[] | null; //父卡牌
  wild: boolean; //是否为狂野卡
  // visible: boolean; //是否可见
  child: boolean; //是否为子卡牌
  artist: string; //作家名字
};
