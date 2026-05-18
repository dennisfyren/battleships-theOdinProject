import { Gameboard } from "../gameLogic/gameboard.js";
import { Random } from "../gameLogic/randomGenerator.js";

const random = new Random();

export class Computer {
  constructor(name, attacksArray) {
    this.name = name;
    this.game = new Gameboard();
    this.attacks = attacks();
    this.previousAttack = null;
    this.previousHit = null;
  }
  attack() {
    const tile = this.attacks.splice(random.attack(this.attacks), 1)[0];
    return tile;
  }
}

function attacks() {
  const coordinates = [];
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      coordinates.push([i, j]);
    }
  }
  return coordinates;
}
