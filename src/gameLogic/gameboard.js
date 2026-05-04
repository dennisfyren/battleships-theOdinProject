import { Ship } from "./ships.js";

export class Gameboard {
  constructor() {
    this.ships = [];
    this.missedAttacks = [];
    this.previousAttacks = [];
  }
  placeShip(position, length, rotation) {
    if (this.ships.length === 5) return "Too many ships";
    if (rotation === 1) {
      if (
        position[1] < 1 ||
        position[1] + length - 1 > 10 ||
        position[0] < 1 ||
        position[0] > 10
      )
        return "Position must be within bounds";
    } else if (rotation === 0) {
      if (
        position[1] < 0 ||
        position[1] > 10 ||
        position[0] < 0 ||
        position[0] + length - 1 > 10
      )
        return "Position must be within bounds";
    } else {
      return "Must include rotation";
    }
    const ship = new Ship(length);
    ship.rotation = rotation;
    if (rotation === 1) {
      for (let i = 0; i < length; i++) {
        ship.position.push([position[1] + i, position[0]]);
      }
    } else {
      for (let i = 0; i < length; i++) {
        ship.position.push([position[1], position[0] + i]);
      }
    }
    if (this.ships.length !== 0) {
      if (this.checkCollision(ship)) return "Cannot overlap with another ship";
    }
    this.ships.push(ship);
    return `Created new ship at [${ship.position[0].toString()}]`;
  }
  recieveAttack(position) {
    if (
      this.previousAttacks.some(
        (attack) => attack.toString() == position.toString(),
      )
    )
      return "Can't attack the same tile twice";
    this.previousAttacks.push(position);
    const hit = this.ships.some((ship) => {
      return ship.position.some((tile) => {
        if (position.toString() === tile.toString()) {
          ship.hit();
          return true;
        } else {
          return false;
        }
      });
    });
    if (hit === false) {
      if (
        !this.missedAttacks.some(
          (item) => item.toString() == position.toString(),
        )
      ) {
        this.missedAttacks.push(position);
      }
    } else {
      this.checkRemaining();
    }
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
  checkRemaining() {
    const ships = this.ships;
    const response = this.ships.every((ship) => ship.isSunk === true);
    console.log(!response ? "Go on" : "Game over");
  }
}
