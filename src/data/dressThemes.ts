// 穿衣服模式 - 主题配置数据
// v2 - 使用 SVG 衣物组件替代 emoji

export type ClothingPosition =
  | 'underwear'
  | 'base-layer'
  | 'mid-layer'
  | 'outer-layer'
  | 'legwear'
  | 'footwear'
  | 'handwear'
  | 'neckwear'
  | 'headwear'
  | 'eyewear'
  | 'accessory'
  | 'ground-item';

export type CelebrationType = 'ski' | 'swim' | 'puddle' | 'sand';

export interface ClothingItem {
  id: string;           // 对应 BunnyClothing.tsx 中的组件 key
  letter: string;
  word: string;
  wordCn: string;
  emoji: string;        // 用于问题展示的小图标
  position: ClothingPosition;
  zIndex: number;       // SVG 图层顺序（从小到大）
  flyFrom: 'left' | 'right'; // 飞入方向
}

export interface DressTheme {
  id: string;
  name: string;
  nameEn: string;
  emoji: string;
  startOutfit: string;
  startEmoji: string;
  bgGradient: string;
  items: ClothingItem[];
  celebration: CelebrationType;
  // 场景背景装饰（雪花、雨滴、太阳等）
  sceneDecor: 'snow' | 'rain' | 'sun' | 'pool';
}

// ❄️ 雪天主题
const snowTheme: DressTheme = {
  id: 'snow',
  name: '雪天滑雪',
  nameEn: 'Snow Day',
  emoji: '❄️',
  startOutfit: 'diaper',
  startEmoji: '😴',
  bgGradient: 'linear-gradient(180deg, #B0E0E6 0%, #E8F4F8 50%, #F0F8FF 100%)',
  celebration: 'ski',
  sceneDecor: 'snow',
  items: [
    // 从内到外的穿衣顺序
    { id: 'snow-thermal', letter: 'T', word: 'Thermal', wordCn: '秋衣', emoji: '👕', position: 'base-layer', zIndex: 1, flyFrom: 'left' },
    { id: 'snow-leggings', letter: 'L', word: 'Leggings', wordCn: '秋裤', emoji: '🩲', position: 'legwear', zIndex: 1, flyFrom: 'right' },
    { id: 'snow-sweater', letter: 'S', word: 'Sweater', wordCn: '毛衣', emoji: '🧶', position: 'mid-layer', zIndex: 2, flyFrom: 'left' },
    { id: 'snow-pants', letter: 'P', word: 'Pants', wordCn: '雪裤', emoji: '👖', position: 'legwear', zIndex: 3, flyFrom: 'right' },
    { id: 'snow-jacket', letter: 'J', word: 'Jacket', wordCn: '滑雪服', emoji: '🧥', position: 'outer-layer', zIndex: 4, flyFrom: 'left' },
    { id: 'snow-scarf', letter: 'S', word: 'Scarf', wordCn: '围巾', emoji: '🧣', position: 'neckwear', zIndex: 5, flyFrom: 'right' },
    { id: 'snow-hat', letter: 'H', word: 'Hat', wordCn: '帽子', emoji: '🎩', position: 'headwear', zIndex: 9, flyFrom: 'left' },
    { id: 'snow-gloves', letter: 'G', word: 'Gloves', wordCn: '手套', emoji: '🧤', position: 'handwear', zIndex: 6, flyFrom: 'right' },
    { id: 'snow-boots', letter: 'B', word: 'Boots', wordCn: '滑雪靴', emoji: '🥾', position: 'footwear', zIndex: 7, flyFrom: 'left' },
    { id: 'snow-board', letter: 'S', word: 'Snowboard', wordCn: '滑雪板', emoji: '🏂', position: 'ground-item', zIndex: 0, flyFrom: 'right' },
  ],
};

// 🏊 泳池主题
const poolTheme: DressTheme = {
  id: 'pool',
  name: '泳池派对',
  nameEn: 'Pool Party',
  emoji: '🏊',
  startOutfit: 'diaper',
  startEmoji: '👶',
  bgGradient: 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 60%, #98FB98 100%)',
  celebration: 'swim',
  sceneDecor: 'pool',
  items: [
    // 泳池穿搭顺序
    { id: 'pool-swimsuit', letter: 'S', word: 'Swimsuit', wordCn: '泳衣', emoji: '👙', position: 'outer-layer', zIndex: 3, flyFrom: 'left' },
    { id: 'pool-cap', letter: 'C', word: 'Swim Cap', wordCn: '泳帽', emoji: '🧢', position: 'headwear', zIndex: 9, flyFrom: 'right' },
    { id: 'pool-goggles', letter: 'G', word: 'Goggles', wordCn: '泳镜', emoji: '🥽', position: 'eyewear', zIndex: 10, flyFrom: 'left' },
    { id: 'pool-armbands', letter: 'A', word: 'Armbands', wordCn: '水袖', emoji: '🛟', position: 'accessory', zIndex: 5, flyFrom: 'right' },
    { id: 'pool-float', letter: 'F', word: 'Float', wordCn: '救生圈', emoji: '⭕', position: 'accessory', zIndex: 6, flyFrom: 'left' },
    { id: 'pool-slippers', letter: 'S', word: 'Slippers', wordCn: '拖鞋', emoji: '🩴', position: 'footwear', zIndex: 5, flyFrom: 'right' },
    { id: 'pool-ball', letter: 'B', word: 'Beach Ball', wordCn: '沙滩球', emoji: '🏐', position: 'accessory', zIndex: 7, flyFrom: 'left' },
  ],
};

