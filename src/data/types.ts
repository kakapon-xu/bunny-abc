// Type definitions for Bunny ABC

export interface Word {
  id: string
  text: string
  letter: string
  emoji: string
  sceneId: string
  isReview?: boolean
}

export interface Scene {
  id: string
  name: string
  nameEn: string
  emoji: string
  bgFrom: string
  bgTo: string
  wordIds: string[]
  isSpecial?: boolean // 特殊场景，有独立的游戏模式
}

export interface BunnyLines {
  explore: string[]
  question: string[]
  correct: string[]
  wrong: string[]
  rest: string[]
  greet: string[]
}

export type BunnyMood = 'idle' | 'surprised' | 'happy' | 'thinking' | 'encouraging' | 'sleepy'

export type GameMode = 'explore' | 'listen'
