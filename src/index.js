import { Gameboard } from "./gameboard.js";

const board = new Gameboard();
board.placeShip([4, 2], 3, 0);
board.placeShip([1, 2], 4, 0);
board.placeShip([1, 6], 4, 1);

console.log(board.ships);
