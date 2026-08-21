export class StateManager {
  constructor() {
    this.currentLevel = 1;
    this.unlockedLevels = [1];
    this.completedLevels = [];
    this.pendingDare = null;
    this.dareAnswers = {};
    this.levelScores = {};
    this.soundEnabled = true;
  }

  async load() {
    const saved = localStorage.getItem('loveChaseSave');
    if (saved) {
      const data = JSON.parse(saved);
      this.currentLevel = data.currentLevel || 1;
      this.unlockedLevels = data.unlockedLevels || [1];
      this.completedLevels = data.completedLevels || [];
      this.pendingDare = data.pendingDare || null;
      this.dareAnswers = data.dareAnswers || {};
      this.levelScores = data.levelScores || {};
      this.soundEnabled = data.soundEnabled !== false;
    }
  }

  save() {
    const data = {
      currentLevel: this.currentLevel,
      unlockedLevels: this.unlockedLevels,
      completedLevels: this.completedLevels,
      pendingDare: this.pendingDare,
      dareAnswers: this.dareAnswers,
      levelScores: this.levelScores,
      soundEnabled: this.soundEnabled
    };
    localStorage.setItem('loveChaseSave', JSON.stringify(data));
  }

  unlockLevel(levelNum) {
    if (!this.unlockedLevels.includes(levelNum)) {
      this.unlockedLevels.push(levelNum);
      this.save();
    }
  }

  completeLevel(levelNum, score) {
    if (!this.completedLevels.includes(levelNum)) {
      this.completedLevels.push(levelNum);
    }
    this.levelScores[levelNum] = Math.max(this.levelScores[levelNum] || 0, score);
    this.currentLevel = levelNum;
    this.unlockLevel(levelNum + 1);
    this.save();
  }

  setPendingDare(dare) {
    this.pendingDare = dare;
    this.save();
  }

  submitDareAnswer(answer, fileData) {
    if (this.pendingDare) {
      this.dareAnswers[this.pendingDare.id] = {
        text: answer,
        file: fileData,
        submittedAt: Date.now()
      };
      this.pendingDare = null;
      this.save();
    }
  }
}
