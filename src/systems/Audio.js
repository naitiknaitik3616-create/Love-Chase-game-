export class AudioManager {
  constructor() {
    this.sounds = {};
    this.enabled = true;
  }

  init() {
    // Initialize sounds (would load actual audio files in production)
    this.sounds = {
      jump: null,
      slide: null,
      catch: null,
      levelComplete: null,
      dareReveal: null,
      ambient: null
    };
  }

  play(soundName) {
    if (this.enabled && this.sounds[soundName]) {
      // Play sound (implementation depends on audio library)
    }
  }

  setEnabled(enabled) {
    this.enabled = enabled;
  }
}
