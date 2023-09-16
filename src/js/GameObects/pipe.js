class Pipe{
    constructor(x,y,h){
        this.x = x
        this.y = y
        this.width = 52
        this.heigth = 320
        this.color = "#34eb4c"
        this.speed = 3;
        this.increase_score = 0
        this.direction = 1
        this.image = new Image()
        this.image.src = "src/assets/sprites/pipe-green.png"
    }
    start(stage){
        this.image.onload = () => stage.drawImage(this.image,this.x,this.y,this.width,this.heigth)
    }
    draw(stage){
        // stage.ctx.translate(0, 2*this.height);
        // stage.ctx.scale(1,this.direction);
        stage.drawImage(this.image,this.x,this.y,this.width,this.heigth)
        stage.drawRect(this.x,this.y,this.width,this.heigth,this.color)
        this.move()
    }
    move(){
        this.x-=this.speed
    }
}