// ☔ 雨天主题
const rainTheme: DressTheme = {
  id: 'rain',
  name: '雨天踩水',
  nameEn: 'Rainy Day',
  emoji: '☔',
  startOutfit: 'casual',
  startEmoji: '🙂',
  bgGradient: 'linear-gradient(180deg, #778899 0%, #A9B4C2 50%, #B0C4DE 100%)',
  celebration: 'puddle',
  sceneDecor: 'rain',
  items: [
    // 雨天穿搭顺序
    { id: 'rain-coat', letter: 'R', word: 'Raincoat', wordCn: '雨衣', emoji: '🧥', position: 'outer-layer', zIndex: 4, flyFrom: 'left' },
    { id: 'rain-scarf', letter: 'S', word: 'Scarf', wordCn: '围巾', emoji: '🧣', position: 'neckwear', zIndex: 5, flyFrom: 'right' },
    { id: 'rain-hood', letter: 'H', word: 'Hood', wordCn: '雨帽', emoji: '🎓', position: 'headwear', zIndex: 9, flyFrom: 'left' },
    { id: 'rain-boots', letter: 'B', word: 'Boots', wordCn: '雨鞋', emoji: '🥾', position: 'footwear', zIndex: 5, flyFrom: 'right' },
    { id: 'rain-gloves', letter: 'G', word: 'Gloves', wordCn: '手套', emoji: '🧤', position: 'handwear', zIndex: 6, flyFrom: 'left' },
    { id: 'rain-umbrella', letter: 'U', word: 'Umbrella', wordCn: '雨伞', emoji: '☂️', position: 'accessory', zIndex: 10, flyFrom: 'right' },
  ],
};

// ☀️ 晴天主题
const sunnyTheme: DressTheme = {
  id: 'sunny',
  name: '晴天玩沙',
  nameEn: 'Sunny Day',
  emoji: '☀️',
  startOutfit: 'pajamas',
  startEmoji: '😴',
  bgGradient: 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 50%, #90EE90 100%)',
  celebration: 'sand',
  sceneDecor: 'sun',
  items: [
    // 晴天穿搭顺序
    { id: 'sunny-tshirt', letter: 'T', word: 'T-shirt', wordCn: 'T恤', emoji: '👕', position: 'outer-layer', zIndex: 3, flyFrom: 'left' },
    { id: 'sunny-shorts', letter: 'S', word: 'Shorts', wordCn: '短裤', emoji: '🩳', position: 'legwear', zIndex: 3, flyFrom: 'right' },
    { id: 'sunny-hat', letter: 'H', word: 'Hat', wordCn: '遮阳帽', emoji: '👒', position: 'headwear', zIndex: 9, flyFrom: 'left' },
    { id: 'sunny-sunglasses', letter: 'S', word: 'Sunglasses', wordCn: '太阳镜', emoji: '😎', position: 'eyewear', zIndex: 10, flyFrom: 'right' },
    { id: 'sunny-shoes', letter: 'S', word: 'Shoes', wordCn: '运动鞋', emoji: '👟', position: 'footwear', zIndex: 5, flyFrom: 'left' },
    { id: 'sunny-bottle', letter: 'B', word: 'Bottle', wordCn: '水壶', emoji: '🍼', position: 'accessory', zIndex: 6, flyFrom: 'right' },
    { id: 'sunny-bucket', letter: 'B', word: 'Bucket', wordCn: '沙桶', emoji: '🪣', position: 'ground-item', zIndex: 7, flyFrom: 'left' },
  ],
};

// 所有主题列表
export const dressThemes: DressTheme[] = [snowTheme, poolTheme, rainTheme, sunnyTheme];

// 随机获取一个主题
export function getRandomTheme(): DressTheme {
  const index = Math.floor(Math.random() * dressThemes.length);
  return dressThemes[index];
}
