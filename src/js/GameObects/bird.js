class Bird{
    constructor(stage = null){
        this.x = 50
        this.y = 300
        this.dy = 0
        this.width = 34
        this.heigth = 24
        this.r = this.width/2
        this.gravity = 0.5;
        this.speed = 3;
        this.color = "#ebeb34"
        this.image = new Image()
        this.image.src = "src/assets/sprites/yellowbird-midflap.png"
    }
    start(stage){
        this.image.onload = () => stage.drawImage(this.image,this.x,this.y,this.width,this.heigth)
    }
    draw(stage){
        stage.drawImage(this.image,this.x,this.y,this.width,this.heigth)
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