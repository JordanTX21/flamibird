class Bird{
    constructor({g}){
        this.game = g
        this.stage = this.game.stage
        this.x = 50
        this.y = 170
        this.dy = 0
        this.width = 34
        this.height = 24
        this.r = this.width/2
        this.gravity = 0.5;
        this.speed = 3;
        this.color = "#ebeb34"
        this.i = 0
        this.images = [
            this.game.images["yellowbird-upflap"],
            this.game.images["yellowbird-midflap"],
            this.game.images["yellowbird-downflap"],
        ];
        this.image = this.images[this.i]
    }
    start(){
        this.x = 50
        this.y = 170
        this.dy = 0
    }
    draw(){
        if(this.i>=3) this.i = 0
        // this.stage.drawRect(this.x,this.y,this.width,this.height,this.color)
        this.image = this.images[Math. floor(this.i)]
        this.stage.drawImage(this.image,this.x,this.y,this.width,this.height)
        this.i+=this.game.frame
    }
    fall(){
        if(this.y>this.stage.height) return;
        this.dy = this.dy + this.gravity;
        this.y = this.y + this.dy
    }
    up(){
        this.dy = -7.6
    }
}