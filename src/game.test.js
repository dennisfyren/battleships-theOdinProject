import { Gameboard } from "./gameboard.js";

const game = new Gameboard();

test("add ship", () => {
  expect(game.placeShip([5, 6], 5)).toBe("Created new ship at [5,6]");
});

test("Hit reg", () => {
  expect(game.recieveAttack([6, 6])).toBe("Hit!");
});
test("Hit reg", () => {
  expect(game.recieveAttack([4, 8])).toBe("Miss!");
});

test("Ship out of bounds", () => {
  expect(game.placeShip([7, 6], 5)).toBe("Position must be within bounds");
});
