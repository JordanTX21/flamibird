class Pipe{
    constructor({x,y,g,d=1}){
        this.game = g
        this.stage = this.game.stage
        this.x = x
        this.y = y
        this.width = 52
        this.height = 320
        this.color = "#34eb4c"
        this.speed = 3;
        this.direction = d
        this.image = d===1? this.game.images["pipe-green-bottom"]:this.game.images["pipe-green-top"]
    }
    start(){
        // this.stage.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
    draw(){
        // this.stage.drawRect(this.x,this.y,this.width,this.height,this.color)
        this.stage.drawImage(this.image,this.x,this.y,this.width,this.height)
        // this.move()
    }
    move(){
        this.x-=this.speed
    }
}