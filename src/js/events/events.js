class Events{
    constructor(){
    }
    mouseEventListener(callback){
        document.addEventListener('mousedown',() => callback())
    }
    keyEventListener(callback){
        document.addEventListener('keydown',(event) => {
            var codigo = event.which || event.keyCode;
            if(codigo==32){
                callback()
            }
        })
    }
}