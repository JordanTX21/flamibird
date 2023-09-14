class Pipe{
    constructor(x,y,h){
        this.x = x
        this.y = y
        this.width = 50
        this.heigth = h
        this.color = "#34eb4c"
        this.speed = 3;
        this.increase_score = 0
    }
    draw(stage){
        stage.drawRect(this.x,this.y,this.width,this.heigth,this.color)
        this.move()
    }
    move(){
        this.x-=this.speed
    }
}