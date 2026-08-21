import * as THREE from 'three';
import { Scene } from './Scene.js';
import { Player } from './Player.js';
import { Chaser } from './Chaser.js';
import { ObstacleManager } from './Obstacles.js';
import { Physics } from '../systems/Physics.js';

export class Game {
  constructor(canvas, stateManager, inputManager) {
    this.canvas = canvas;
    this.stateManager = stateManager;
    this.inputManager = inputManager;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a2e);
    this.scene.fog = new THREE.Fog(0x1a1a2e, 200, 500);

    // Lights
    this.setupLights();

    // Game objects
    this.player = null;
    this.chaser = null;
    this.obstacleManager = null;
    this.camera = null;
    this.physics = new Physics();

    // Game state
    this.currentLevel = stateManager.currentLevel;
    this.gameRunning = false;
    this.gameOver = false;
    this.levelComplete = false;
    this.speed = 1;
    this.distance = 100;
    this.score = 0;
    this.timeElapsed = 0;
    this.levelStartTime = 0;

    // Particles
    this.particles = [];

    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize());
  }

  setupLights() {
    // Directional light
    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(100, 100, 100);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.left = -150;
    sunLight.shadow.camera.right = 150;
    sunLight.shadow.camera.top = 150;
    sunLight.shadow.camera.bottom = -150;
    sunLight.shadow.camera.near = 0.1;
    sunLight.shadow.camera.far = 500;
    this.scene.add(sunLight);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    // Hemisphere light for better shading
    const hemiLight = new THREE.HemisphereLight(0xff00ff, 0x00ffff, 0.4);
    this.scene.add(hemiLight);
  }

  init() {
    // Create scene objects
    new Scene(this.scene);

    // Create player
    this.player = new Player(this.scene);
    this.player.position.set(0, 0, 0);

    // Create chaser
    this.chaser = new Chaser(this.scene);
    this.chaser.position.set(0, 0, -50);

    // Create obstacle manager
    this.obstacleManager = new ObstacleManager(this.scene, this.currentLevel);

    // Setup camera
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.updateCamera();
  }

  startLevel() {
    this.gameRunning = true;
    this.gameOver = false;
    this.levelComplete = false;
    this.speed = 1 + (this.currentLevel - 1) * 0.15;
    this.distance = 100;
    this.score = 0;
    this.timeElapsed = 0;
    this.levelStartTime = Date.now();
    this.obstacleManager.reset(this.currentLevel);
    this.player.reset();
    this.chaser.reset();
  }

  update() {
    if (!this.gameRunning) return;

    const deltaTime = 0.016; // ~60fps
    this.timeElapsed += deltaTime;

    // Update speed based on level progression
    const levelProgress = Math.min(this.timeElapsed / 30, 1); // Speed increases over 30s
    this.speed = (1 + (this.currentLevel - 1) * 0.15) * (1 + levelProgress * 0.3);

    // Move player forward
    this.player.position.z += this.speed * 0.5;

    // Move chaser
    const chaserSpeed = this.speed * 0.4 + (this.currentLevel - 1) * 0.05;
    this.chaser.position.z += chaserSpeed * 0.5;

    // Calculate distance
    this.distance = Math.max(0, this.player.position.z - this.chaser.position.z);

    // Check if caught
    if (this.distance <= 5) {
      this.onCaught();
      return;
    }

    // Handle player input
    this.handleInput();

    // Update obstacles
    this.obstacleManager.update(this.player.position.z);

    // Check collisions
    this.checkCollisions();

    // Update animations
    this.player.update(deltaTime);
    this.chaser.update(deltaTime);

    // Update camera
    this.updateCamera();

    // Calculate score
    this.score = Math.floor(this.player.position.z * 10);
  }

  handleInput() {
    const moveAmount = 0.1;
    
    if (this.inputManager.isKeyPressed('ArrowLeft') || this.inputManager.isKeyPressed('a')) {
      this.player.lane = Math.max(-1, this.player.lane - moveAmount);
    }
    if (this.inputManager.isKeyPressed('ArrowRight') || this.inputManager.isKeyPressed('d')) {
      this.player.lane = Math.min(1, this.player.lane + moveAmount);
    }
    if (this.inputManager.isKeyPressed('ArrowUp') || this.inputManager.isKeyPressed('w')) {
      if (!this.player.isJumping) {
        this.player.jump();
      }
    }
    if (this.inputManager.isKeyPressed('ArrowDown') || this.inputManager.isKeyPressed('s')) {
      this.player.slide();
    }

    // Apply touch input
    const touch = this.inputManager.touchInput;
    if (touch.dx > 0.5) {
      this.player.lane = Math.min(1, this.player.lane + 0.1);
    } else if (touch.dx < -0.5) {
      this.player.lane = Math.max(-1, this.player.lane - 0.1);
    }
    if (touch.dy < -0.5 && !this.player.isJumping) {
      this.player.jump();
    }
    if (touch.dy > 0.5) {
      this.player.slide();
    }

    // Update player position based on lane
    this.player.targetX = this.player.lane * 3;
  }

  checkCollisions() {
    const obstacles = this.obstacleManager.getActiveObstacles();
    for (const obstacle of obstacles) {
      if (this.physics.checkCollision(this.player, obstacle)) {
        this.onCaught();
        return;
      }
    }
  }

  updateCamera() {
    const cameraDistance = 15;
    const cameraHeight = 8;
    this.camera.position.x = this.player.position.x * 0.3;
    this.camera.position.y = this.player.position.y + cameraHeight;
    this.camera.position.z = this.player.position.z - cameraDistance;
    this.camera.lookAt(
      this.player.position.x,
      this.player.position.y + 1,
      this.player.position.z + 10
    );
  }

  onCaught() {
    this.gameRunning = false;
    this.gameOver = true;
  }

  completeLevel() {
    this.gameRunning = false;
    this.levelComplete = true;
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
}
