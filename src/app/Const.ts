import { title } from 'process';

export const JobsData = [
  {
    name: '死亡骑士',
    slug: 'deathknight',
    pic: 'https://pic.imgdb.cn/item/66845b2ed9c307b7e9f05c72.png',
    thumbnail: 'https://pic.imgdb.cn/item/669537ebd9c307b7e9b068f1.jpg',
    tile: '/tiles/deathknight-tile.avif',
    weapon: '/weapon/deathknight.png',
  },
  {
    name: '恶魔猎人',
    slug: 'demonhunter',
    pic: 'https://pic.imgdb.cn/item/66845b4fd9c307b7e9f07312.png',
    thumbnail: '',
    tile: '/tiles/demonhunter-tile.avif',
    weapon: '/weapon/demonhunter.png',
  },
  {
    name: '德鲁伊',
    slug: 'druid',
    pic: 'https://pic.imgdb.cn/item/66845b75d9c307b7e9f09452.png',
    thumbnail: 'https://pic.imgdb.cn/item/66901522d9c307b7e9121053.jpg',
    title: '/druid-title.svg',
    tile: '/tiles/druid-tile.avif',
    weapon: '/weapon/warrior.png',
  },
  {
    name: '猎人',
    slug: 'hunter',
    pic: 'https://pic.imgdb.cn/item/66845b90d9c307b7e9f0ab9a.png',
    thumbnail: 'https://pic.imgdb.cn/item/669660bed9c307b7e90bf9ad.jpg',
    tile: '/tiles/hunter-tile.avif',
    weapon: '/weapon/hunter.png',
  },
  {
    name: '法师',
    slug: 'mage',
    pic: 'https://pic.imgdb.cn/item/66845bafd9c307b7e9f0c626.png',
    tile: '/tiles/mage-tile.avif',
    thumbnail: 'https://pic.imgdb.cn/item/66981809d9c307b7e9db2925.jpg',
    weapon: '/weapon/mage.png',
  },
  {
    name: '圣骑士',
    slug: 'paladin',
    pic: 'https://pic.imgdb.cn/item/66845bc1d9c307b7e9f0d558.png',
    thumbnail: 'https://pic.imgdb.cn/item/6689730ed9c307b7e9dea892.jpg',
    tile: '/tiles/paladin-tile.avif',
    weapon: '/weapon/paladin.png',
  },
  {
    name: '牧师',
    slug: 'priest',
    pic: 'https://pic.imgdb.cn/item/66845bcdd9c307b7e9f0e2de.png',
    thumbnail: '',
    tile: '/tiles/priest-tile.avif',
    weapon: '/weapon/warrior.png',
  },
  {
    thumbnail: '',
    name: '盗贼',
    slug: 'rogue',
    pic: 'https://pic.imgdb.cn/item/66845bdcd9c307b7e9f0ee87.png',
    tile: '/tiles/rogue-tile.avif',
    weapon: '/weapon/warrior.png',
  },
  {
    thumbnail: '',
    name: '萨满',
    slug: 'shaman',
    pic: 'https://pic.imgdb.cn/item/66845be8d9c307b7e9f0f9a0.png',
    tile: '/tiles/shaman-tile.avif',
    weapon: '/weapon/warrior.png',
  },
  {
    thumbnail: '',
    name: '术士',
    slug: 'warlock',
    pic: 'https://pic.imgdb.cn/item/66845bfbd9c307b7e9f109a2.png',
    tile: '/tiles/warlock-tile.avif',
    weapon: '/weapon/warrior.png',
  },
  {
    thumbnail: 'https://pic.imgdb.cn/item/66965fc9d9c307b7e9098d1f.jpg',
    name: '战士',
    slug: 'warrior',
    pic: 'https://pic.imgdb.cn/item/66845c0ad9c307b7e9f11afc.png',
    tile: '/tiles/warrior-tile.avif',
    weapon: '/weapon/warrior.png',
  },
] as const;
