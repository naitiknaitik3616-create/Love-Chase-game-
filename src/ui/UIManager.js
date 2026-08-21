import { DareManager } from '../assets/dares.js';

export class UIManager {
  constructor(game, stateManager, inputManager) {
    this.game = game;
    this.stateManager = stateManager;
    this.inputManager = inputManager;
    this.dareManager = new DareManager();
    this.currentScreen = 'menu';
  }

  init() {
    this.setupMenuListeners();
    this.setupDareScreenListeners();
    this.setupLevelSelectListeners();
    this.showScreen('menu');
  }

  setupMenuListeners() {
    document.getElementById('playBtn').addEventListener('click', () => {
      if (this.stateManager.pendingDare) {
        this.showDareScreen();
      } else {
        this.startLevel(this.stateManager.currentLevel);
      }
    });

    document.getElementById('levelsBtn').addEventListener('click', () => {
      this.showLevelSelect();
    });

    document.getElementById('settingsBtn').addEventListener('click', () => {
      this.toggleAudio();
    });
  }

  setupDareScreenListeners() {
    document.getElementById('dareFile').addEventListener('change', (e) => {
      this.handleFileUpload(e);
    });

    document.getElementById('submitDareBtn').addEventListener('click', () => {
      this.submitDare();
    });
  }

  setupLevelSelectListeners() {
    document.getElementById('backFromLevelBtn').addEventListener('click', () => {
      this.showScreen('menu');
    });
  }

  showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
    this.currentScreen = screenName;
    const screen = document.getElementById(screenName + 'Screen');
    if (screen) {
      screen.classList.add('active');
    }
  }

  startLevel(levelNum) {
    this.stateManager.currentLevel = levelNum;
    this.game.currentLevel = levelNum;
    this.game.init();
    this.game.startLevel();
    this.showScreen(null); // Hide UI during gameplay
    this.updateHUD();
  }

  showLevelSelect() {
    this.showScreen('levelSelect');
    this.renderLevelGrid();
  }

  renderLevelGrid() {
    const grid = document.getElementById('levelGrid');
    grid.innerHTML = '';

    for (let i = 1; i <= 250; i++) {
      const btn = document.createElement('button');
      btn.className = 'level-btn';
      btn.textContent = i;

      if (!this.stateManager.unlockedLevels.includes(i)) {
        btn.classList.add('locked');
        btn.disabled = true;
        btn.innerHTML = '🔒';
      } else if (this.stateManager.completedLevels.includes(i)) {
        btn.classList.add('completed');
        btn.innerHTML = '⭐';
      }

      btn.addEventListener('click', () => {
        if (this.stateManager.unlockedLevels.includes(i)) {
          this.startLevel(i);
        }
      });

      grid.appendChild(btn);
    }
  }

  showDareScreen() {
    if (!this.stateManager.pendingDare) {
      this.stateManager.pendingDare = this.dareManager.generateDare(Date.now());
      this.stateManager.save();
    }

    document.getElementById('dareText').textContent = this.stateManager.pendingDare.text;
    document.getElementById('dareAnswer').value = '';
    document.getElementById('filePreview').innerHTML = '';
    document.getElementById('filePreview').style.display = 'none';
    this.showScreen('dare');
  }

  handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const preview = document.getElementById('filePreview');
      preview.style.display = 'block';

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          preview.innerHTML = `<p>📷 ${file.name}</p><img src="${e.target.result}" />`;
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith('video/')) {
        preview.innerHTML = `<p>🎥 ${file.name}</p><video controls style="max-width:100%; max-height:150px;"><source src="${URL.createObjectURL(file)}" type="${file.type}"></video>`;
      } else if (file.type.startsWith('audio/')) {
        preview.innerHTML = `<p>🎵 ${file.name}</p><audio controls style="width:100%;"><source src="${URL.createObjectURL(file)}" type="${file.type}"></audio>`;
      } else {
        preview.innerHTML = `<p>📎 ${file.name}</p>`;
      }
    }
  }

  submitDare() {
    const answer = document.getElementById('dareAnswer').value.trim();
    const fileInput = document.getElementById('dareFile');
    const file = fileInput.files[0];

    if (!answer && !file) {
      alert('Please provide an answer or attach a file!');
      return;
    }

    const fileData = file ? { name: file.name, type: file.type } : null;
    this.stateManager.submitDareAnswer(answer, fileData);
    this.stateManager.save();

    // Show completion message
    document.querySelector('.dare-container').innerHTML = `
      <h2 class="dare-title">DARE COMPLETE ❤️</h2>
      <p style="font-size: 1.2rem; color: #555; margin-bottom: 30px;">
        Amazing! Your answer has been saved for Manav.
      </p>
      <button class="btn-primary submit-dare-btn" onclick="location.reload()" style="width: 100%;">
        CONTINUE TO LEVEL
      </button>
    `;

    setTimeout(() => {
      this.stateManager.currentLevel++;
      this.stateManager.save();
      this.startLevel(this.stateManager.currentLevel);
    }, 2000);
  }

  updateHUD() {
    document.getElementById('hudLevel').textContent = this.game.currentLevel;
    document.getElementById('hudScore').textContent = this.game.score;
    document.getElementById('hudSpeed').textContent = this.game.speed.toFixed(2) + 'x';

    const distancePercent = Math.max(0, Math.min(100, (this.game.distance / 100) * 100));
    document.getElementById('distanceBar').style.width = distancePercent + '%';
    document.getElementById('distanceValue').textContent = Math.max(0, this.game.distance).toFixed(0) + 'm';

    if (this.game.distance < 20) {
      document.getElementById('catchWarning').style.display = 'inline';
    } else {
      document.getElementById('catchWarning').style.display = 'none';
    }
  }

  toggleAudio() {
    this.stateManager.soundEnabled = !this.stateManager.soundEnabled;
    this.stateManager.save();
    alert('Sound: ' + (this.stateManager.soundEnabled ? 'ON' : 'OFF'));
  }
}
