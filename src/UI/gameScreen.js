// import { createPlayer } from "./renderUI.js";
import { Render } from "./renderUI.js";

const render = new Render();

render.createPlayer("player");
render.createPlayer("computer");
const name = render.showName();
render.renderLog();
