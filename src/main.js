import { Game } from './game/Game.js';
import { UIManager } from './ui/UIManager.js';
import { InputManager } from './systems/Input.js';
import { StateManager } from './systems/State.js';

let game;
let uiManager;
let inputManager;
let stateManager;

async function init() {
  // Initialize state manager
  stateManager = new StateManager();
  await stateManager.load();

  // Initialize input manager
  inputManager = new InputManager();
  inputManager.init();

  // Initialize game
  const canvas = document.getElementById('canvas');
  game = new Game(canvas, stateManager, inputManager);
  game.init();

  // Initialize UI manager
  uiManager = new UIManager(game, stateManager, inputManager);
  uiManager.init();

  // Start game loop
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  game.update();
  game.render();
}

// Start the game
init().catch(console.error);
