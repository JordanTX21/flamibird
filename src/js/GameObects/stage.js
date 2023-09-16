class Stage{
    constructor(){
        this.element = document.getElementById("stage");
        this.width = this.element.width;
        this.height = this.element.height;
        this.ctx = this.element.getContext("2d");
        this.ctx.globalCompositeOperation = "destination-over";
        this.utils = new Utils()
        this.images = {

        }
    }
    clear(){
        this.ctx.clearRect(0, 0, this.element.width, this.element.height);
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
        this.drawImageCenter("src/assets/sprites/gameover.png")
    }
    drawImage(image,x,y,w=null,h=null) {
        this.ctx.drawImage(image,x,y)
    }
    drawImageLink(src,x,y,w=null,h=null) {
        const image = new Image();
        image.src = src;
        image.onload = () => this.ctx.drawImage(image,x,y)
    }
    drawImageCenter(src) {
        this.ctx.globalCompositeOperation = "source-over";
        const image = new Image();
        image.src = src;
        image.onload = () => this.ctx.drawImage(image, this.element.width / 2 - image.width / 2, this.element.height / 2 - image.height / 2)
    }
}