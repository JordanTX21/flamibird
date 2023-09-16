class Game{
    constructor(){
        this.events = new Events()
        this.utils = new Utils()
        this.stage = new Stage()
        this.point = new Point()
        this.bird = new Bird(this.stage)
        this.points = 0
        this.status = false
        this.is_start_pipes = false
        this.eventsListener()
        this.bird.start(this.stage)
        this.points_arr = []
        this.fillImages()
        this.point.start(this.stage)
    }
    fillImages(){
        for(let i=0;i<10;i++){
            const img = new Image()
            img.src = `src/assets/sprites/${i}.png`
            this.points_arr.push(img)
        }
    }
    start(){
        this.stage = new Stage()
        this.bird = new Bird()
        this.pipes = []
        this.status = true
        this.points = 0
        if(!this.is_start_pipes)this.startPipes()
        this.draw()
    }
    addPoints(){
        this.points += 1
    }
    eventsListener(){
        const _this = this
        this.stage.element.addEventListener('click',() => {
            if(_this.status == false){
                _this.is_start_pipes = false
                return _this.start()
            }
            _this.bird.up()
        })
        document.addEventListener('keydown',(event) => {
            var codigo = event.which || event.keyCode;
            if(codigo==32){
                if(_this.status == false){
                    return _this.start()
                }
                _this.bird.up()
            }
        })
    }
    draw(){
        if(!this.status)return;
        this.stage.clear()
        this.drawBird()
        this.drawPipes()
        this.drawPoints()
        this.checkCollisions()
        this.checkDestroyPipes()
        requestAnimationFrame(() => this.draw());
    }
    startPoints(){
        //this.stage.drawText(`Puntos: ${this.points}`,50,50)
        const image = this.points_arr[this.points]
        image.onload = () => this.stage.drawImage(image,50,50)
    }
    drawPoints(){
        //this.stage.drawText(`Puntos: ${this.points}`,50,50)
        const image = this.points_arr[this.points]
        this.stage.drawImage(image,50,50)
    }
    drawBird(){
        this.bird.draw(this.stage)
    }
    drawPipes(){
        for(const pipe of this.pipes){
            pipe.draw(this.stage)
        }
    }
    async startPipes(){
        if(!this.status) return;
        this.is_start_pipes = true
        await this.utils.sleep(1500)
        this.createPipe()
        this.startPipes()
    }
    createPipe(){
        const heightUp = this.utils.random(0,this.stage.height/2)
        const pipeUp = new Pipe(this.stage.width,0,heightUp)
        this.pipes.push(pipeUp)
        
        const pipeDown = new Pipe(this.stage.width,heightUp+150,this.stage.height-(heightUp+150))
        pipeDown.increase_score = 1
        this.pipes.push(pipeDown)
    }
    checkDestroyPipes(){
        for(const index in this.pipes){
            if(this.pipes[index].x <=0){
                this.pipes.splice(index,1)
            }
        }
    }
    checkCollisions(){
        if(this.bird.y <=0 || this.bird.y>=this.stage.height-this.bird.r){
            this.lose()
        }
        for(const pipe of this.pipes){
            if(this.utils.checkCollision(this.bird,pipe))
            {
                this.lose()
            }
            if(this.utils.checkXCollision(this.bird,pipe) && pipe.increase_score){
                this.addPoints()
            }
        }
    }
    lose(){
        this.status = false
        this.stage.drawDieScreen()
        // alert("YA PERDISTE PE CAUSITA")
        // document.location.reload()
    }
}