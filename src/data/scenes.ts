import { Scene } from './types'

export const scenes: Scene[] = [
  {
    id: 'fruit',
    name: '水果园',
    nameEn: 'Fruit Garden',
    emoji: '🍎',
    bgFrom: '#ffd6e0',
    bgTo: '#ffe8cc',
    wordIds: ['apple', 'banana', 'grape', 'juice', 'orange', 'peach'],
  },
  {
    id: 'zoo',
    name: '动物园',
    nameEn: 'Zoo',
    emoji: '🐶',
    bgFrom: '#c8f0d0',
    bgTo: '#e8f5d0',
    wordIds: ['cat', 'dog', 'elephant', 'fish', 'horse'],
  },
  {
    id: 'rainbow',
    name: '彩虹屋',
    nameEn: 'Rainbow House',
    emoji: '🎨',
    bgFrom: '#c5e0ff',
    bgTo: '#e0d0ff',
    wordIds: ['red', 'white', 'yellow', 'black', 'pink'],
  },
  {
    id: 'toy',
    name: '玩具屋',
    nameEn: 'Toy Room',
    emoji: '🧸',
    bgFrom: '#fff4b8',
    bgTo: '#ffe0c0',
    wordIds: ['ball', 'car', 'doll', 'kite', 'train'],
  },
  {
    id: 'kitchen',
    name: '小厨房',
    nameEn: 'Kitchen',
    emoji: '🍽️',
    bgFrom: '#f0d8ff',
    bgTo: '#ffe4f0',
    wordIds: ['bread', 'egg', 'icecream', 'lemon', 'milk', 'noodle'],
  },
  {
    id: 'night',
    name: '夜空花园',
    nameEn: 'Night Garden',
    emoji: '🌙',
    bgFrom: '#b8d0ff',
    bgTo: '#d0c0f0',
    wordIds: ['flower', 'moon', 'quiet', 'star', 'sun', 'umbrella', 'violin', 'box', 'zebra'],
  },
  {
    id: 'dress',
    name: '穿衣服乐园',
    nameEn: 'Dress Up Fun',
    emoji: '👗',
    bgFrom: '#ffd6f0',
    bgTo: '#e0ccff',
    wordIds: [],
    isSpecial: true, // 特殊场景，有独立的游戏模式
  },
]

export function getSceneById(id: string): Scene | undefined {
  return scenes.find(s => s.id === id)
}
