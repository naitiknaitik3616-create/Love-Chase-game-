import * as THREE from 'three';

export class Player {
  constructor(scene) {
    this.scene = scene;
    this.position = new THREE.Vector3(0, 0, 0);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.targetX = 0;
    this.lane = 0;
    this.isJumping = false;
    this.isSliding = false;
    this.isRunning = true;

    // Create character mesh
    this.mesh = this.createMesh();
    this.scene.add(this.mesh);
  }

  createMesh() {
    const group = new THREE.Group();

    // Body (torso)
    const bodyGeom = new THREE.BoxGeometry(0.8, 1.2, 0.5);
    const bodyMat = new THREE.MeshPhongMaterial({ color: 0xff69b4 }); // Pink
    const body = new THREE.Mesh(bodyGeom, bodyMat);
    body.position.y = 1.2;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Head
    const headGeom = new THREE.SphereGeometry(0.4, 16, 16);
    const headMat = new THREE.MeshPhongMaterial({ color: 0xfdbcb4 }); // Skin tone
    const head = new THREE.Mesh(headGeom, headMat);
    head.position.y = 2.2;
    head.castShadow = true;
    head.receiveShadow = true;
    group.add(head);

    // Hair
    const hairGeom = new THREE.SphereGeometry(0.45, 16, 16);
    const hairMat = new THREE.MeshPhongMaterial({ color: 0x8B4513 }); // Brown
    const hair = new THREE.Mesh(hairGeom, hairMat);
    hair.position.set(0, 2.4, 0);
    hair.scale.y = 0.8;
    hair.castShadow = true;
    hair.receiveShadow = true;
    group.add(hair);

    // Arms
    for (let i = -1; i <= 1; i += 2) {
      const armGeom = new THREE.BoxGeometry(0.3, 1, 0.3);
      const armMat = new THREE.MeshPhongMaterial({ color: 0xfdbcb4 });
      const arm = new THREE.Mesh(armGeom, armMat);
      arm.position.set(i * 0.6, 1.5, 0);
      arm.castShadow = true;
      arm.receiveShadow = true;
      group.add(arm);
    }

    // Legs
    for (let i = -1; i <= 1; i += 2) {
      const legGeom = new THREE.BoxGeometry(0.35, 1, 0.35);
      const legMat = new THREE.MeshPhongMaterial({ color: 0x2C3E50 }); // Dark blue pants
      const leg = new THREE.Mesh(legGeom, legMat);
      leg.position.set(i * 0.3, 0.4, 0);
      leg.castShadow = true;
      leg.receiveShadow = true;
      group.add(leg);
    }

    // Heart badge
    const heartGeom = new THREE.SphereGeometry(0.2, 16, 16);
    const heartMat = new THREE.MeshPhongMaterial({ color: 0xff1493, emissive: 0xff69b4 });
    const heart = new THREE.Mesh(heartGeom, heartMat);
    heart.position.set(0, 1.2, 0.35);
    heart.castShadow = true;
    group.add(heart);

    group.castShadow = true;
    group.receiveShadow = true;

    return group;
  }

  reset() {
    this.position.set(0, 0, 0);
    this.velocity.set(0, 0, 0);
    this.lane = 0;
    this.targetX = 0;
    this.isJumping = false;
    this.isSliding = false;
    this.isRunning = true;
    this.updateMeshPosition();
  }

  jump() {
    if (!this.isJumping && !this.isSliding) {
      this.velocity.y = 15;
      this.isJumping = true;
    }
  }

  slide() {
    if (!this.isSliding && !this.isJumping) {
      this.isSliding = true;
      setTimeout(() => {
        this.isSliding = false;
      }, 300);
    }
  }

  update(deltaTime) {
    // Gravity
    this.velocity.y -= 9.8 * 2 * deltaTime;

    // Apply velocity
    this.position.y += this.velocity.y * deltaTime;

    // Ground collision
    if (this.position.y <= 0) {
      this.position.y = 0;
      this.velocity.y = 0;
      this.isJumping = false;
    }

    // Smooth X movement
    const moveSpeed = 0.15;
    this.position.x += (this.targetX - this.position.x) * moveSpeed;

    this.updateMeshPosition();
  }

  updateMeshPosition() {
    this.mesh.position.copy(this.position);
    
    // Apply slide effect
    if (this.isSliding) {
      this.mesh.scale.y = 0.6;
    } else {
      this.mesh.scale.y = 1;
    }
  }
}
