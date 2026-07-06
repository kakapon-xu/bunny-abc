// 穿衣服模式 - 主题配置数据

export type ClothingPosition =
  | 'head'
  | 'eyes'
  | 'neck'
  | 'body-inner'
  | 'body-mid'
  | 'body-outer'
  | 'legs-inner'
  | 'legs-outer'
  | 'hands'
  | 'feet'
  | 'accessory';

export type CelebrationType = 'swim' | 'ski' | 'puddle' | 'sand';

export interface ClothingItem {
  id: string;
  letter: string;
  word: string;
  wordCn: string;
  emoji: string;
  position: ClothingPosition;
  zIndex: number;
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
}

// 🏊 泳池主题
const poolTheme: DressTheme = {
  id: 'pool',
  name: '泳池派对',
  nameEn: 'Pool Party',
  emoji: '🏊',
  startOutfit: 'diaper',
  startEmoji: '👶',
  bgGradient: 'linear-gradient(180deg, #87CEEB 0%, #98FB98 100%)',
  celebration: 'swim',
  items: [
    { id: 'pool-1', letter: 'S', word: 'Swimsuit', wordCn: '泳衣', emoji: '👙', position: 'body-outer', zIndex: 3 },
    { id: 'pool-2', letter: 'T', word: 'Trunks', wordCn: '泳裤', emoji: '🩳', position: 'legs-outer', zIndex: 3 },
    { id: 'pool-3', letter: 'G', word: 'Goggles', wordCn: '泳镜', emoji: '🥽', position: 'eyes', zIndex: 10 },
    { id: 'pool-4', letter: 'C', word: 'Cap', wordCn: '泳帽', emoji: '🧢', position: 'head', zIndex: 9 },
    { id: 'pool-5', letter: 'F', word: 'Flip-flops', wordCn: '拖鞋', emoji: '🩴', position: 'feet', zIndex: 5 },
    { id: 'pool-6', letter: 'R', word: 'Ring', wordCn: '救生圈', emoji: '⭕', position: 'accessory', zIndex: 8 },
    { id: 'pool-7', letter: 'B', word: 'Ball', wordCn: '沙滩球', emoji: '🏐', position: 'accessory', zIndex: 7 },
    { id: 'pool-8', letter: 'S', word: 'Sunglasses', wordCn: '太阳镜', emoji: '😎', position: 'eyes', zIndex: 11 },
  ],
};

// ❄️ 雪天主题
const snowTheme: DressTheme = {
  id: 'snow',
  name: '雪天玩耍',
  nameEn: 'Snow Day',
  emoji: '❄️',
  startOutfit: 'pajamas',
  startEmoji: '😴',
  bgGradient: 'linear-gradient(180deg, #B0E0E6 0%, #F0F8FF 100%)',
  celebration: 'ski',
  items: [
    { id: 'snow-1', letter: 'T', word: 'Thermal', wordCn: '秋衣', emoji: '👕', position: 'body-inner', zIndex: 1 },
    { id: 'snow-2', letter: 'L', word: 'Leggings', wordCn: '秋裤', emoji: '🩲', position: 'legs-inner', zIndex: 1 },
    { id: 'snow-3', letter: 'S', word: 'Sweater', wordCn: '毛衣', emoji: '🧶', position: 'body-mid', zIndex: 2 },
    { id: 'snow-4', letter: 'P', word: 'Pants', wordCn: '裤子', emoji: '👖', position: 'legs-outer', zIndex: 3 },
    { id: 'snow-5', letter: 'J', word: 'Jacket', wordCn: '外套', emoji: '🧥', position: 'body-outer', zIndex: 4 },
    { id: 'snow-6', letter: 'H', word: 'Hat', wordCn: '帽子', emoji: '🎩', position: 'head', zIndex: 9 },
    { id: 'snow-7', letter: 'G', word: 'Gloves', wordCn: '手套', emoji: '🧤', position: 'hands', zIndex: 6 },
    { id: 'snow-8', letter: 'S', word: 'Snowboard', wordCn: '滑雪板', emoji: '🏂', position: 'feet', zIndex: 7 },
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
  bgGradient: 'linear-gradient(180deg, #778899 0%, #B0C4DE 100%)',
  celebration: 'puddle',
  items: [
    { id: 'rain-1', letter: 'R', word: 'Raincoat', wordCn: '雨衣', emoji: '🧥', position: 'body-outer', zIndex: 4 },
    { id: 'rain-2', letter: 'B', word: 'Boots', wordCn: '雨鞋', emoji: '🥾', position: 'feet', zIndex: 5 },
    { id: 'rain-3', letter: 'U', word: 'Umbrella', wordCn: '雨伞', emoji: '☂️', position: 'accessory', zIndex: 8 },
    { id: 'rain-4', letter: 'H', word: 'Hood', wordCn: '雨帽', emoji: '🎓', position: 'head', zIndex: 9 },
    { id: 'rain-5', letter: 'S', word: 'Scarf', wordCn: '围巾', emoji: '🧣', position: 'neck', zIndex: 5 },
    { id: 'rain-6', letter: 'G', word: 'Gloves', wordCn: '手套', emoji: '🧤', position: 'hands', zIndex: 6 },
    { id: 'rain-7', letter: 'P', word: 'Poncho', wordCn: '雨披', emoji: '🧥', position: 'body-outer', zIndex: 7 },
    { id: 'rain-8', letter: 'B', word: 'Backpack', wordCn: '书包', emoji: '🎒', position: 'accessory', zIndex: 6 },
  ],
};

// 🌞 晴天主题
const sunnyTheme: DressTheme = {
  id: 'sunny',
  name: '晴天玩沙',
  nameEn: 'Sunny Day',
  emoji: '☀️',
  startOutfit: 'pajamas',
  startEmoji: '😴',
  bgGradient: 'linear-gradient(180deg, #FFD700 0%, #FFA500 100%)',
  celebration: 'sand',
  items: [
    { id: 'sunny-1', letter: 'T', word: 'T-shirt', wordCn: 'T恤', emoji: '👕', position: 'body-outer', zIndex: 3 },
    { id: 'sunny-2', letter: 'S', word: 'Shorts', wordCn: '短裤', emoji: '🩳', position: 'legs-outer', zIndex: 3 },
    { id: 'sunny-3', letter: 'S', word: 'Sunglasses', wordCn: '太阳镜', emoji: '😎', position: 'eyes', zIndex: 10 },
    { id: 'sunny-4', letter: 'H', word: 'Hat', wordCn: '遮阳帽', emoji: '👒', position: 'head', zIndex: 9 },
    { id: 'sunny-5', letter: 'S', word: 'Sneakers', wordCn: '运动鞋', emoji: '👟', position: 'feet', zIndex: 5 },
    { id: 'sunny-6', letter: 'B', word: 'Bottle', wordCn: '水壶', emoji: '🍼', position: 'accessory', zIndex: 7 },
    { id: 'sunny-7', letter: 'B', word: 'Ball', wordCn: '皮球', emoji: '⚽', position: 'accessory', zIndex: 6 },
    { id: 'sunny-8', letter: 'B', word: 'Bucket', wordCn: '沙桶', emoji: '🪣', position: 'accessory', zIndex: 8 },
  ],
};

// 所有主题列表
export const dressThemes: DressTheme[] = [poolTheme, snowTheme, rainTheme, sunnyTheme];

// 随机获取一个主题
export function getRandomTheme(): DressTheme {
  const index = Math.floor(Math.random() * dressThemes.length);
  return dressThemes[index];
}
