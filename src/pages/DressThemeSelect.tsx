import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { dressThemeList } from '../data/dressThemes';
import TopBar from '../components/TopBar';
import './DressThemeSelect.css';

export default function DressThemeSelect() {
  const navigate = useNavigate();
  const [selectedIdx, setSelectedIdx] = useState(0);

  const startGame = useCallback((themeId: string) => {
    navigate(`/dress/${themeId}`);
  }, [navigate]);

  // 键盘导航：方向键选择，Enter 确认
  useEffect(() => {
    const cols = 3;
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          setSelectedIdx(i => Math.min(i + 1, dressThemeList.length - 1));
          break;
        case 'ArrowLeft':
          setSelectedIdx(i => Math.max(i - 1, 0));
          break;
        case 'ArrowDown':
          setSelectedIdx(i => Math.min(i + cols, dressThemeList.length - 1));
          break;
        case 'ArrowUp':
          setSelectedIdx(i => Math.max(i - cols, 0));
          break;
        case 'Enter':
          e.preventDefault();
          startGame(dressThemeList[selectedIdx].id);
          break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedIdx, startGame]);

  return (
    <div className="dress-theme-select">
      <TopBar title="穿衣服乐园" showBack showSound />
      <div className="dress-theme-grid">
        {dressThemeList.map((theme, idx) => (
          <div
            key={theme.id}
            className={`dress-theme-card ${idx === selectedIdx ? 'selected' : ''}`}
            onClick={() => setSelectedIdx(idx)}
            onDoubleClick={() => startGame(theme.id)}
          >
            <div className="dress-theme-emoji">{theme.emoji}</div>
            <div className="dress-theme-name">{theme.name}</div>
            <div className="dress-theme-en">{theme.nameEn}</div>
          </div>
        ))}
      </div>
      <div className="dress-theme-hint">
        <kbd>←</kbd> <kbd>→</kbd> <kbd>↑</kbd> <kbd>↓</kbd> 选择 · <kbd>Enter</kbd> 开始
      </div>
    </div>
  );
}