class GuaScene {
    constructor(game) {
        this.game = game
        this.elements = []
        this.bullet = []
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    addElements(img){
        img.scene = this
        this.elements.push(img)
    }

    addBullet(img){
        img.scene = this
        this.bullet.push(img)
    }

    draw() {
        //this.scene.draw()
        for(var i=0;i< this.elements.length;i++){
            var e = this.elements[i]
            this.game.drawImage(e)
        }
    }
    update() {
        for(var i=0;i< this.elements.length;i++){
            var e = this.elements[i]
            e.update()
        }
    }
}
