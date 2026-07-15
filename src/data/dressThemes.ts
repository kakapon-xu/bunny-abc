// 穿衣主题配置 — JPG 图片序列版本
// 图片资源位于 public/dress-up/assets/

export interface DressItem {
  letter: string;
  word: string;
  wordCn: string;
  emoji: string;
  stepImg: string;
  // 向后兼容沉睡代码 DressCharacter.tsx
  id?: string;
  zIndex?: number;
  flyFrom?: string;
  position?: string;
}

export interface DressTheme {
  id: string;
  name: string;
  nameEn: string;
  emoji: string;
  startImg: string;
  finalImg: string;
  celebrationEmoji: string;
  celebrationText: string;
  items: DressItem[];
  weatherEffect?: 'clouds' | 'rain' | 'snow' | 'bubbles' | 'hearts' | 'steam';
  bgGradient?: string;
  sceneDecor?: string; // 向后兼容沉睡代码
}

export const dressThemes: Record<string, DressTheme> = {
  sunny: {
    id: 'sunny',
    name: '阳光海滩',
    nameEn: 'Sunny Beach',
    emoji: '☀️',
    startImg: 'dress-up/assets/sunny-start.jpg',
    finalImg: 'dress-up/assets/sunny-final.jpg',
    celebrationEmoji: '🏖️',
    celebrationText: 'Beach time!',
    weatherEffect: 'clouds',
    bgGradient: 'linear-gradient(180deg, #87CEEB 0%, #FFF8DC 50%, #F4E3C1 100%)',
    items: [
      { letter: 'H', word: 'Hat', wordCn: '草帽', emoji: '👒', stepImg: 'dress-up/assets/sunny-step1.jpg' },
      { letter: 'T', word: 'T-shirt', wordCn: 'T恤', emoji: '👕', stepImg: 'dress-up/assets/sunny-step2.jpg' },
      { letter: 'S', word: 'Shorts', wordCn: '短裤', emoji: '🩳', stepImg: 'dress-up/assets/sunny-step3.jpg' },
      { letter: 'S', word: 'Shoes', wordCn: '鞋子', emoji: '👟', stepImg: 'dress-up/assets/sunny-step4.jpg' },
      { letter: 'S', word: 'Sunglasses', wordCn: '太阳镜', emoji: '🕶️', stepImg: 'dress-up/assets/sunny-step5.jpg' },
      { letter: 'B', word: 'Bucket', wordCn: '沙桶', emoji: '🪣', stepImg: 'dress-up/assets/sunny-step6.jpg' },
    ]
  },
  pool: {
    id: 'pool',
    name: '泳池派对',
    nameEn: 'Pool Day',
    emoji: '🏊',
    startImg: 'dress-up/assets/pool-start.jpg',
    finalImg: 'dress-up/assets/pool-final.jpg',
    celebrationEmoji: '💦',
    celebrationText: 'Splash!',
    weatherEffect: 'bubbles',
    bgGradient: 'linear-gradient(180deg, #87CEEB 0%, #98FB98 100%)',
    items: [
      { letter: 'S', word: 'Swimsuit', wordCn: '泳衣', emoji: '👙', stepImg: 'dress-up/assets/pool-step1.jpg' },
      { letter: 'C', word: 'Swim Cap', wordCn: '泳帽', emoji: '🧢', stepImg: 'dress-up/assets/pool-step2.jpg' },
      { letter: 'G', word: 'Goggles', wordCn: '泳镜', emoji: '🥽', stepImg: 'dress-up/assets/pool-step3.jpg' },
      { letter: 'A', word: 'Armbands', wordCn: '手臂圈', emoji: '💪', stepImg: 'dress-up/assets/pool-step4.jpg' },
      { letter: 'F', word: 'Float', wordCn: '游泳圈', emoji: '⭕', stepImg: 'dress-up/assets/pool-step5.jpg' },
      { letter: 'S', word: 'Slippers', wordCn: '拖鞋', emoji: '🩴', stepImg: 'dress-up/assets/pool-step6.jpg' },
    ]
  },
  rainy: {
    id: 'rainy',
    name: '雨天踩水',
    nameEn: 'Rainy Day',
    emoji: '☔',
    startImg: 'dress-up/assets/rainy-start.jpg',
    finalImg: 'dress-up/assets/rainy-final.jpg',
    celebrationEmoji: '🌧️',
    celebrationText: 'Rain rain go away!',
    weatherEffect: 'rain',
    bgGradient: 'linear-gradient(180deg, #778899 0%, #B0C4DE 100%)',
    items: [
      { letter: 'R', word: 'Raincoat', wordCn: '雨衣', emoji: '🧥', stepImg: 'dress-up/assets/rainy-step1.jpg' },
      { letter: 'B', word: 'Rain Boots', wordCn: '雨靴', emoji: '🥾', stepImg: 'dress-up/assets/rainy-step2.jpg' },
      { letter: 'U', word: 'Umbrella', wordCn: '雨伞', emoji: '☂️', stepImg: 'dress-up/assets/rainy-step3.jpg' },
      { letter: 'F', word: 'Frog', wordCn: '小青蛙', emoji: '🐸', stepImg: 'dress-up/assets/rainy-step4.jpg' },
      { letter: 'S', word: 'Snail', wordCn: '小蜗牛', emoji: '🐌', stepImg: 'dress-up/assets/rainy-step5.jpg' },
    ]
  },
  snowy: {
    id: 'snowy',
    name: '雪天滑雪',
    nameEn: 'Snowy Day',
    emoji: '❄️',
    startImg: 'dress-up/assets/snowy-start.jpg',
    finalImg: 'dress-up/assets/snowy-final.jpg',
    celebrationEmoji: '⛄',
    celebrationText: 'Snow much fun!',
    weatherEffect: 'snow',
    bgGradient: 'linear-gradient(180deg, #B0E0E6 0%, #F0F8FF 100%)',
    items: [
      { letter: 'C', word: 'Coat', wordCn: '外套', emoji: '🧥', stepImg: 'dress-up/assets/snowy-step1.jpg' },
      { letter: 'S', word: 'Scarf', wordCn: '围巾', emoji: '🧣', stepImg: 'dress-up/assets/snowy-step2.jpg' },
      { letter: 'H', word: 'Hat', wordCn: '帽子', emoji: '🧢', stepImg: 'dress-up/assets/snowy-step3.jpg' },
      { letter: 'G', word: 'Gloves', wordCn: '手套', emoji: '🧤', stepImg: 'dress-up/assets/snowy-step4.jpg' },
      { letter: 'B', word: 'Snow Boots', wordCn: '雪地靴', emoji: '🥾', stepImg: 'dress-up/assets/snowy-step5.jpg' },
      { letter: 'S', word: 'Snowboard', wordCn: '滑雪板', emoji: '🏂', stepImg: 'dress-up/assets/snowy-step6.jpg' },
    ]
  },
  doctor: {
    id: 'doctor',
    name: '小医生',
    nameEn: 'Little Doctor',
    emoji: '🩺',
    startImg: 'dress-up/assets/doctor-start.jpg',
    finalImg: 'dress-up/assets/doctor-final-v3.jpg',
    celebrationEmoji: '❤️',
    celebrationText: 'All better!',
    weatherEffect: 'hearts',
    bgGradient: 'linear-gradient(180deg, #E8F5E9 0%, #FFF9C4 100%)',
    items: [
      { letter: 'W', word: 'White Coat', wordCn: '白大褂', emoji: '🥼', stepImg: 'dress-up/assets/doctor-step1.jpg' },
      { letter: 'M', word: 'Mask', wordCn: '口罩', emoji: '😷', stepImg: 'dress-up/assets/doctor-step2.jpg' },
      { letter: 'H', word: 'Doctor Hat', wordCn: '医生帽', emoji: '⛑️', stepImg: 'dress-up/assets/doctor-step3.jpg' },
      { letter: 'S', word: 'Stethoscope', wordCn: '听诊器', emoji: '🩺', stepImg: 'dress-up/assets/doctor-step4.jpg' },
      { letter: 'T', word: 'Thermometer', wordCn: '体温计', emoji: '🌡️', stepImg: 'dress-up/assets/doctor-step5.jpg' },
      { letter: 'M', word: 'Medicine', wordCn: '药', emoji: '💊', stepImg: 'dress-up/assets/doctor-step6.jpg' },
      { letter: 'B', word: 'Band-aid', wordCn: '创可贴', emoji: '🩹', stepImg: 'dress-up/assets/doctor-step7.jpg' },
    ]
  },
  chef: {
    id: 'chef',
    name: '小厨师',
    nameEn: 'Little Chef',
    emoji: '👨‍🍳',
    startImg: 'dress-up/assets/chef-start.jpg',
    finalImg: 'dress-up/assets/chef-final.jpg',
    celebrationEmoji: '🎂',
    celebrationText: "Let's bake a cake!",
    weatherEffect: 'steam',
    bgGradient: 'linear-gradient(180deg, #FFF3E0 0%, #FFECB3 100%)',
    items: [
      { letter: 'A', word: 'Apron', wordCn: '围裙', emoji: '👩‍🍳', stepImg: 'dress-up/assets/chef-step1.jpg' },
      { letter: 'C', word: 'Chef Hat', wordCn: '厨师帽', emoji: '🎩', stepImg: 'dress-up/assets/chef-step2.jpg' },
      { letter: 'R', word: 'Rolling Pin', wordCn: '擀面杖', emoji: '🥖', stepImg: 'dress-up/assets/chef-step3.jpg' },
      { letter: 'D', word: 'Dough', wordCn: '面团', emoji: '🍞', stepImg: 'dress-up/assets/chef-step4.jpg' },
      { letter: 'O', word: 'Oven', wordCn: '烤箱', emoji: '🔥', stepImg: 'dress-up/assets/chef-step5.jpg' },
      { letter: 'P', word: 'Plate', wordCn: '盘子', emoji: '🍽️', stepImg: 'dress-up/assets/chef-step6.jpg' },
      { letter: 'B', word: 'Bread', wordCn: '面包', emoji: '🍞', stepImg: 'dress-up/assets/chef-step7.jpg' },
      { letter: 'C', word: 'Cookie', wordCn: '饼干', emoji: '🍪', stepImg: 'dress-up/assets/chef-step8.jpg' },
      { letter: 'C', word: 'Cake', wordCn: '蛋糕', emoji: '🎂', stepImg: 'dress-up/assets/chef-step9.jpg' },
      { letter: 'F', word: 'Fork', wordCn: '叉子', emoji: '🍴', stepImg: 'dress-up/assets/chef-step10.jpg' },
      { letter: 'K', word: 'Knife', wordCn: '刀', emoji: '🔪', stepImg: 'dress-up/assets/chef-step11.jpg' },
    ]
  },
};

export const dressThemeList = Object.values(dressThemes);

// 向后兼容旧类型（沉睡代码 DressCharacter.tsx / DressCelebration.tsx 引用）
// 旧代码要求 id、zIndex、flyFrom、position 为必填字段
export type ClothingItem = DressItem & Required<Pick<DressItem, 'id' | 'zIndex'>>;
export type ClothingPosition = string;
export type CelebrationType = 'swim' | 'ski' | 'puddle' | 'sand';