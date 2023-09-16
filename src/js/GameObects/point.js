class Point{
    constructor(){
        this.val = 0
        this.points = []
        for(let i=0;i<10;i++){
            const img = new Image()
            img.src = `src/assets/sprites/${i}.png`
            this.points_arr.push(img)
        }
        this.image = this.points[0]
    }
    start(stage){
        this.val = 0
        this.image.onload = () => stage.drawImage(this.image,50,50)
    }
    addPoint(){
        this.val++
    }
    draw(stage){
        const image = this.points_arr[this.val]
        stage.drawImage(image,50,50)
    }
}