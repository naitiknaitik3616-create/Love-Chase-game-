import * as THREE from 'three';

const OBSTACLE_TYPES = [
  'box',
  'barrier',
  'gap',
  'spinning',
  'moving',
  'low-barrier',
  'high-barrier',
  'side-obstacle'
];

export class ObstacleManager {
  constructor(scene, level) {
    this.scene = scene;
    this.level = level;
    this.obstacles = [];
    this.activeObstacles = [];
    this.lastObstacleZ = 10;
    this.obstacleSpacing = 25;
  }

  reset(level) {
    this.level = level;
    this.obstacles.forEach(obs => this.scene.remove(obs.mesh));
    this.obstacles = [];
    this.activeObstacles = [];
    this.lastObstacleZ = 10;
    this.generateObstacles();
  }

  generateObstacles() {
    const levelCount = 250;
    const difficultyMultiplier = Math.min(this.level / 50, 3);
    const obstacleCount = Math.floor(100 + this.level * 0.5);

    for (let i = 0; i < obstacleCount; i++) {
      const zPos = this.lastObstacleZ + i * this.obstacleSpacing;
      const obstacleType = OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)];
      this.createObstacle(obstacleType, zPos, difficultyMultiplier);
    }
  }

  createObstacle(type, zPos, difficulty) {
    let mesh;
    const x = (Math.random() - 0.5) * 6;
    const y = 0;

    switch (type) {
      case 'box':
        mesh = this.createBoxObstacle(x, y, zPos);
        break;
      case 'barrier':
        mesh = this.createBarrier(x, y, zPos, difficulty);
        break;
      case 'gap':
        mesh = this.createGap(x, y, zPos);
        break;
      case 'spinning':
        mesh = this.createSpinningObstacle(x, y, zPos);
        break;
      case 'moving':
        mesh = this.createMovingObstacle(x, y, zPos);
        break;
      case 'low-barrier':
        mesh = this.createLowBarrier(x, y, zPos);
        break;
      case 'high-barrier':
        mesh = this.createHighBarrier(x, y, zPos);
        break;
      case 'side-obstacle':
        mesh = this.createSideObstacle(x, y, zPos);
        break;
      default:
        mesh = this.createBoxObstacle(x, y, zPos);
    }

    if (mesh) {
      const obstacle = {
        mesh,
        type,
        position: new THREE.Vector3(x, y, zPos),
        width: 2,
        height: 1,
        depth: 1
      };
      this.obstacles.push(obstacle);
      this.scene.add(mesh);
    }
  }

  createBoxObstacle(x, y, z) {
    const geom = new THREE.BoxGeometry(1.5, 1.5, 1);
    const mat = new THREE.MeshPhongMaterial({ color: 0xff6600 });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(x, y + 0.75, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  createBarrier(x, y, z, difficulty) {
    const geom = new THREE.BoxGeometry(6, 0.5, 0.5);
    const mat = new THREE.MeshPhongMaterial({ color: 0xff1493 });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(0, y + 0.5, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  createGap(x, y, z) {
    // Gap is empty space - create visual guides
    const geom = new THREE.BoxGeometry(6, 0.1, 1);
    const mat = new THREE.MeshPhongMaterial({ color: 0xffff00, transparent: true, opacity: 0.3 });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(0, y - 0.5, z);
    return mesh;
  }

  createSpinningObstacle(x, y, z) {
    const geom = new THREE.BoxGeometry(2, 2, 0.5);
    const mat = new THREE.MeshPhongMaterial({ color: 0x00ffff });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(x, y + 1, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.spinning = true;
    return mesh;
  }

  createMovingObstacle(x, y, z) {
    const geom = new THREE.BoxGeometry(1.2, 1.2, 1);
    const mat = new THREE.MeshPhongMaterial({ color: 0xff00ff });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(x, y + 0.6, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.moving = true;
    mesh.userData.moveDirection = Math.random() > 0.5 ? 1 : -1;
    return mesh;
  }

  createLowBarrier(x, y, z) {
    const geom = new THREE.BoxGeometry(1.5, 0.8, 1);
    const mat = new THREE.MeshPhongMaterial({ color: 0xffaa00 });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(x, y + 0.4, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  createHighBarrier(x, y, z) {
    const geom = new THREE.BoxGeometry(1.5, 2, 1);
    const mat = new THREE.MeshPhongMaterial({ color: 0x00aa00 });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(x, y + 1, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  createSideObstacle(x, y, z) {
    const geom = new THREE.BoxGeometry(0.8, 1.5, 1);
    const mat = new THREE.MeshPhongMaterial({ color: 0x9900ff });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(x * 1.5, y + 0.75, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  update(playerZ) {
    // Update active obstacles
    this.activeObstacles = this.obstacles.filter(obs => {
      const distance = Math.abs(obs.position.z - playerZ);
      return distance < 100;
    });

    // Update spinning obstacles
    this.activeObstacles.forEach(obs => {
      if (obs.mesh.userData.spinning) {
        obs.mesh.rotation.y += 0.05;
      }
      if (obs.mesh.userData.moving) {
        obs.mesh.position.x += obs.mesh.userData.moveDirection * 0.1;
        if (Math.abs(obs.mesh.position.x) > 2.5) {
          obs.mesh.userData.moveDirection *= -1;
        }
      }
    });
  }

  getActiveObstacles() {
    return this.activeObstacles;
  }
}
