import { BunnyLines } from './types'

export const bunnyLines: BunnyLines = {
  greet: [
    "Hi there!",
    "Hello!",
    "Let's play!",
    "Welcome!",
  ],
  explore: [
    "Wow!",
    "Look!",
    "So pretty!",
    "How cute!",
    "Amazing!",
    "Nice!",
  ],
  question: [
    "Can you find {letter}?",
    "Where is {letter}?",
    "Listen... What letter is this?",
    "Find {letter}!",
    "Show me {letter}!",
  ],
  correct: [
    "Great job!",
    "You did it!",
    "Yes! That's right!",
    "Wonderful!",
    "Excellent!",
    "Perfect!",
  ],
  wrong: [
    "Try again!",
    "Almost there!",
    "Keep trying!",
    "That's okay, try again!",
    "Not quite, try again!",
  ],
  rest: [
    "I'm sleepy...",
    "Let's rest our eyes!",
    "Yawn... so tired!",
    "Time for a break!",
  ],
}

// Fill in the {letter} placeholder in a question line
export function formatQuestion(template: string, letter: string): string {
  return template.replace('{letter}', letter.toUpperCase())
}

// Get a random line from a category
export function getRandomLine(category: keyof BunnyLines): string {
  const lines = bunnyLines[category]
  return lines[Math.floor(Math.random() * lines.length)]
}
