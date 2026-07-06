import { useState, useEffect, useCallback, useRef } from 'react';
import { ClothingItem, DressTheme, getRandomTheme } from '../data/dressThemes';
import { speakLetter, speakWord, speakQuestion, speakPraise, initSpeech } from '../utils/speech';
import { useSound } from '../utils/SoundContext';
import { getRandomLine, formatQuestion, parseQuestion } from '../data/bunnyLines';
import { BunnyMood } from '../data/types';
import TopBar from '../components/TopBar';
import Bunny from '../components/Bunny';
import Keyboard from '../components/Keyboard';
import DressCharacter from '../components/DressCharacter';
import DressCelebration from '../components/DressCelebration';
import { useTimer } from '../utils/useTimer';
import './DressMode.css';

type GamePhase = 'intro' | 'playing' | 'celebrating';
type GameState = 'asking' | 'correct' | 'wrong' | 'sleepy';

function DressMode() {
  const { soundEnabled } = useSound();

  const [currentTheme, setCurrentTheme] = useState<DressTheme | null>(null);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [wornItems, setWornItems] = useState<ClothingItem[]>([]);
  const [gamePhase, setGamePhase] = useState<GamePhase>('intro');
  const [gameState, setGameState] = useState<GameState>('asking');
  const [questionTemplate, setQuestionTemplate] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [speechReady, setSpeechReady] = useState(false);
  const [characterHappy, setCharacterHappy] = useState(false);
  const questionAskedRef = useRef(false);

  const { isTimeUp } = useTimer({
    limitMinutes: 10,
    onTimeUp: () => setGameState('sleepy'),
  });

  const currentItem = currentTheme?.items[currentItemIndex] || null;

  // 开始新一轮游戏
  const startNewRound = useCallback(() => {
    const theme = getRandomTheme();
    setCurrentTheme(theme);
    setCurrentItemIndex(0);
    setWornItems([]);
    setGamePhase('intro');
    setGameState('asking');
    setShowHint(false);
    questionAskedRef.current = false;

    // 2秒后开始游戏
    setTimeout(() => {
      setGamePhase('playing');
    }, 2000);
  }, []);

  // 初始化
  useEffect(() => {
    initSpeech().then(() => {
      setSpeechReady(true);
    });
    startNewRound();
  }, [startNewRound]);

  // 设置问题
  useEffect(() => {
    if (currentItem && !questionAskedRef.current && gameState === 'asking' && gamePhase === 'playing') {
      questionAskedRef.current = true;
      const template = getRandomLine('question');
      setQuestionTemplate(template);
    }
  }, [currentItem, gameState, gamePhase]);

  // 播放问题
  useEffect(() => {
    if (currentItem && speechReady && soundEnabled && questionTemplate && gameState === 'asking' && gamePhase === 'playing') {
      const questionText = formatQuestion(questionTemplate, currentItem.letter);
      const timer = setTimeout(() => {
        speakQuestion(questionText, () => {
          speakLetter(currentItem.letter);
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentItem, speechReady, soundEnabled, questionTemplate, gameState, gamePhase]);

  // 重听问题
  const replayQuestion = useCallback(() => {
    if (!currentItem || !soundEnabled || !speechReady || isTimeUp || gamePhase !== 'playing') return;
    const template = getRandomLine('question');
    setQuestionTemplate(template);
    const question = formatQuestion(template, currentItem.letter);
    speakQuestion(question, () => {
      speakLetter(currentItem.letter);
    });
  }, [currentItem, soundEnabled, speechReady, isTimeUp, gamePhase]);

  // 空格键重听
  useEffect(() => {
    const handleSpace = (e: KeyboardEvent) => {
      if (e.code === 'Space' && gameState === 'asking' && !isTimeUp && gamePhase === 'playing') {
        e.preventDefault();
        replayQuestion();
      }
    };
    window.addEventListener('keydown', handleSpace);
    return () => window.removeEventListener('keydown', handleSpace);
  }, [gameState, isTimeUp, gamePhase, replayQuestion]);

  // 按键处理
  const handleKeyPress = useCallback((letter: string) => {
    if (!currentItem || gameState !== 'asking' || isTimeUp || gamePhase !== 'playing') return;

    if (letter.toUpperCase() === currentItem.letter.toUpperCase()) {
      // 答对了！
      setGameState('correct');
      setShowHint(true);
      setCharacterHappy(true);
      setWornItems(prev => [...prev, currentItem]);

      if (soundEnabled && speechReady) {
        speakWord(currentItem.word, () => {
          const praise = getRandomLine('correct');
          speakPraise(praise);
        });
      }

      setTimeout(() => setCharacterHappy(false), 800);

      // 判断是否全部穿完
      const isLastItem = currentItemIndex >= (currentTheme?.items.length || 8) - 1;
      setTimeout(() => {
        if (isLastItem) {
          // 全部穿完，庆祝
          setGamePhase('celebrating');
          // 庆祝3秒后开始新一轮
          setTimeout(() => {
            startNewRound();
          }, 3500);
        } else {
          // 下一件衣服
          setCurrentItemIndex(prev => prev + 1);
          setShowHint(false);
          setGameState('asking');
          questionAskedRef.current = false;
        }
      }, 1500);
    } else {
      // 答错 - 鼓励
      setGameState('wrong');
      if (soundEnabled && speechReady) {
        const encourage = getRandomLine('wrong');
        speakPraise(encourage);
      }
      setTimeout(() => {
        setGameState('asking');
      }, 1200);
    }
  }, [currentItem, gameState, soundEnabled, speechReady, isTimeUp, gamePhase, currentItemIndex, currentTheme, startNewRound]);

  const handleBunnyClick = () => {
    if (isTimeUp || gamePhase !== 'playing') return;
    replayQuestion();
  };

  const handleHintClick = () => {
    if (currentItem && soundEnabled && speechReady) {
      speakWord(currentItem.word);
    }
    setShowHint(true);
  };

  const bunnyMood: BunnyMood =
    gameState === 'correct' ? 'happy' :
    gameState === 'wrong' ? 'encouraging' :
    gameState === 'sleepy' ? 'sleepy' :
    'thinking';

  if (!currentTheme) {
    return <div className="dress-page">Loading...</div>;
  }

  return (
    <div
      className="dress-page"
      style={{ background: currentTheme.bgGradient }}
    >
      <TopBar title={currentTheme.name} />

      {/* 主题介绍卡片 */}
      {gamePhase === 'intro' && (
        <div className="theme-intro-overlay">
          <div className="theme-intro-card">
            <div className="theme-intro-emoji">{currentTheme.emoji}</div>
            <div className="theme-intro-name">{currentTheme.name}</div>
            <div className="theme-intro-name-en">{currentTheme.nameEn}</div>
          </div>
        </div>
      )}

      {/* 庆祝动画 */}
      {gamePhase === 'celebrating' && (
        <DressCelebration type={currentTheme.celebration} />
      )}

      <div className="dress-content">
        {/* 左侧：穿衣服小人 */}
        <div className="dress-character-area">
          <DressCharacter
            theme={currentTheme}
            wornItems={wornItems}
            isHappy={characterHappy}
            size="large"
          />
          <div className="dress-progress">
            {wornItems.length} / {currentTheme.items.length}
          </div>
        </div>

        {/* 右侧：小兔子 + 问题 */}
        <div className="dress-right-area">
          {gamePhase === 'playing' && gameState === 'asking' && currentItem && (
            <div className="question-row">
              <div className="question-bunny-avatar">
                <Bunny mood={bunnyMood} size="small" onClick={handleBunnyClick} />
              </div>
              <div className="question-box">
                <div className="question-text">
                  {questionTemplate && (() => {
                    const parts = parseQuestion(questionTemplate, currentItem.letter);
                    return (
                      <>
                        {parts.before}
                        {parts.letter && (
                          <span className="question-letter">{parts.letter}</span>
                        )}
                        {parts.after}
                      </>
                    );
                  })()}
                </div>
                {questionTemplate && !questionTemplate.includes('{letter}') && (
                  <div className="question-big-letter">
                    {currentItem.letter.toUpperCase()}
                  </div>
                )}
                <div className="question-buttons">
                  <button className="replay-btn" onClick={replayQuestion} aria-label="Replay question">
                    🔊
                  </button>
                  {!showHint && (
                    <button className="hint-btn" onClick={handleHintClick}>
                      👀
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {(gameState === 'correct' || showHint) && currentItem && (
            <div className="dress-word-display">
              <div className="dress-word-emoji">{currentItem.emoji}</div>
              <div className="dress-word-text">
                <span className="dress-word-letter">{currentItem.letter.toUpperCase()}</span>
                <span className="dress-word-name">{currentItem.word}</span>
              </div>
            </div>
          )}

          {gameState === 'sleepy' && (
            <div className="sleepy-message">
              <div className="sleepy-emoji">😴</div>
              <div className="sleepy-text">I'm sleepy... let's rest!</div>
            </div>
          )}

          <div className="dress-bunny-area">
            <Bunny mood={bunnyMood} size="medium" onClick={handleBunnyClick} />
          </div>
        </div>
      </div>

      {/* 底部键盘 */}
      <div className="dress-keyboard-area">
        <Keyboard
          onKeyPress={handleKeyPress}
          highlightLetter={gameState === 'correct' ? currentItem?.letter : null}
        />
      </div>
    </div>
  );
}

export default DressMode;
