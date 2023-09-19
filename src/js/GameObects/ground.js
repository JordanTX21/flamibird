class Ground{
    constructor({g,x=0,y=0}){
        this.game = g
        this.stage = this.game.stage
        this.width = 336
        this.height = 112
        this.x = x
        this.y = y
        this.speed = this.game.speed
        this.image = this.game.images["base"]
    }
    start(){
        this.y = this.stage.height-this.height
    }
    draw(){
        this.stage.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
    move(){
        this.x-=this.speed
    }
}