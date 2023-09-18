class Stage{
    constructor({g}){
        this.game = g;
        this.element = document.getElementById("stage");
        this.width = this.element.width;
        this.height = this.element.height;
        this.ground = this.height - 112
        this.ctx = this.element.getContext("2d");
        this.ctx.globalCompositeOperation = "source-over";
        this.utils = new Utils()
        this.images = {}
        this.basex = 0
        this.bgx = 0
    }
    clear(){
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    start(){
    }
    drawMessage(){
        this.drawImageCenter(this.game.images.message)
    }
    drawRect(x,y,w,h,c) {
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.fillStyle = c;
        this.ctx.fill();
        this.ctx.closePath();
    }
    drawText(text,x,y){
        this.ctx.font = "bold 32px Arial";
        this.ctx.fillStyle = "#616161";
        this.ctx.fillText(text, x, y);
    }
    drawDieScreen(){
        this.drawImageCenter(this.game.images.gameover)
    }
    drawImage(image,x,y,w=null,h=null) {
        this.ctx.drawImage(image,x,y)
    }
    drawImageCenter(image) {
        this.ctx.drawImage(image, this.width / 2 - image.width / 2, this.height / 2 - image.height / 2)
    }
}