export class InputManager {
  constructor() {
    this.keys = {};
    this.touchInput = { dx: 0, dy: 0 };
    this.touchStartX = 0;
    this.touchStartY = 0;
  }

  init() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
      this.keys[e.code.toLowerCase()] = true;
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
      this.keys[e.code.toLowerCase()] = false;
    });

    window.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    });

    window.addEventListener('touchmove', (e) => {
      const dx = e.touches[0].clientX - this.touchStartX;
      const dy = e.touches[0].clientY - this.touchStartY;
      this.touchInput.dx = dx;
      this.touchInput.dy = dy;
    });

    window.addEventListener('touchend', () => {
      this.touchInput = { dx: 0, dy: 0 };
    });
  }

  isKeyPressed(key) {
    return this.keys[key.toLowerCase()] || false;
  }
}
