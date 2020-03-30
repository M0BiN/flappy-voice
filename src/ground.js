

class TheGround {
    constructor(num) {
        this.x = num;
        this.speed = 2.5;




        this.show = (p, groundImg) => {
            p.image(groundImg, this.x, 512);

        }

        this.update = () => {
            this.x -= this.speed;
        }

        this.isoffscreen = () => {
            
            return (this.x + 990000) < 0;
        }



    }


}



export default TheGround;