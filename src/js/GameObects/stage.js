class Stage{
    constructor(){
        this.element = document.getElementById("stage");
        this.width = this.element.width;
        this.height = this.element.height;
        this.ctx = this.element.getContext("2d");
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
        this.ctx.font = "32px Arial";
        this.ctx.fillStyle = "#616161";
        this.ctx.fillText(text, x, y);
    }
}