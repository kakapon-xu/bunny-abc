import React from 'react';
import { CelebrationType, DressTheme } from '../data/dressThemes';
import DressCharacter from './DressCharacter';
import './DressCelebration.css';

interface DressCelebrationProps {
  type: CelebrationType;
  theme: DressTheme;
  allWornItems: any[];
}

const DressCelebration: React.FC<DressCelebrationProps> = ({ type, theme, allWornItems }) => {
  return (
    <div className="dress-celebration-v2">
      {/* 彩带效果 */}
      <div className="confetti-container">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className={`confetti confetti--${i % 6}`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* 星星效果 */}
      <div className="stars-container">
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="star"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 1.5}s`,
            }}
          >
            ⭐
          </span>
        ))}
      </div>

      {/* 主题庆祝场景 - 同一个穿好衣服的兔子去活动 */}
      <div className={`celebration-scene-v2 celebration--${type}`}>
        {/* 活动场景背景 */}
        <div className="celebration-bg">
          {type === 'ski' && (
            <div className="ski-bg">
              <div className="mountain">🏔️</div>
              <div className="snow-slope" />
            </div>
          )}
          {type === 'swim' && (
            <div className="swim-bg">
              <div className="pool-celebration" />
              <div className="sun-cele">☀️</div>
            </div>
          )}
          {type === 'puddle' && (
            <div className="puddle-bg">
              <div className="rain-cele">
                {[...Array(20)].map((_, i) => (
                  <span
                    key={i}
                    className="raindrop-cele"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 1.5}s`,
                    }}
                  >
                    💧
                  </span>
                ))}
              </div>
              <div className="puddles">
                <span className="puddle">💦</span>
                <span className="puddle puddle-2">💦</span>
                <span className="puddle puddle-3">💦</span>
              </div>
            </div>
          )}
          {type === 'sand' && (
            <div className="sand-bg">
              <div className="sun-cele">☀️</div>
              <div className="sand-pile">🏖️</div>
              <div className="sand-toys">
                <span>🪣</span>
                <span>🌴</span>
              </div>
            </div>
          )}
        </div>

        {/* 穿好衣服的兔子在活动中 - 滑雪/游泳/踩水/玩沙 */}
        <div className={`celebration-bunny celebration-bunny--${type}`}>
          <DressCharacter
            theme={theme}
            wornItems={allWornItems}
            isHappy={true}
            size="large"
            celebrating={true}
          />
        </div>

        {/* 活动文字 */}
        <div className="celebration-text">
          {type === 'ski' && '⛷️ 出发滑雪啦！'}
          {type === 'swim' && '🏊 扑通！下水游泳！'}
          {type === 'puddle' && '💦 踩水去咯！'}
          {type === 'sand' && '🏖️ 沙滩玩沙啦！'}
        </div>
      </div>
    </div>
  );
};

export default DressCelebration;
