import { Universe } from "wasm-game-of-life";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                Constants and Globals                                                //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const SIZE = 64;
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
  fps.render();
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
  const squareSize = pre.clientWidth / SIZE;
  const col = Math.floor(event.offsetX / squareSize);
  const row = Math.floor(event.offsetY / squareSize);
  universe.toggle_cell(row, col);
  draw();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                         FPS                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fps = new (class {
  constructor() {
    this.fps = document.getElementById("fps");
    this.frames = [];
    this.lastFrameTimeStamp = performance.now();
  }

  render() {
    // Convert the delta time since the last frame render into a measure
    // of frames per second.
    const now = performance.now();
    const delta = now - this.lastFrameTimeStamp;
    this.lastFrameTimeStamp = now;
    const fps = (1 / delta) * 1000;

    // Save only the latest 100 timings.
    this.frames.push(fps);
    if (this.frames.length > 100) {
      this.frames.shift();
    }

    let min = Infinity;
    let max = -Infinity;
    let sum = 0;
    for (let i = 0; i < this.frames.length; i++) {
      sum += this.frames[i];
      min = Math.min(this.frames[i], min);
      max = Math.max(this.frames[i], max);
    }
    let mean = sum / this.frames.length;

    // Render the statistics.
    this.fps.textContent = `
fps: ${Math.round(fps)}
avg: ${Math.round(mean)}
min: ${Math.round(min)}
max: ${Math.round(max)}
`.trim();
  }
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                     Entrypoint                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const universe = Universe.new(100, 100);

draw();
