import React from 'react';
import { ClothingItem, DressTheme } from '../data/dressThemes';
import './DressCharacter.css';

interface DressCharacterProps {
  theme: DressTheme;
  wornItems: ClothingItem[];
  isHappy?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const DressCharacter: React.FC<DressCharacterProps> = ({
  theme,
  wornItems,
  isHappy = false,
  size = 'large',
}) => {
  // 按 zIndex 排序，确保正确的图层顺序
  const sortedItems = [...wornItems].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div className={`dress-character dress-character--${size}`}>
      {/* 小人基础身体 */}
      <div className="character-body">
        <span className="character-emoji">{theme.startEmoji}</span>
      </div>

      {/* 已穿的衣服 */}
      {sortedItems.map((item) => (
        <div
          key={item.id}
          className={`clothing-item clothing-item--${item.position} clothing-item--appear`}
          style={{ zIndex: item.zIndex }}
        >
          <span className="clothing-emoji">{item.emoji}</span>
        </div>
      ))}

      {/* 开心时的弹跳效果 */}
      {isHappy && <div className="character-happy-effect" />}
    </div>
  );
};

export default DressCharacter;
