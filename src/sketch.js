import Bird from "./bird";
import Pipe from "./pipe";
import TheGround from "./ground";
import store from './redux/store'
let bird = [];
let gameStatus = "getReady";
let score = 0;
let ghelegh = true;
let performNow = 0;
let TOTAL = 1;
let savedBirds = [];
let counter = 1;
let slider;
let showBest = false;
let speed = 1;
export function setSpeed(s) {
  speed = s;
}
export function setshowBest(ssb) {
  showBest = ssb;
}
export default function Sketch(p) {
  let canvas;
  let pipes = [];
  let img;
  let birdUp;
  let birdStraight;
  let birdDown;
  let background;
  let sky;
  let groundImg;
  let groundsArray = [];
  let pipeTopImg;
  let pipeBottomImg;
  let getReadyImg;
  let startButton;
  let gameOverImg;
  let scoreBoardImg;
  let reTryImg;
  p.preload = () => {
    img = p.loadImage(
      "https://images-na.ssl-images-amazon.com/images/I/51TxyIoXrZL._SX425_.jpg"
    );
    birdDown = p.loadImage(require("./assets/bird1.png"));
    birdStraight = p.loadImage(require("./assets/bird2.png"));
    birdUp = p.loadImage(require("./assets/bird3.png"));
    background = p.loadImage(require("./assets/flappybirdBackground.jpg"));
    sky = p.loadImage(require("./assets/flappybird_SkyBuilding.jpg"));
    groundImg = p.loadImage(require("./assets/flappyBridGrass.jpg"));
    pipeTopImg = p.loadImage(require("./assets/pipeGreen_top.png"));
    pipeBottomImg = p.loadImage(require("./assets/pipeGreen_bottom.png"));
    //font = p.loadFont(require('./myFont.ttf'));
    getReadyImg = p.loadImage(require("./assets/get-ready.png"));
    startButton = p.loadImage(require("./assets/start-button.png"));
    gameOverImg = p.loadImage(require("./assets/gameover.png"));
    scoreBoardImg = p.loadImage(require("./assets/scoreboard.png"));
    reTryImg = p.loadImage(require("./assets/retry-button.png"));
  };

  p.setup = reSetup => {
    canvas = p.createCanvas(360, 640);

    bird = new Bird(p, birdDown, birdStraight, birdUp);

    groundsArray.push(new TheGround(0), new TheGround(359));
    p.image(img, 0, 0, 50, 50);
  };

  p.draw = () => {
    const voice = store.getState().voice

    if (counter % 180 === 0) {
      pipes.push(new Pipe(pipeTopImg, pipeBottomImg));
      score++;
    }
    counter++;

    if (gameStatus !== "getReady")
      for (let i = pipes.length - 1; i >= 0; i--) {
        //pipes[i].show(p);
        if (gameStatus === "Playing") {
          pipes[i].update(p);
          for (let j = 0; j < bird.length; j++) {
            if (pipes[i].hits(bird, score) || bird.offScreen(p)) {
              gameStatus = "Defeat";
              //savedBirds.push(bird.splice(j, 1)[0]);
            }
          }
        }

        if (pipes[i].isoffscreen) {
          pipes.slice(i, 1);
        }
      }

    if (gameStatus === "Playing") {
      
        //bird.listen(pipes, p.weight);
        bird.update();
      
    }

    p.image(sky, 0, 0);
    if (gameStatus === "getReady") {
      ghelegh = false;
      p.image(getReadyImg, 90, 100);
      p.image(startButton, 128, 400);
    } else if (gameStatus === "Defeat") {
      p.image(scoreBoardImg, 68, 176);
      //p.textFont(font);
      p.textSize(24);
      p.fill(255);
      p.stroke("black");
      p.strokeWeight(3);
      p.text(score, 246, 230);
      p.image(gameOverImg, 90, 100);
      p.image(reTryImg, 128, 300);
    }

    if (gameStatus === "Playing") {
      bird.show(p);
      pipes.map(v => v.show(p));
    }


    for (let i = groundsArray.length - 1; i >= 0; i--) {
      groundsArray[i].show(p, groundImg);
      if (gameStatus === "Playing" || gameStatus === "getReady")
        groundsArray[i].update(p);
      if (groundsArray[i].x + 360 < 0) {
        groundsArray.splice(i, 1);
        groundsArray.push(new TheGround(350));
      }
    }

    if (gameStatus === "Playing") {
        if(voice==='shir'){
            bird.up();
        }
      //p.textFont(font);
      p.textSize(80);
      p.fill(255);
      p.stroke("black");
      p.strokeWeight(4);
      p.text(score, 160, 100);
    }
  };

  p.keyPressed = () => {};
  p.mousePressed = () => {
    if (
      gameStatus === "getReady" &&
      p.mouseX > 128 &&
      p.mouseX < 232 &&
      p.mouseY > 400 &&
      p.mouseY < 458
    ) {
      groundsArray = [];
      pipes = [];
      p.setup("reSetup");
      gameStatus = "Playing";

      bird.up();

      performNow = performance.now();
    }

    if (gameStatus === "Playing") {
      bird.up()
    }
    //bird[0].saveModel();
  };



  p.myCustomRedrawAccordingToNewPropsHandler = newProps => {
    if (canvas)
      //Make sure the canvas has been created
      p.fill(newProps.color);
  };
}
