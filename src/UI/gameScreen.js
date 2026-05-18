// import { createPlayer } from "./renderUI.js";
import { Render } from "./renderUI.js";
import { Game } from "../gameLogic/game.js";

const render = new Render();
const game = new Game();

render.createPlayer("player");
render.createPlayer("computer");
const name = render.showName();
render.renderLog();
