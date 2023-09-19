class Game{
    constructor(){
        this.setup()
    }
    async setup(){
        this.events = new Events()
        this.eventsListener()
        this.utils = new Utils()
        this.images = {}
        this.audios = {}
        this.pipes = []
        this.backgrounds = []
        this.grounds = []
        this.frame = 0.2
        this.status = 'init'
        this.speed = 3
        this.last = 0
        this.stage = new Stage({g:this})
        this.loadAudios()
        await this.loadImages()
        this.point = new Point({g:this})
        this.bird = new Bird({g:this})
        this.stage.start()
        this.bird.start()
        this.point.start()
        requestAnimationFrame((timestamp) => this.draw(timestamp));
    }
    checkRestart(){
        if(this.status == 'gameover'){
            this.status = 'setup'
            return;
        }
        if(this.status == 'setup'){
            this.status = 'start'
            return;
        }
        this.bird.up()
    }
    eventsListener(){
        this.events.mouseEventListener(()=>this.checkRestart())
        this.events.keyEventListener(()=>this.checkRestart())
    }
    async loadImages(){
        const images = [
            'background-day',
            'background-night',
            'base',
            'yellowbird-upflap',
            'yellowbird-midflap',
            'yellowbird-downflap',
            'pipe-green-top',
            'pipe-green-bottom',
            'message',
            'gameover',
            '0','1','2','3','4','5','6','7','8','9',
        ];
        for(const image of images){
            this.images[image] = await this.utils.loadImage(`src/resources/sprites/${image}.png`)
        }
    }
    loadAudios(){
        const audios = [
            'die',
            'hit',
            'point',
            'swoosh',
            'wing',
        ];
        for(const audio of audios){
            this.audios[audio] = new Audio(`src/resources/audio/${audio}.wav`)
        }
    }
    start(){
        this.pipes = []
        this.bird.start()
        this.point.start()
        this.frame = 0.2
        this.stage.drawMessage()
    }
    init(){
        this.backgrounds = []
        this.grounds = []
        this.createBackground({x:0})
        this.createBackground({})
        this.createGround({x:0})
        this.createGround({})
        this.stage.drawMessage()
        this.status = 'setup'
    }
    draw(timestamp){
        this.stage.clear()
        this.drawBrackgrounds()
        this.drawPipes()
        this.drawGrounds()
        this.bird.draw()
        this.point.draw()
        if(this.status==='game'){
            this.bird.fall()
            this.checkCollisions()
            this.checkDestroyPipes()
        }
        else if(this.status==='start'){
            this.createPipes({})
            this.createPipes({x:this.stage.width+(this.stage.width/2)+26})
            this.status = 'game'
        }
        else if(this.status==='gameover'){
            this.stage.drawDieScreen()
            this.frame = 0
            this.bird.fall()
        }
        else if(this.status==='setup'){
            this.start()
        }
        else if(this.status==='init'){
            this.init()
        }
        this.checkDestroyGround()
        this.checkDestroyBackground()
        requestAnimationFrame((timestamp) => this.draw(timestamp));
    }
    drawPipes(){
        for(const pipe of this.pipes){
            pipe.draw()
            if(this.status === 'game'){
                pipe.move()
            }
        }
    }
    drawBrackgrounds(){
        for(const background of this.backgrounds){
            background.draw()
            if(this.status !== 'gameover'){
                background.move()
            }
        }
    }
    drawGrounds(){
        for(const ground of this.grounds){
            ground.draw()
            if(this.status !== 'gameover'){
                ground.move()
            }
        }
    }
    createBackground({x=285}){
        const background = new Background({x:x,y:0,g:this})
        background.start()
        this.backgrounds.push(background)
    }
    createGround({x=336}){
        const ground = new Ground({x:x,y:0,g:this})
        ground.start()
        this.grounds.push(ground)
    }
    createPipes({x=this.stage.width}){
        const margin = 100
        const random = this.utils.random(margin-320,0-margin)
        const pipeUp = new Pipe({x:x,y:random,g:this,d:-1})
        pipeUp.start()
        this.pipes.push(pipeUp)
        
        const pipeDown = new Pipe({x:x,y:random+320+margin,g:this})
        pipeDown.start()
        this.pipes.push(pipeDown)
    }
    checkDestroyPipes(){
        for(const index in this.pipes){
            if(this.pipes[index].x+this.pipes[index].width <=0){
                if(this.pipes[index].direction===1)this.createPipes({})
                this.pipes.splice(index,1)
            }
        }
    }
    checkDestroyBackground(){
        for(const index in this.backgrounds){
            if(this.backgrounds[index].x+this.backgrounds[index].width <=0){
                this.createBackground({})
                this.backgrounds.splice(index,1)
            }
        }
    }
    checkDestroyGround(){
        for(const index in this.grounds){
            if(this.grounds[index].x+this.grounds[index].width <=0){
                this.createGround({})
                this.grounds.splice(index,1)
            }
        }
    }
    checkCollisions(){
        if(this.bird.y <=0 || this.bird.y>=this.stage.ground-this.bird.r){
            this.gameover()
        }
        for(const pipe of this.pipes){
            if(this.utils.checkCollision(this.bird,pipe))
            {
                this.gameover()
            }
            if(this.utils.checkXCollision(this.bird,pipe) && pipe.direction === 1){
                this.point.addPoint()
            }
        }
    }
    gameover(){
        this.audios['hit'].play()
        this.audios['die'].play()
        this.status = 'gameover'
    }
}