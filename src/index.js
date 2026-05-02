import { Ship } from "./ships.js";
import { Gameboard } from "./gameboard.js";

const board = new Gameboard();
board.placeShip([1, 2], 3);
board.placeShip([5, 3], 5);

console.log(board.ships[0].position);

console.log(board);
