var W = window.innerWidth;
var H = window.innerHeight;

var balls = [
    {x: 50, y: 50},
    {x: 100, y: 100},
    {x: 250, y: 250}
]

function setup() {
    createCanvas(W, H);
}

function draw() {
    background(255);
	for (let ball of balls) {
        ellipse(ball.x, ball.y, 50, 50);
    }
}

function windowResized() {
    resizeCanvas(W, H, false);
}