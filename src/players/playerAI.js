import { Gameboard } from "../gameLogic/gameboard.js";

export class Computer {
  constructor(name = "Computer") {
    this.name = name;
    this.game = new Gameboard();
  }
}
