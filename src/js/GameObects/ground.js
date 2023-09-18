class Ground{
    constructor({g,x=0,y=0}){
        this.game = g
        this.stage = this.game.stage
        this.width = 336
        this.height = 112
        this.x = x
        this.y = y
        this.speed = 3
        this.image = this.game.images["base"]
    }
    start(){
        this.y = this.stage.height-this.height
        this.speed = 3
    }
    draw(){
        this.stage.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
    move(){
        this.x-=this.speed
    }
}