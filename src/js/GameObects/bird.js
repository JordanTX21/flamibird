class Bird{
    constructor(){
        this.x = 50
        this.y = 300
        this.dy = 0
        this.width = 50
        this.heigth = 50
        this.r = this.width/2
        this.gravity = 0.5;
        this.speed = 3;
        this.color = "#ebeb34"
    }
    draw(stage){
        stage.drawRect(this.x,this.y,this.width,this.heigth,this.color)
        this.fall()
    }
    fall(){
        this.dy = this.dy + this.gravity;
        this.y = this.y + this.dy
    }
    up(){
        this.dy = -7.6
    }
}