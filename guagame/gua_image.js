/**
 * Created by Andrew on 2017/8/1 0001.
 */
class GuaImage {
    constructor(game , name) {
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
    }
    static new(game , name) {
        var i = new this(game , name)
        return i
    }
    draw() {

    }
    update() {

    }
}

// //逻辑上不应该继承//暂时这么做
// class Player extends  GuaImage{
//     constructor(game , name){
//         super(game , name)
//
//     }
// }
