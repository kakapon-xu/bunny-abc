import React, { useState, useEffect } from 'react';
import { ClothingItem, DressTheme } from '../data/dressThemes';
import { clothingComponents } from './BunnyClothing';
import './DressCharacter.css';

interface DressCharacterProps {
  theme: DressTheme;
  wornItems: ClothingItem[];
  isHappy?: boolean;
  size?: 'small' | 'medium' | 'large';
  celebrating?: boolean;
}

const sizeMap = {
  small: 160,
  medium: 300,
  large: 450,
};

const DressCharacter: React.FC<DressCharacterProps> = ({
  theme,
  wornItems,
  isHappy = false,
  size = 'large',
  celebrating = false,
}) => {
  const bunnySize = sizeMap[size];
  // 追踪刚出现的衣物，用于飞入动画
  const [justAppeared, setJustAppeared] = useState<string | null>(null);

  useEffect(() => {
    if (wornItems.length > 0) {
      const lastItem = wornItems[wornItems.length - 1];
      setJustAppeared(lastItem.id);
      const timer = setTimeout(() => setJustAppeared(null), 600);
      return () => clearTimeout(timer);
    }
  }, [wornItems.length]);

  // 按 zIndex 排序衣物，并分为身体层和头部层
  const sortedItems = [...wornItems].sort((a, b) => a.zIndex - b.zIndex);
  const bodyLayerItems = sortedItems.filter(item => item.zIndex < 9);
  const headLayerItems = sortedItems.filter(item => item.zIndex >= 9);

  const bunnyMood = celebrating ? 'happy' : isHappy ? 'happy' : 'idle';

  return (
    <div
      className={`dress-character-v2 dress-character--${size} ${celebrating ? 'dress-character--celebrating' : ''}`}
      style={{ width: bunnySize, height: bunnySize * 1.25 }}
    >
      {/* 场景背景装饰 */}
      <div className={`scene-decoration scene-decoration--${theme.sceneDecor}`}>
        {theme.sceneDecor === 'snow' && (
          <div className="snowflakes">
            {[...Array(12)].map((_, i) => (
              <span
                key={i}
                className="snowflake"
                style={{
                  left: `${5 + Math.random() * 90}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${3 + Math.random() * 3}s`,
                }}
              >
                ❄
              </span>
            ))}
          </div>
        )}
        {theme.sceneDecor === 'rain' && (
          <div className="raindrops">
            {[...Array(15)].map((_, i) => (
              <span
                key={i}
                className="raindrop"
                style={{
                  left: `${5 + Math.random() * 90}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 1}s`,
                }}
              >
                💧
              </span>
            ))}
          </div>
        )}
        {theme.sceneDecor === 'sun' && (
          <div className="sun-decor">
            <span className="sun-icon">☀️</span>
          </div>
        )}
        {theme.sceneDecor === 'pool' && (
          <div className="pool-decor">
            <div className="pool-water" />
          </div>
        )}
      </div>

      {/* 兔子 + 衣物 SVG */}
      <div className={`dress-bunny dress-bunny--${bunnyMood} ${celebrating ? 'dress-bunny--celebrate' : ''}`}>
        <svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          {/* 腿 + 脚（皮肤色） */}
          <g className="bunny-legs">
            <ellipse cx="78" cy="185" rx="10" ry="25" fill="#FFE4C4" />
            <ellipse cx="78" cy="208" rx="12" ry="7" fill="#FFE4C4" />
            <ellipse cx="122" cy="185" rx="10" ry="25" fill="#FFE4C4" />
            <ellipse cx="122" cy="208" rx="12" ry="7" fill="#FFE4C4" />
          </g>

          {/* 身体（皮肤色） */}
          <g className="bunny-body">
            <ellipse cx="100" cy="150" rx="30" ry="40" fill="#FFE4C4" />
          </g>

          {/* 内衣/尿布 */}
          <g className="bunny-underwear">
            <path
              d="M75 145
                 Q72 150 72 165
                 Q72 178 80 182
                 Q90 185 100 183
                 Q110 185 120 182
                 Q128 178 128 165
                 Q128 150 125 145
                 Q115 138 100 138
                 Q85 138 75 145 Z"
              fill="#FFFFFF"
              stroke="#E0E0E0"
              strokeWidth="1.5"
            />
            <circle cx="85" cy="165" r="2" fill="#FFE4C4" opacity="0.5" />
            <circle cx="115" cy="170" r="2" fill="#FFE4C4" opacity="0.5" />
            <circle cx="100" cy="158" r="1.5" fill="#FFE4C4" opacity="0.4" />
          </g>

          {/* 手臂（皮肤色） */}
          <g className="bunny-arms">
            <ellipse cx="65" cy="142" rx="7" ry="24" fill="#FFE4C4" transform="rotate(-12 65 142)" />
            <circle cx="54" cy="163" r="8" fill="#FFE4C4" />
            <ellipse cx="135" cy="142" rx="7" ry="24" fill="#FFE4C4" transform="rotate(12 135 142)" />
            <circle cx="146" cy="163" r="8" fill="#FFE4C4" />
          </g>

          {/* 已穿的衣物 - 身体层（zIndex < 9，在头部下方） */}
          {bodyLayerItems.map((item) => {
            const ClothingComponent = clothingComponents[item.id];
            if (!ClothingComponent) return null;
            const isNew = justAppeared === item.id;
            return (
              <g
                key={item.id}
                className={`clothing-layer ${isNew ? `clothing-fly-in clothing-fly-in--${item.flyFrom}` : ''}`}
              >
                <ClothingComponent />
              </g>
            );
          })}

          {/* 脖子 */}
          <ellipse cx="100" cy="108" rx="14" ry="9" fill="#FFE4C4" />

          {/* 头 */}
          <g className="bunny-head">
            <circle cx="100" cy="75" r="42" fill="#FFFAF5" />
          </g>

          {/* 耳朵 */}
          <g className="bunny-ears">
            <ellipse cx="80" cy="28" rx="9" ry="32" fill="#FFFAF5" />
            <ellipse cx="80" cy="28" rx="4.5" ry="24" fill="#FFC8D8" />
            <ellipse cx="120" cy="28" rx="9" ry="32" fill="#FFFAF5" />
            <ellipse cx="120" cy="28" rx="4.5" ry="24" fill="#FFC8D8" />
          </g>

          {/* 脸（五官） */}
          <g className="bunny-face">
            <ellipse cx="75" cy="85" rx="8" ry="5" fill="#FFB6C1" opacity="0.5" />
            <ellipse cx="125" cy="85" rx="8" ry="5" fill="#FFB6C1" opacity="0.5" />

            {bunnyMood === 'happy' ? (
              <>
                <path d="M83 74 Q90 68 97 74" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M103 74 Q110 68 117 74" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="90" cy="75" r="4" fill="#2D2D2D" />
                <circle cx="110" cy="75" r="4" fill="#2D2D2D" />
                <circle cx="91.5" cy="73.5" r="1.5" fill="#fff" />
                <circle cx="111.5" cy="73.5" r="1.5" fill="#fff" />
              </>
            )}

            <ellipse cx="100" cy="88" rx="4" ry="2.5" fill="#FF9999" />

            {bunnyMood === 'happy' ? (
              <path d="M90 96 Q100 106 110 96" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
            ) : (
              <path d="M93 96 Q100 100 107 96" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            )}
          </g>

          {/* 已穿的衣物 - 头部/最前层（zIndex >= 9，在脸和头部上方） */}
          {headLayerItems.map((item) => {
            const ClothingComponent = clothingComponents[item.id];
            if (!ClothingComponent) return null;
            const isNew = justAppeared === item.id;
            return (
              <g
                key={item.id}
                className={`clothing-layer ${isNew ? `clothing-fly-in clothing-fly-in--${item.flyFrom}` : ''}`}
              >
                <ClothingComponent />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default DressCharacter;
