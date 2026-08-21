import * as THREE from 'three';

export class Chaser {
  constructor(scene) {
    this.scene = scene;
    this.position = new THREE.Vector3(0, 0, -50);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.mesh = this.createMesh();
    this.scene.add(this.mesh);
  }

  createMesh() {
    const group = new THREE.Group();

    // Body (torso)
    const bodyGeom = new THREE.BoxGeometry(0.9, 1.4, 0.6);
    const bodyMat = new THREE.MeshPhongMaterial({ color: 0x1e90ff }); // Dodger blue
    const body = new THREE.Mesh(bodyGeom, bodyMat);
    body.position.y = 1.2;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Head
    const headGeom = new THREE.SphereGeometry(0.45, 16, 16);
    const headMat = new THREE.MeshPhongMaterial({ color: 0xfdbcb4 });
    const head = new THREE.Mesh(headGeom, headMat);
    head.position.y = 2.4;
    head.castShadow = true;
    head.receiveShadow = true;
    group.add(head);

    // Hair
    const hairGeom = new THREE.SphereGeometry(0.5, 16, 16);
    const hairMat = new THREE.MeshPhongMaterial({ color: 0x1a1a1a }); // Black
    const hair = new THREE.Mesh(hairGeom, hairMat);
    hair.position.set(0, 2.6, 0);
    hair.scale.y = 0.9;
    hair.castShadow = true;
    hair.receiveShadow = true;
    group.add(hair);

    // Arms
    for (let i = -1; i <= 1; i += 2) {
      const armGeom = new THREE.BoxGeometry(0.35, 1.1, 0.35);
      const armMat = new THREE.MeshPhongMaterial({ color: 0xfdbcb4 });
      const arm = new THREE.Mesh(armGeom, armMat);
      arm.position.set(i * 0.7, 1.5, 0);
      arm.castShadow = true;
      arm.receiveShadow = true;
      group.add(arm);
    }

    // Legs
    for (let i = -1; i <= 1; i += 2) {
      const legGeom = new THREE.BoxGeometry(0.4, 1.1, 0.4);
      const legMat = new THREE.MeshPhongMaterial({ color: 0x2C3E50 });
      const leg = new THREE.Mesh(legGeom, legMat);
      leg.position.set(i * 0.35, 0.4, 0);
      leg.castShadow = true;
      leg.receiveShadow = true;
      group.add(leg);
    }

    // Heart badge (blue)
    const heartGeom = new THREE.SphereGeometry(0.22, 16, 16);
    const heartMat = new THREE.MeshPhongMaterial({ color: 0x00bfff, emissive: 0x1e90ff });
    const heart = new THREE.Mesh(heartGeom, heartMat);
    heart.position.set(0, 1.2, 0.4);
    heart.castShadow = true;
    group.add(heart);

    group.castShadow = true;
    group.receiveShadow = true;

    return group;
  }

  reset() {
    this.position.set(0, 0, -50);
    this.velocity.set(0, 0, 0);
    this.updateMeshPosition();
  }

  update(deltaTime) {
    // Simple movement (handled in Game.js)
    this.updateMeshPosition();
  }

  updateMeshPosition() {
    this.mesh.position.copy(this.position);
  }
}
