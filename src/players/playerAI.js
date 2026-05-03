import { Gameboard } from "../gameLogic/gameboard.js";

export class Computer {
  constructor(name) {
    this.name = name;
    this.game = new Gameboard();
  }
}
