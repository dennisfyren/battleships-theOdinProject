import { Ship } from "./ships.js";

export class Gameboard {
  constructor() {
    this.ships = [];
  }
  placeShip(position, length, rotation) {
    if (rotation === 1) {
      if (
        position[0] < 1 ||
        position[0] + length - 1 > 10 ||
        position[1] < 1 ||
        position[1] > 10
      )
        return "Position must be within bounds";
    } else if (rotation === 0) {
      if (
        position[0] < 0 ||
        position[0] > 10 ||
        position[1] < 0 ||
        position[1] + length - 1 > 10
      )
        return "Position must be within bounds";
    } else {
      return "Must include rotation";
    }
    const ship = new Ship(length);
    ship.rotation = rotation;
    if (rotation === 1) {
      for (let i = 0; i < length; i++) {
        ship.position.push([position[0] + i, position[1]]);
      }
    } else {
      for (let i = 0; i < length; i++) {
        ship.position.push([position[0], position[1] + i]);
      }
    }
    if (this.ships.length !== 0) {
      if (this.checkCollision(ship)) return "Cannot overlap with another ship";
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
  checkCollision(ship) {
    return this.ships.some((curr) => {
      return curr.position.some((pos) => {
        return ship.position.some(
          (shipPos) => shipPos.toString() === pos.toString(),
        );
      });
    });
  }
}
