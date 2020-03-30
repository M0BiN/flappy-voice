import Brain from "./tensorFlow/brain";

class Bird {
  constructor(p, birdDown, birdStraight, birdUp, brain) {
    this.score = 0;
    this.fitness = 0;
    this.x = 128;
    this.y = 180;
    this.gravity = 0.07;
    this.velocity = 0;
    this.lift = -0.2;
    this.currentBird = [birdUp, birdStraight, birdDown, birdStraight];
    this.frame = 0;
    this.DEGREE = Math.PI / 180;
    this.rotation = 0;
    this.birdmustfly = false;
    this.p5 = p;

    // if (brain) {
    //     this.brain = brain.copy();
    // } else {
    //     this.brain = new Brain(5, 8, 2);
    // }

    this.show = p => {
      p.push();
      p.translate(this.x, this.y);
      p.rotate(this.rotation);
      p.image(this.currentBird[this.frame], -21, -21, 42, 42);
      p.pop();
    };

    this.update = () => {
      this.score++;
      this.velocity += this.gravity;
      this.velocity *= 0.95;
      this.rotation =
        this.velocity < -0.05
          ? this.rotation - this.DEGREE * 8
          : this.rotation + this.DEGREE * 1.8;
      this.rotation =
        this.rotation > 90 * this.DEGREE
          ? 90 * this.DEGREE
          : this.rotation < -25 * this.DEGREE
          ? -25 * this.DEGREE
          : this.rotation;
      this.y += this.velocity;
      if (this.y > 490) {
        this.y = 490;
      }
    };

    this.up = () => {
      if (this.y > 0) this.velocity += this.lift;
    };
  }

  think(pipes, p) {
    let closest = null;
    let closestD = Number.POSITIVE_INFINITY;
    for (let i = 0; i < pipes.length; i++) {
      let d = pipes[i].x + pipes[i].pipeWidth - this.x + 16;

      if (d < closestD && d > 0) {
        closest = pipes[i];
        closestD = d;
      }
    }

    let inputs = [];
    inputs[0] = this.y;
    inputs[1] = closest ? closest.top : -320;
    inputs[2] = closest ? closest.bottom : 500;
    inputs[3] = closest ? closest.x : 360;
    inputs[4] = this.velocity;
    //console.log(inputs)
    let output = this.brain.predict(inputs);

    if (output[0] > output[1] && this.velocity >= 0) {
      this.up();
    }
  }

  mutate(rate) {
    this.brain.mutate(rate);
  }

  offScreen(p) {
    return this.y > 490 || this.y < 200;
  }

  saveModel() {
    this.brain.saveModel();
  }
}

export default Bird;
