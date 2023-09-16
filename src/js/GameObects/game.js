class Game{
    constructor(){
        this.events = new Events()
        this.utils = new Utils()
        this.stage = new Stage()
        this.point = new Point()
        this.bird = new Bird(this.stage)
        this.status = false
        this.is_start_pipes = false
        this.eventsListener()
        this.bird.start(this.stage)
        this.point.start(this.stage)
    }
    start(){
        this.stage = new Stage()
        this.bird = new Bird()
        this.pipes = []
        this.status = true
        this.bird.start(this.stage)
        this.point.start(this.stage)
        if(!this.is_start_pipes)this.startPipes()
        this.draw()
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
    drawBird(){
        this.bird.draw(this.stage)
    }
    drawPoints(){
        this.point.draw(this.stage)
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
        this.createPipes()
        this.startPipes()
    }
    createPipes(){
        const random = this.utils.random(0,320)
        const pipeUp = new Pipe(this.stage.width,0-random,320)
        pipeUp.direction = -1
        pipeUp.start(this.stage)
        this.pipes.push(pipeUp)
        
        const pipeDown = new Pipe(this.stage.width,heightUp+150,this.stage.height-(heightUp+150))
        pipeDown.start(this.stage)
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
                this.point.addPoint()
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