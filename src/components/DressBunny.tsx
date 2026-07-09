import React from 'react';
import './DressBunny.css';

interface DressBunnyProps {
  size?: number;
  mood?: 'idle' | 'happy' | 'thinking' | 'sleepy';
  className?: string;
}

/**
 * 基础 SVG 兔子角色（只穿内衣/尿布）
 * 大头小身体卡通比例，所有衣物都穿在这个角色上
 */
const DressBunny: React.FC<DressBunnyProps> = ({
  size = 200,
  mood = 'idle',
  className = '',
}) => {
  return (
    <div className={`dress-bunny dress-bunny--${mood} ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        {/* 腿 + 脚（皮肤色） */}
        <g className="bunny-legs">
          {/* 左腿 */}
          <ellipse cx="78" cy="185" rx="10" ry="25" fill="#FFE4C4" />
          <ellipse cx="78" cy="208" rx="12" ry="7" fill="#FFE4C4" />
          {/* 右腿 */}
          <ellipse cx="122" cy="185" rx="10" ry="25" fill="#FFE4C4" />
          <ellipse cx="122" cy="208" rx="12" ry="7" fill="#FFE4C4" />
        </g>

        {/* 身体（皮肤色） */}
        <g className="bunny-body">
          <ellipse cx="100" cy="150" rx="30" ry="40" fill="#FFE4C4" />
        </g>

        {/* 内衣/尿布（基础穿着） */}
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
          {/* 尿布花纹 */}
          <circle cx="85" cy="165" r="2" fill="#FFE4C4" opacity="0.5" />
          <circle cx="115" cy="170" r="2" fill="#FFE4C4" opacity="0.5" />
          <circle cx="100" cy="158" r="1.5" fill="#FFE4C4" opacity="0.4" />
        </g>

        {/* 手臂（皮肤色） */}
        <g className="bunny-arms">
          {/* 左手臂 */}
          <ellipse cx="70" cy="140" rx="8" ry="22" fill="#FFE4C4" transform="rotate(-15 70 140)" />
          <circle cx="62" cy="160" r="8" fill="#FFE4C4" />
          {/* 右手臂 */}
          <ellipse cx="130" cy="140" rx="8" ry="22" fill="#FFE4C4" transform="rotate(15 130 140)" />
          <circle cx="138" cy="160" r="8" fill="#FFE4C4" />
        </g>

        {/* 脖子 */}
        <ellipse cx="100" cy="108" rx="14" ry="9" fill="#FFE4C4" />

        {/* 头（大大的圆头） */}
        <g className="bunny-head">
          <circle cx="100" cy="75" r="42" fill="#FFFAF5" />
        </g>

        {/* 耳朵（长长竖起来） */}
        <g className="bunny-ears">
          {/* 左耳 */}
          <ellipse cx="80" cy="28" rx="9" ry="32" fill="#FFFAF5" />
          <ellipse cx="80" cy="28" rx="4.5" ry="24" fill="#FFC8D8" />
          {/* 右耳 */}
          <ellipse cx="120" cy="28" rx="9" ry="32" fill="#FFFAF5" />
          <ellipse cx="120" cy="28" rx="4.5" ry="24" fill="#FFC8D8" />
        </g>

        {/* 脸（五官） */}
        <g className="bunny-face">
          {/* 腮红 */}
          <ellipse cx="75" cy="85" rx="8" ry="5" fill="#FFB6C1" opacity="0.5" />
          <ellipse cx="125" cy="85" rx="8" ry="5" fill="#FFB6C1" opacity="0.5" />

          {/* 眼睛 - 会根据 mood 变化 */}
          {mood === 'sleepy' ? (
            <>
              {/* 闭眼 - 困了 */}
              <path d="M85 75 Q90 78 95 75" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M105 75 Q110 78 115 75" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
            </>
          ) : mood === 'happy' ? (
            <>
              {/* 弯月眼 - 开心 */}
              <path d="M83 74 Q90 68 97 74" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M103 74 Q110 68 117 74" stroke="#2D2D2D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* 正常圆眼睛 */}
              <circle cx="90" cy="75" r="4" fill="#2D2D2D" />
              <circle cx="110" cy="75" r="4" fill="#2D2D2D" />
              {/* 眼睛高光 */}
              <circle cx="91.5" cy="73.5" r="1.5" fill="#fff" />
              <circle cx="111.5" cy="73.5" r="1.5" fill="#fff" />
            </>
          )}

          {/* 鼻子 */}
          <ellipse cx="100" cy="88" rx="4" ry="2.5" fill="#FF9999" />

          {/* 嘴巴 */}
          {mood === 'happy' ? (
            <path d="M90 96 Q100 106 110 96" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
          ) : mood === 'sleepy' ? (
            <ellipse cx="100" cy="97" rx="3" ry="2" fill="#2D2D2D" opacity="0.6" />
          ) : (
            <path d="M93 96 Q100 100 107 96" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          )}
        </g>
      </svg>
    </div>
  );
};

export default DressBunny;
