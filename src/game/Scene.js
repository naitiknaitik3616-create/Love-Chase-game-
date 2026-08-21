import * as THREE from 'three';

export class Scene {
  constructor(scene) {
    this.scene = scene;
    this.createEnvironment();
  }

  createEnvironment() {
    // Ground plane (repeating)
    const groundGeom = new THREE.PlaneGeometry(20, 2000);
    const groundMat = new THREE.MeshPhongMaterial({
      color: 0x2a4a6a,
      side: THREE.DoubleSide
    });
    const ground = new THREE.Mesh(groundGeom, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Side walls
    const wallGeom = new THREE.PlaneGeometry(1, 2000);
    const wallMat = new THREE.MeshPhongMaterial({
      color: 0x1a3a5a,
      side: THREE.DoubleSide
    });

    const leftWall = new THREE.Mesh(wallGeom, wallMat);
    leftWall.position.set(-10.5, 5, 0);
    leftWall.receiveShadow = true;
    this.scene.add(leftWall);

    const rightWall = new THREE.Mesh(wallGeom, wallMat);
    rightWall.position.set(10.5, 5, 0);
    rightWall.receiveShadow = true;
    this.scene.add(rightWall);

    // Sky gradient (using multiple layers)
    this.createSkybox();

    // Ambient decoration
    this.createParticles();
  }

  createSkybox() {
    // Create gradient sky using canvas texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Gradient: Pink to Purple to Blue
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#ff1493');
    gradient.addColorStop(0.5, '#ba55d3');
    gradient.addColorStop(1, '#1a1a2e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    const texture = new THREE.CanvasTexture(canvas);
    const skyGeom = new THREE.SphereGeometry(300, 32, 32);
    const skyMat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
    const sky = new THREE.Mesh(skyGeom, skyMat);
    this.scene.add(sky);
  }

  createParticles() {
    // Floating hearts for decoration
    const particleCount = 50;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 200;
      positions[i + 1] = Math.random() * 100 + 50;
      positions[i + 2] = Math.random() * 500;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xff69b4,
      size: 2,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    this.scene.add(particles);
  }
}
