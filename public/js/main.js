var W = windowWidth;
var H = windowHeight;

function setup() {
    createCanvas(W, H);
}

function draw() {
    background(255);
	ellipse(W/2, H/2, W, H);
}

function windowResized() {
    resizeCanvas(W, H);
}