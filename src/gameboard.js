import { Ship } from "./ships.js";

export class Gameboard {
  constructor() {
    this.ships = [];
  }
  placeShip(position, length) {
    if (
      position[0] < 0 ||
      position[0] > 10 ||
      position[1] < 0 ||
      position[1] > 10
    )
      return false;
    const ship = new Ship(length);
    for (let i = 0; i < length; i++) {
      ship.position.push([position[0] + i, position[1]]);
    }
    this.ships.push(ship);
    return `Created new ship at [${ship.position[0].toString()}]`;
  }
  recieveAttack(position) {
    const hit = this.ships.some((ship) => {
      return ship.position.some((tile) => {
        if (position.toString() === tile.toString()) {
          ship.hit();
          return true;
        }
        return false;
      });
    });
    return hit ? "Hit!" : "Miss!";
  }
}
