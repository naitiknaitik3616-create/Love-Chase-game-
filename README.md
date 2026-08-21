# MANAV × TWINKLE — LOVE CHASE 💕

A polished, playable **3D browser-based endless runner game** featuring Twinkle on the run and Manav in hot pursuit.

## 🎮 Gameplay

- **250 Levels** of progressive difficulty
- **3-lane running system** with jump, slide, and lane switching
- **Dynamic chase mechanic** — Manav gradually catches up
- **Dare system** — Every time caught, answer a romantic dare
- **Persistent progression** — Your progress is saved locally

## ⚙️ Technical Stack

- **Three.js** — 3D rendering
- **Vite** — Build tool & dev server
- **localStorage** — Persistent game state

## 🚀 Quick Start

### Installation

```bash
npm install
npm run dev
```

The game will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
├── index.html              # Main HTML entry
├── src/
│   ├── main.js            # Game initialization
│   ├── game/
│   │   ├── Game.js        # Main game loop
│   │   ├── Scene.js       # 3D scene setup
│   │   ├── Player.js      # Twinkle character
│   │   ├── Chaser.js      # Manav character
│   │   ├── Obstacles.js   # Obstacle generation
│   │   └── Camera.js      # Camera controller
│   ├── ui/
│   │   ├── Menu.js        # Main menu
│   │   ├── HUD.js         # In-game UI
│   │   ├── DareScreen.js  # Dare display & submission
│   │   └── LevelSelect.js # Level selection
│   ├── systems/
│   │   ├── Input.js       # Keyboard & touch controls
│   │   ├── Physics.js     # Collision detection
│   │   ├── Audio.js       # Sound effects & music
│   │   └── State.js       # Game state & persistence
│   └── assets/
│       ├── dares.js       # Dare pool
│       └── sounds/        # Audio files
├── package.json
└── vite.config.js
```

## 🎯 Features

✅ 3D third-person endless runner  
✅ Progressive difficulty (250 levels)  
✅ Dynamic speed increases  
✅ Dare system with locked challenges  
✅ File attachment support (images, videos, audio)  
✅ Persistent game state  
✅ Mobile-friendly controls  
✅ Beautiful romantic UI theme  
✅ Cinematic final level  

## 🎨 Game Theme

- **Colors**: Pink, Purple, Neon Blue, Sunset Orange
- **Aesthetic**: Romantic + Adventurous + Playful
- **Particles**: Heart effects, glow, smooth transitions

## 📝 License

Custom game created for Manav & Twinkle ❤️

---

**Ready to play? Start with `npm install` and `npm run dev`!**
