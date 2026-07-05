# 🐰 Bunny ABC

A fun English learning app for toddlers (2-3 years old) featuring a cute bunny companion. Kids learn letters and simple words through playful keyboard interaction.

## Features

- 🍎 **6 themed scenes** - Fruit Garden, Zoo, Rainbow House, Toy Room, Kitchen, Night Garden
- 🔍 **Explore Mode** - Free play: press any letter to see pictures and hear pronunciation
- 🎯 **Listen Mode** - Listening challenge: hear the letter and find it on the keyboard
- 🐰 **Cute bunny companion** - Different moods and reactions
- 🔊 **English speech** - Web Speech API for clear English pronunciation
- 📱 **Responsive** - Works on desktop, tablet, and mobile
- 😴 **10-minute rest reminder** - Gentle screen time management

## Tech Stack

- React 18 + TypeScript
- Vite
- React Router (HashRouter for GitHub Pages compatibility)
- Web Speech API
- Pure CSS animations

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This project is configured for **GitHub Pages** deployment via GitHub Actions.

### Setup

1. Create a new GitHub repository
2. Push this code to the `main` branch
3. Go to repository Settings → Pages
4. Under "Build and deployment", select "GitHub Actions" as the source
5. Push to `main` to trigger automatic build and deployment

The app will be available at `https://<your-username>.github.io/<repo-name>/`

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Bunny.tsx     # Bunny character with animations
│   ├── Keyboard.tsx  # Virtual keyboard + physical key handling
│   ├── WordBubble.tsx # Letter + word + image display
│   ├── SceneCard.tsx # Scene selection card
│   └── TopBar.tsx    # Top navigation bar
├── pages/            # Page components
│   ├── Home.tsx          # Welcome screen
│   ├── SceneSelect.tsx   # Scene selection
│   ├── ModeSelect.tsx    # Game mode selection
│   ├── ExploreMode.tsx   # Free exploration mode
│   └── ListenMode.tsx    # Listening challenge mode
├── data/             # Data and types
│   ├── types.ts      # TypeScript interfaces
│   ├── words.ts      # Word library (35+ words, 26 letters)
│   ├── scenes.ts     # Scene configurations
│   └── bunnyLines.ts # Bunny voice lines
├── utils/            # Utility functions
│   ├── speech.ts         # Web Speech API wrapper
│   ├── useTimer.ts       # Game timer hook
│   └── SoundContext.tsx  # Sound toggle context
├── styles/
│   └── global.css    # Global styles and theme variables
├── App.tsx           # Root component with routes
└── main.tsx          # Entry point
```

## Design Principles

- **No pressure, no punishment** - No scores, no failures, just gentle encouragement
- **Instant feedback** - Every key press has visual + audio feedback
- **Big and simple** - Large buttons, simple interactions for little fingers
- **Short sessions** - 5-10 minutes per session with rest reminder

## License

MIT
