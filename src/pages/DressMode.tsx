import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dressThemes, dressThemeList, DressItem } from '../data/dressThemes';
import { speakLetter, speakWord } from '../utils/speech';
import { useSound } from '../utils/SoundContext';
import Keyboard from '../components/Keyboard';
import TopBar from '../components/TopBar';
import './DressMode.css';

export default function DressMode() {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();
  const { soundEnabled } = useSound();
  const theme = themeId ? dressThemes[themeId] : undefined;

  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [currentImg, setCurrentImg] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [showPop, setShowPop] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const sparkleIdRef = useRef(0);
  const wrongTimerRef = useRef<number | null>(null);
  const bunnyRef = useRef<HTMLDivElement>(null);

  // 初始化主题状态
  useEffect(() => {
    if (theme) {
      setCurrentImg(theme.startImg);
      setCurrentItemIndex(0);
      setIsCelebrating(false);
      setIsAnswering(false);
      setShowPop(false);
    }
  }, [themeId]);

  // 预加载所有图片
  useEffect(() => {
    if (!theme) return;
    const images = [theme.startImg, theme.finalImg, ...theme.items.map(i => i.stepImg)];
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [theme]);

  const currentItem: DressItem | undefined = theme?.items[currentItemIndex];

  // 星星特效 - 相对于 bunny 容器定位
  const emitSparkle = useCallback(() => {
    if (!bunnyRef.current) return;
    const rect = bunnyRef.current.getBoundingClientRect();
    const id = ++sparkleIdRef.current;
    const x = Math.random() * rect.width;
    const y = Math.random() * rect.height * 0.5;
    setSparkles(prev => [...prev, { id, x, y }]);
    setTimeout(() => setSparkles(prev => prev.filter(s => s.id !== id)), 800);
  }, []);

  const handleKeyPress = useCallback((letter: string) => {
    if (!theme || !currentItem || isCelebrating || isAnswering) return;
    const upper = letter.toUpperCase();
    if (upper === currentItem.letter) {
      // 答对
      setIsAnswering(true);
      emitSparkle();
      const isLast = currentItemIndex >= theme.items.length - 1;

      if (isLast) {
        // 最后一个道具：立即显示最终图 + 庆祝
        setCurrentImg(theme.finalImg);
        setCurrentItemIndex(i => i + 1);
        setShowPop(true);
        setIsAnswering(false);
        setTimeout(() => setIsCelebrating(true), 300);
        if (soundEnabled) {
          speakLetter(currentItem.letter, () => speakWord(currentItem.word));
        }
      } else {
        // 非最后：200ms 后切换步骤图
        setTimeout(() => {
          setCurrentImg(currentItem.stepImg);
          setCurrentItemIndex(i => i + 1);
          setShowPop(true);
          setIsAnswering(false);
        }, 200);
        if (soundEnabled) {
          speakLetter(currentItem.letter, () => speakWord(currentItem.word));
        }
      }
    } else {
      // 答错（防抖：500ms 内忽略重复错误）
      if (wrongTimerRef.current) return;
      wrongTimerRef.current = window.setTimeout(() => {
        wrongTimerRef.current = null;
      }, 500);
    }
  }, [theme, currentItem, currentItemIndex, isCelebrating, isAnswering, soundEnabled, emitSparkle]);

  // 重置 pop 动画触发标记
  useEffect(() => {
    if (showPop) {
      const timer = setTimeout(() => setShowPop(false), 600);
      return () => clearTimeout(timer);
    }
  }, [showPop]);

  const goNext = useCallback(() => {
    const currentIdx = dressThemeList.findIndex(t => t.id === themeId);
    const nextIdx = (currentIdx + 1) % dressThemeList.length;
    navigate(`/dress/${dressThemeList[nextIdx].id}`, { replace: true });
  }, [themeId, navigate]);

  if (!theme) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#888' }}>
        Theme not found
      </div>
    );
  }

  return (
    <div className="dress-game" style={{ background: theme.bgGradient }}>
      <TopBar title={`${theme.emoji} ${theme.name}`} showBack showSound />

      <div className="dress-game-area">
        {/* 兔子图片 */}
        <div className="dress-bunny-container" ref={bunnyRef}>
          <img
            src={currentImg}
            alt=""
            className={`dress-bunny-img${showPop ? ' pop' : ''}`}
          />
          {/* 星星特效 */}
          {sparkles.map(s => (
            <div
              key={s.id}
              className="dress-sparkle"
              style={{ left: s.x, top: s.y }}
            >
              &#11088;
            </div>
          ))}
        </div>

        {/* 问题面板 */}
        {!isCelebrating && (
          <div className="dress-question-panel">
            {currentItem && (
              <div className="dress-question-box">
                <div className="dress-question-top-row">
                  <div className="dress-question-letter">{currentItem.letter}</div>
                  <div className="dress-question-icon">{currentItem.emoji}</div>
                </div>
                <div className="dress-question-word">{currentItem.word}</div>
              </div>
            )}

            {/* 道具清单 */}
            <div className="dress-items-list">
              {theme.items.map((item, idx) => (
                <div
                  key={idx}
                  className={`dress-item-dot${idx < currentItemIndex ? ' done' : ''}${idx === currentItemIndex ? ' current' : ''}`}
                >
                  {item.emoji}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 虚拟键盘 */}
      {!isCelebrating && (
        <Keyboard onKeyPress={handleKeyPress} highlightLetter={currentItem?.letter} />
      )}

      {/* 庆祝弹窗 */}
      {isCelebrating && (
        <div className="dress-celebration-overlay">
          {/* 彩带 */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="dress-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * -50}%`,
                backgroundColor: ['#FF6B9D', '#FFD93D', '#6BCB77', '#4D96FF', '#FF8FAB', '#A8E6CF'][i % 6],
                animationDuration: `${2 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 0.5}s`,
                width: `${6 + Math.random() * 8}px`,
                height: `${6 + Math.random() * 8}px`,
              }}
            />
          ))}
          <div className="dress-celebration-card">
            <div className="dress-celebration-emoji">{theme.celebrationEmoji}</div>
            <div className="dress-celebration-text">{theme.celebrationText}</div>
            <div className="dress-celebration-sub">Great job!</div>
            <button className="dress-celebration-btn" onClick={goNext}>
              Next &#8594;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}