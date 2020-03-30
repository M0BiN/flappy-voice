
class Pipe {

    constructor(pipeTopImg, pipeBottomImg) {
        //this.brain = new 
        this.pipeHeight = 320;
        this.pipeTopImg = pipeTopImg;
        this.pipeBottomImg = pipeBottomImg;
        this.maxYp = -Math.floor(Math.random() * 290);
        this.top = this.maxYp;
        this.pipeWidth = 52;
        // (this.maxYp * (Math.random() + 1));
        this.gap = 260//116;
        this.bottom = this.top + this.gap + this.pipeHeight;
        this.x = 360;
        this.speed = 2;

        this.show = (p) => {
            p.image(this.pipeTopImg, this.x, this.top);
            p.image(this.pipeBottomImg, this.x, this.bottom);

        }

        this.update = () => {
            this.x -= this.speed;
        }

        this.isoffscreen = () => {
            return this.x < -this.pipeWidth;
        }

        this.hits = (bird,score) => {

            if (bird.x + 21 > this.x && bird.x - 16 < this.x + this.pipeWidth) {
                if (bird.y - 21 < (this.top + this.pipeHeight) || (bird.y > this.top + this.pipeHeight + this.gap - 12)) {
                    return true;

                }
                //console.log();
                if (bird.x - this.x + this.pipeWidth === 100) score++;
            }
            return false;
        }

    }













}
export default Pipe;