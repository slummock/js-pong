//setup
var height = 360;
var width = 480;
padelWidth = 30;
padelBuffer = 30;
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#cccccc";
//right padel runner
//ctx.fillRect(width-(padelBuffer+padelWidth),0,padelWidth,height);
//left padel runner
//ctx.fillRect(padelBuffer,0,padelWidth,height);

// input 
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        counter++;
        alert('Left was pressed ' + counter);
    }
    else if(event.keyCode == 39) {
        alert('Right was pressed');
    }
});


setInterval(paintCanvas, 16);
counter = 0;
colourCounter = true;
ctx.fillStyle = "#00cc00";
function paintCanvas(){
    if (counter * padelWidth > width){        
        colourCounter? ctx.fillStyle = "#cc0000":ctx.fillStyle = "#00cc00";
        colourCounter = !colourCounter
        counter = 0
    }
    ctx.fillRect(counter*padelWidth,0,padelWidth,height);
    counter ++;    
}