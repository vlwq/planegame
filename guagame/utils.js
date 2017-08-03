var e = sel => document.querySelector(sel)

var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var rectIntersects = function(a, b) {
    var o = a
    if (b.y > o.y && b.y < o.y + o.image.height) {
        if (b.x > o.x && b.x < o.x + o.image.width) {
            return true
        }
    }
    return false
}


var bulletfrie = function(a, b) {
    if (b.y >= a.y && b.y <= a.y + a.h) {
        if (b.x >= a.x && b.x <= a.x + a.w) {
            return true
        }
    }
    return false
}
