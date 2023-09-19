class Point{
    constructor({g}){
        this.game = g
        this.val = 0
        this.points = []
        for(let i=0;i<10;i++){
            this.points.push(this.game.images[i])
        }
        this.image = this.points[0]
        this.stage = this.game.stage
        this.score = parseInt(localStorage.getItem("score")??'0');
    }
    start(){
        this.val = 0
        this.image = this.points[0]
    }
    addPoint(){
        this.game.audios['point'].pause();
        this.game.audios['point'].currentTime = 0;
        this.game.audios['point'].play()
        this.val++
        this.checkHightScore()
    }
    draw(){
        /** DRAW PONITS */
        const points = this.val.toString().split('')
        for(const index in points){
            const image = this.points[points[index]]
            this.stage.drawImage(image,30+(index*30),30)
        }

        /** DRAW HIGHT SCORE */
        const hight_points = this.score.toString().split('').reverse()
        for(const index in hight_points){
            const image = this.points[hight_points[index]]
            this.stage.drawImage(image,230-(index*30),30)
        }
    }
    checkHightScore(){
        this.score = parseInt(localStorage.getItem("score")??'0');
        if(this.val>this.score){
            this.score = this.val;
            localStorage.setItem("score",this.val);
        }
    }
}