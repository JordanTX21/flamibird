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
    }
    start(){
        this.val = 0
        this.image = this.points[0]
    }
    addPoint(){
        this.val++
    }
    draw(){
        const points = this.val.toString().split('')
        for(const index in points){
            const image = this.points[points[index]]
            this.stage.drawImage(image,30+(index*30),30)
        }
    }
}