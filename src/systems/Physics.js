export class Physics {
  constructor() {}

  checkCollision(player, obstacle) {
    const px = player.position.x;
    const py = player.position.y;
    const pz = player.position.z;

    const ox = obstacle.position.x;
    const oy = obstacle.position.y;
    const oz = obstacle.position.z;

    const playerRadius = 0.6;
    const collisionDistance = playerRadius + 0.5;

    const dx = px - ox;
    const dy = py - oy;
    const dz = pz - oz;

    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

    return distance < collisionDistance;
  }
}
