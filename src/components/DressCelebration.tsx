import React from 'react';
import { CelebrationType } from '../data/dressThemes';
import './DressCelebration.css';

interface DressCelebrationProps {
  type: CelebrationType;
}

const DressCelebration: React.FC<DressCelebrationProps> = ({ type }) => {
  return (
    <div className="dress-celebration">
      {/* 彩带效果 */}
      <div className="confetti-container">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`confetti confetti--${i % 5}`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* 主题动画 */}
      <div className={`celebration-scene celebration--${type}`}>
        {type === 'swim' && (
          <div className="swim-scene">
            <div className="pool-water">
              <div className="wave wave-1">🌊</div>
              <div className="wave wave-2">🌊</div>
              <div className="wave wave-3">🌊</div>
            </div>
            <div className="swimmer">
              <span className="swimmer-emoji">🏊</span>
            </div>
            <div className="bubbles">
              <span className="bubble">💧</span>
              <span className="bubble">💧</span>
              <span className="bubble">💧</span>
            </div>
          </div>
        )}

        {type === 'ski' && (
          <div className="ski-scene">
            <div className="snowflakes">
              {[...Array(10)].map((_, i) => (
                <span
                  key={i}
                  className="snowflake"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                >
                  ❄️
                </span>
              ))}
            </div>
            <div className="skier">
              <span className="skier-emoji">⛷️</span>
            </div>
            <div className="snow-mountain">🏔️</div>
          </div>
        )}

        {type === 'puddle' && (
          <div className="puddle-scene">
            <div className="rain-drops">
              {[...Array(15)].map((_, i) => (
                <span
                  key={i}
                  className="raindrop"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                >
                  💧
                </span>
              ))}
            </div>
            <div className="puddle-kid">
              <span className="puddle-emoji">🚶</span>
            </div>
            <div className="puddles">
              <span className="puddle">💦</span>
              <span className="puddle">💦</span>
              <span className="puddle">💦</span>
            </div>
          </div>
        )}

        {type === 'sand' && (
          <div className="sand-scene">
            <div className="sun">☀️</div>
            <div className="sand-pile">🏖️</div>
            <div className="sand-kid">
              <span className="sand-emoji">🧒</span>
            </div>
            <div className="sand-toys">
              <span className="toy">🪣</span>
              <span className="toy">🏖️</span>
            </div>
          </div>
        )}
      </div>

      {/* 星星效果 */}
      <div className="stars-container">
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="star"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 1.5}s`,
            }}
          >
            ⭐
          </span>
        ))}
      </div>
    </div>
  );
};

export default DressCelebration;
