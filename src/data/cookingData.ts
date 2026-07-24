// 做饭模式 — 食谱数据模型
export interface CookingStep {
  letter: string        // 按键字母
  word: string          // 英文单词
  wordCn: string        // 中文
  emoji: string         // 道具图标
  action: string        // 动作词组（语音播报用）
  image: string         // 步骤图片路径
}

export interface CookingRecipe {
  id: string
  name: string
  nameEn: string
  emoji: string
  startImage: string
  finalImage: string
  steps: CookingStep[]
}

// 手工面条食谱
export const noodleRecipe: CookingRecipe = {
  id: 'noodle',
  name: '手工面条',
  nameEn: 'Handmade Noodles',
  emoji: '🍜',
  startImage: '/cooking/noodle-start.svg',
  finalImage: '/cooking/noodle-final.svg',
  steps: [
    {
      letter: 'F', word: 'Flour', wordCn: '面粉', emoji: '🌾',
      action: 'Add flour', image: '/cooking/noodle-step1.svg',
    },
    {
      letter: 'W', word: 'Water', wordCn: '水', emoji: '💧',
      action: 'Add water', image: '/cooking/noodle-step2.svg',
    },
    {
      letter: 'M', word: 'Mix', wordCn: '搅拌', emoji: '👐',
      action: 'Mix it up', image: '/cooking/noodle-step3.svg',
    },
    {
      letter: 'R', word: 'Roll', wordCn: '擀面', emoji: '🍥',
      action: 'Roll it flat', image: '/cooking/noodle-step4.svg',
    },
    {
      letter: 'C', word: 'Cut', wordCn: '切面', emoji: '🔪',
      action: 'Cut the dough', image: '/cooking/noodle-step5.svg',
    },
    {
      letter: 'B', word: 'Boil', wordCn: '煮面', emoji: '🔥',
      action: 'Boil noodles', image: '/cooking/noodle-step6.svg',
    },
  ],
}

// 当前仅一道菜，未来扩展为数组
export const allRecipes: CookingRecipe[] = [noodleRecipe]

/** 获取食谱 */
export function getRecipeById(id: string): CookingRecipe | undefined {
  return allRecipes.find(r => r.id === id)
}

/** 预加载食谱的所有图片 */
export function preloadRecipeImages(recipe: CookingRecipe): void {
  const images = [recipe.startImage, recipe.finalImage, ...recipe.steps.map(s => s.image)]
  images.forEach(src => {
    const img = new Image()
    img.src = src
  })
}
