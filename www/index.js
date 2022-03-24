import { Universe } from "wasm-game-of-life";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                Constants and Globals                                                //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let animationFrame = null;
let framesPerAnimation = 30; // 30 frames will go by before we animate

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                      Elements                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const buttonPlay = document.getElementById("play-pause");
const buttonClear = document.getElementById("clear");
const inputSpeed = document.getElementById("speed");
inputSpeed.value = framesPerAnimation;
const pre = document.getElementById("game-of-life-canvas");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                       Helpers                                                       //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const play = () => {
  buttonPlay.textContent = "Pause";
  renderLoop();
};

const pause = () => {
  buttonPlay.textContent = "Play";
  cancelAnimationFrame(animationFrame);
  animationFrame = null;
};

const draw = () => {
  pre.textContent = universe.render();
};

const renderLoop = () => {
  if (animationFrame % (61 - framesPerAnimation) === 0) {
    draw();
    universe.tick();
  }
  animationFrame = requestAnimationFrame(renderLoop);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                      Listeners                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

buttonPlay.addEventListener("click", (_event) => {
  if (animationFrame === null) {
    play();
  } else {
    pause();
  }
});

buttonClear.addEventListener("click", (_event) => {
  universe.clear();
  pre.textContent = universe.render();
});

inputSpeed.addEventListener("change", (_event) => {
  framesPerAnimation = inputSpeed.value;
});

pre.addEventListener("click", (event) => {
  const squareSize = pre.clientWidth / 64;
  const col = Math.floor(event.offsetX / squareSize);
  const row = Math.floor(event.offsetY / squareSize);
  universe.toggle_cell(row, col);
  draw();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                     Entrypoint                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const universe = Universe.new();
universe.set_height = 64;
universe.set_width = 64;

draw();
