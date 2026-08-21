# MANAV × TWINKLE — LOVE CHASE 🎮❤️

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The game will open at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

---

## 🎮 Game Features

✅ **3D Endless Runner**
- Beautiful third-person camera
- Smooth character animations
- 3-lane running system
- Jump, slide, lane-switch mechanics

✅ **250 Levels**
- Progressive difficulty scaling
- Level 1: Tutorial/Easy
- Level 2+: Hard to Nightmare difficulty
- Each level becomes faster and more challenging

✅ **Chase Mechanic**
- Manav gradually catches up to Twinkle
- Distance meter showing chase progress
- Tension increases as distance decreases
- Audio/visual warnings when Manav gets close

✅ **Dare System**
- Locked dares assigned when caught
- 50+ romantic, funny, playful dares
- Text answer + file attachment support
- Persistent dare state (dares don't change on reload)
- Dare completion unlocks next level

✅ **Original Obstacles**
- Moving barriers
- Spinning obstacles
- Gaps requiring jumps
- Low & high barriers
- Side obstacles
- Combinations for increased complexity

✅ **Beautiful UI**
- Romantic gradient theme (Pink → Purple → Blue)
- Menu system (Play, Levels, Settings)
- Level selection grid (250 levels)
- HUD showing Level, Score, Speed, Distance
- Dare screen with attachment preview
- Level completion stats

✅ **Persistent Game State**
- Current level saved
- Unlocked levels tracked
- Completed levels marked with ⭐
- Pending dares restored on reload
- Best scores recorded

✅ **Mobile Friendly**
- Touch/swipe controls
- Responsive design
- Optimized for all screen sizes

---

## 🎯 How to Play

1. **Start Game** → Click PLAY
2. **Control Twinkle**:
   - ← → Arrow Keys / A/D = Move left/right
   - ↑ Arrow Key / W = Jump
   - ↓ Arrow Key / S = Slide
   - Mobile: Swipe left/right (move), swipe up (jump), swipe down (slide)
3. **Avoid Obstacles** while Manav chases from behind
4. **Survive the Level** to be caught and face a dare
5. **Complete the Dare** to unlock the next level
6. **Progress through 250 Levels** to reach the final ending

---

## 🎨 Game Design

- **Story**: Twinkle runs, Manav chases. Every time caught = romantic dare
- **Tone**: Playful, romantic, adventurous
- **Colors**: Pink (#ff1493), Purple (#ba55d3), Neon Blue (#1e90ff), Warm sunset
- **Music**: Optional background ambient music
- **Sounds**: Jump, slide, catch, level complete, dare reveal

---

## 📂 Project Structure

```
src/
├── main.js                 # Entry point
├── game/
│   ├── Game.js            # Main game loop
│   ├── Scene.js           # 3D environment
│   ├── Player.js          # Twinkle character
│   ├── Chaser.js          # Manav character
│   └── Obstacles.js       # Obstacle generation
├── ui/
│   └── UIManager.js       # Menu, HUD, Dare screen
└── systems/
    ├── Input.js           # Keyboard & touch input
    ├── Physics.js         # Collision detection
    ├── State.js           # Game state management
    └── Audio.js           # Sound effects
```

---

## 🔧 Technical Stack

- **Three.js** — 3D graphics & rendering
- **Vite** — Fast build tool & dev server
- **JavaScript (ES6+)** — Core gameplay logic
- **localStorage** — Persistent game state
- **HTML5 Canvas** — Game rendering
- **CSS3** — Responsive UI styling

---

## 🚀 Deployment

To deploy to production:

```bash
npm run build
# Upload dist/ folder to hosting service
```

**Hosting Options**:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting provider

---

## 💡 Customization

### Change Colors
Edit color values in `index.html` (CSS) and `src/game/Scene.js`

### Add More Dares
Edit `src/assets/dares.js` — add strings to the `DARE_POOL` array

### Adjust Difficulty
Edit `src/game/Obstacles.js` — modify `difficultyMultiplier` and obstacle spacing

### Change Characters
Edit `src/game/Player.js` and `src/game/Chaser.js` — modify mesh creation

---

## 🎯 Level 250 - The Grand Finale

When you reach Level 250 and get caught:
- Cinematic slow-motion effect
- Special final dare
- Celebration screen
- Option to replay from Level 1

---

## 📝 License

This game is a custom romantic experience created for **Manav & Twinkle** ❤️

---

## 🤝 Support

For issues or suggestions, check the GitHub issues or contact the developers.

**Ready to play? Run `npm install && npm run dev` and start the chase!** 🏃‍♀️💨
