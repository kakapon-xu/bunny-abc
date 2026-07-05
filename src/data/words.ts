import { Word } from './types'

export const words: Word[] = [
  // 🍎 水果园 - Fruit Garden
  { id: 'apple', text: 'Apple', letter: 'A', emoji: '🍎', sceneId: 'fruit' },
  { id: 'banana', text: 'Banana', letter: 'B', emoji: '🍌', sceneId: 'fruit' },
  { id: 'grape', text: 'Grape', letter: 'G', emoji: '🍇', sceneId: 'fruit' },
  { id: 'juice', text: 'Juice', letter: 'J', emoji: '🧃', sceneId: 'fruit' },
  { id: 'orange', text: 'Orange', letter: 'O', emoji: '🍊', sceneId: 'fruit' },
  { id: 'peach', text: 'Peach', letter: 'P', emoji: '🍑', sceneId: 'fruit' },

  // 🐶 动物园 - Zoo
  { id: 'cat', text: 'Cat', letter: 'C', emoji: '🐱', sceneId: 'zoo' },
  { id: 'dog', text: 'Dog', letter: 'D', emoji: '🐶', sceneId: 'zoo' },
  { id: 'elephant', text: 'Elephant', letter: 'E', emoji: '🐘', sceneId: 'zoo' },
  { id: 'fish', text: 'Fish', letter: 'F', emoji: '🐟', sceneId: 'zoo' },
  { id: 'horse', text: 'Horse', letter: 'H', emoji: '🐴', sceneId: 'zoo' },

  // 🎨 彩虹屋 - Rainbow House
  { id: 'red', text: 'Red', letter: 'R', emoji: '🔴', sceneId: 'rainbow' },
  { id: 'white', text: 'White', letter: 'W', emoji: '⚪', sceneId: 'rainbow' },
  { id: 'yellow', text: 'Yellow', letter: 'Y', emoji: '🟡', sceneId: 'rainbow' },
  { id: 'black', text: 'Black', letter: 'B', emoji: '⬛', sceneId: 'rainbow', isReview: true },
  { id: 'pink', text: 'Pink', letter: 'P', emoji: '🩷', sceneId: 'rainbow', isReview: true },

  // 🧸 玩具屋 - Toy Room
  { id: 'ball', text: 'Ball', letter: 'B', emoji: '⚽', sceneId: 'toy', isReview: true },
  { id: 'car', text: 'Car', letter: 'C', emoji: '🚗', sceneId: 'toy', isReview: true },
  { id: 'doll', text: 'Doll', letter: 'D', emoji: '🧸', sceneId: 'toy', isReview: true },
  { id: 'kite', text: 'Kite', letter: 'K', emoji: '🪁', sceneId: 'toy' },
  { id: 'train', text: 'Train', letter: 'T', emoji: '🚂', sceneId: 'toy' },

  // 🍽️ 小厨房 - Kitchen
  { id: 'bread', text: 'Bread', letter: 'B', emoji: '🍞', sceneId: 'kitchen', isReview: true },
  { id: 'egg', text: 'Egg', letter: 'E', emoji: '🍳', sceneId: 'kitchen', isReview: true },
  { id: 'icecream', text: 'Ice cream', letter: 'I', emoji: '🍦', sceneId: 'kitchen' },
  { id: 'lemon', text: 'Lemon', letter: 'L', emoji: '🍋', sceneId: 'kitchen' },
  { id: 'milk', text: 'Milk', letter: 'M', emoji: '🥛', sceneId: 'kitchen' },
  { id: 'noodle', text: 'Noodle', letter: 'N', emoji: '🍝', sceneId: 'kitchen' },

  // 🌙 夜空花园 - Night Garden
  { id: 'flower', text: 'Flower', letter: 'F', emoji: '🌸', sceneId: 'night', isReview: true },
  { id: 'moon', text: 'Moon', letter: 'M', emoji: '🌙', sceneId: 'night', isReview: true },
  { id: 'quiet', text: 'Quiet', letter: 'Q', emoji: '🤫', sceneId: 'night' },
  { id: 'star', text: 'Star', letter: 'S', emoji: '⭐', sceneId: 'night' },
  { id: 'sun', text: 'Sun', letter: 'S', emoji: '☀️', sceneId: 'night', isReview: true },
  { id: 'umbrella', text: 'Umbrella', letter: 'U', emoji: '☂️', sceneId: 'night' },
  { id: 'violin', text: 'Violin', letter: 'V', emoji: '🎻', sceneId: 'night' },
  { id: 'box', text: 'Box', letter: 'X', emoji: '📦', sceneId: 'night' },
  { id: 'zebra', text: 'Zebra', letter: 'Z', emoji: '🦓', sceneId: 'night' },
]

export function getWordsByScene(sceneId: string): Word[] {
  return words.filter(w => w.sceneId === sceneId)
}

export function getWordById(id: string): Word | undefined {
  return words.find(w => w.id === id)
}

export function getRandomWordByLetter(letter: string, sceneId?: string): Word | undefined {
  const upperLetter = letter.toUpperCase()
  let pool = words.filter(w => w.letter.toUpperCase() === upperLetter)
  if (sceneId) {
    const sceneWords = pool.filter(w => w.sceneId === sceneId)
    if (sceneWords.length > 0) {
      pool = sceneWords
    }
  }
  if (pool.length === 0) return undefined
  return pool[Math.floor(Math.random() * pool.length)]
}
