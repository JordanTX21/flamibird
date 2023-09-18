class Background{
    constructor({g,x=0,y=0}){
        this.game = g
        this.stage = this.game.stage
        this.x = x
        this.y = y
        this.width = 285
        this.height = 512
        this.speed = 1
        this.image = this.game.images["background-day"]
    }
    start(){
        this.y = 0
        this.speed = 1
    }
    draw(){
        this.stage.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
    move(){
        this.x-=this.speed
    }
}