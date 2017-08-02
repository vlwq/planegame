class Bullet extends GuaImage {
    constructor(game) {
        super(game ,'bullet')
        this.setup()
    }
    setup(){
        this.speed = 5
    }
    update(){
        this.y -= this.speed
        // log('debug zoidan : ------------',this.scene.enemies)
        //碰撞

    }

}




class Player extends GuaImage {
    constructor(game) {
        super(game ,'player')
        this.setup()
    }
    setup() {
        this.speed = 10
        this.cooldown = 0
    }
    update(){
        if(this.cooldown > 0){
            this.cooldown--
        }
    }
    fire(){
        if(this.cooldown === 0){
            this.cooldown = 10
            // log('Player x' ,this.x)
            // log('Player y' ,this.y)
            // log('Player w' ,this.w)
            var x = this.x + this.w/2- 15
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElements(b)
            this.scene.addBullet(b)
            //log('debug zoidan : ------------',this.scene)
            //this.scene.bullet = es
        }
    }
    moveLeft() {
        this.x  -= this.speed
    }
    moveRight() {
        this.x  += this.speed
    }
    moveUp() {
        this.y  -= this.speed
    }
    moveDown() {
        this.y  += this.speed
    }
}

const  randomBetween = function (start , end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 4)
        var name = 'enemy' + type
        super(game, name)
        this.setup()
        //一次就挂了
        this.lifes = 1
    }

    setup() {
        this.speed = randomBetween(1, 2)
        this.x = randomBetween(0, 380)
        this.y = randomBetween(0, 100)
    }

    update() {
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
        // 判断 ball 和 blocks 相撞
        var blocks = this.scene.enemies
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            var a = this.isCollide(block)
            this.scene.enemies[i] = a
        }
    }
    isCollide(a){
        var bullet = this.scene.bullet
        for (var i = 0; i < bullet.length; i++) {
            var b = bullet[i]
            if(b.y < 0){
                //移除掉小于0的子弹
                bullet.splice(i,1)
            }
            if( bulletfrie(a , b) ){
                //log('碰撞！')
                a.lifes--
            }
        }
        return a
    }

    kill() {
        this.lifes--
        if (this.lifes < 1) {
            this.alive = false
        }
    }

}


class Cloud extends GuaImage {
    constructor(game) {
        super(game , 'cloud')
        this.setup()
    }
    setup(){
        this.speed = 1
        this.x = randomBetween(0,350)
        this.y = randomBetween(0,200)
    }
    update() {
        this.y  += this.speed
        if(this.y > 600){
            this.setup()
        }
    }
}

class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInput()
    }
    setup(){
        this.numberOfEnemies = 10
        var game = this.game

        this.bg = GuaImage.new(game , 'sky')
        this.cloud = Cloud.new(game , 'cloud')

        this.player = Player.new(game)
        this.player.x = 160
        this.player.y = 540


        this.addElements(this.bg)
        this.addElements(this.cloud)
        this.addElements(this.player)
        //
        this.addEmemies()
    }
    addEmemies(){
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            log('gauguagua:--------',e)
            es.push(e)
            this.addElements(e)
        }
        this.enemies = es
    }
    update() {
        super.update()
        this.cloud.y += 1
    }
    setupInput(){
        var g = this.game
        var s = this
        g.registerAction('a' , function () {
            s.player.moveLeft()
        })
        g.registerAction('d' , function () {
            s.player.moveRight()
        })
        g.registerAction('w' , function () {
            s.player.moveUp()
        })
        g.registerAction('s' , function () {
            s.player.moveDown()
        })
        g.registerAction('j' , function () {
            s.player.fire()
        })
    }
}

//
//
// var Scene = function(game) {
//     var s = {
//         game: game,
//     }
//     // 初始化
//     var paddle = Paddle(game)
//     var ball = Ball(game)
//
//     var score = 0
//
//     blocks = loadLevel(game, 3)
//
//     game.registerAction('a', function(){
//         paddle.moveLeft()
//     })
//     game.registerAction('d', function(){
//         paddle.moveRight()
//     })
//     game.registerAction('f', function(){
//         ball.fire()
//     })
//
//     s.draw = function() {
//         // draw 背景
//         game.context.fillStyle = "#554"
//         game.context.fillRect(0, 0, 400, 300)
//         // draw
//         game.drawImage(paddle)
//         game.drawImage(ball)
//         // draw blocks
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.alive) {
//                 game.drawImage(block)
//             }
//         }
//         // draw labels
//         game.context.fillText('分数: ' + score, 10, 290)
//     }
//     s.update = function() {
//         if (window.paused) {
//             return
//         }
//
//         ball.move()
//         // 判断游戏结束
//         if (ball.y > paddle.y) {
//             // 跳转到 游戏结束 的场景
//             var end = SceneEnd.new(game)
//             game.replaceScene(end)
//         }
//         // 判断相撞
//         if (paddle.collide(ball)) {
//             // 这里应该调用一个 ball.反弹() 来实现
//             ball.反弹()
//         }
//         // 判断 ball 和 blocks 相撞
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.collide(ball)) {
//                 // log('block 相撞')
//                 block.kill()
//                 ball.反弹()
//                 // 更新分数
//                 score += 100
//             }
//         }
//     }
//
//     // mouse event
//     var enableDrag = false
//     game.canvas.addEventListener('mousedown', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         log(x, y, event)
//         // 检查是否点中了 ball
//         if (ball.hasPoint(x, y)) {
//             // 设置拖拽状态
//             enableDrag = true
//         }
//     })
//     game.canvas.addEventListener('mousemove', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         // log(x, y, 'move')
//         if (enableDrag) {
//             log(x, y, 'drag')
//             ball.x = x
//             ball.y = y
//         }
//     })
//     game.canvas.addEventListener('mouseup', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         log(x, y, 'up')
//         enableDrag = false
//     })
//
//     return s
// }
