var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var backgroundCanvas = document.getElementById("backgroundCanvas");
var backgroundContext = backgroundCanvas.getContext("2d");

var delta = 0;
var lastFrameTimeMs = 0;
var maxFPS = 60;


var width = 800;
var height = 360;

var ball = {
    direction: 'right',
    xPosition: width / 2,
    yPosition: height / 2,
    velocity: 5,
    radius:20
}



setupGameWindow();
configureCanvas();
drawBackground();
drawBall();
requestAnimationFrame(gameLoop);

function configureCanvas() {
    canvas.width = width;
    canvas.height = height;
    canvas.style.position = "absolute"
    canvas.style['z-index'] = 1;
}

function drawBackground() {
    backgroundCanvas.width = width;
    backgroundCanvas.height = height;
    backgroundCanvas.style.position = "absolute"
    backgroundCanvas.style['z-index'] = 0;
    var padelWidth = 1;
    var padelBuffer = 40;
    backgroundContext.fillStyle = "#cccccc";
    //right padel runner
    backgroundContext.fillRect(width - (padelBuffer + padelWidth), 0, padelWidth, height);
    //left padel runner
    backgroundContext.fillRect(padelBuffer, 0, padelWidth, height);
}


function drawBall() {
    //context.arc(x-position,y-postion,radius,startAngle,endAngle,counterclockwise);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(ball.xPosition, ball.yPosition, ball.radius, 0, 2 * Math.PI);
    context.fill();
}
function updateBall(delta) {
    switch (ball.direction) {
        case "left":
            if (ball.xPosition < ball.radius) {
                ball.direction = "right"
            }
            else {
                ball.xPosition -= ball.velocity
            }
            break;
        case "right":
            if (ball.xPosition > width -ball.radius) {
                ball.direction = "left"
            }
            else {
                ball.xPosition += ball.velocity
            }
            break;
    }

}

function update(delta) {
    updateBall(delta)
}

function draw() {
    drawBall()
}

function setupGameWindow() {
    var gameWindow = document.getElementById("gameWindow");
    gameWindow.style.background = "white";
    gameWindow.style.width = width;
    gameWindow.style.height = height;
    gameWindow.style.position = "absolute";
    gameWindow.style.top = "50%";
    gameWindow.style.left = "50%";
    gameWindow.style["margin-top"] = -height / 2;
    gameWindow.style["margin-left"] = -width / 2;
}

function gameLoop(timestamp) {
    console.log(Date.now());
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        requestAnimationFrame(gameLoop);
        return;
    }
    delta = timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;

    update(delta);
    draw();
    requestAnimationFrame(gameLoop);
}