var canvas, context;
var targets = [];
var targetRadius = 50;
var targetColor = 'black';
var canvasLeft, canvasTop;


// wait for DOM to load
document.addEventListener('DOMContentLoaded', init);

// initialization
function init() {
   
    canvas = document.getElementById("gameCanvas");
    context = canvas.getContext("2d");



    canvas.width = window.screen.width * 0.7;
    canvas.height = window.screen.height * 0.7;
    targetRadius = window.screen.height * 0.07;

    canvasLeft = canvas.offsetLeft;
    canvasTop = canvas.offsetTop;

    // add event listener to detect mouse click
    canvas.addEventListener('mousedown', (event) => {
        console.log("click: x=" + event.x + " y=" + event.y);
        for (var i = 0; i < targets.length; i++) {
            if (checkTargetHit(event.x - canvasLeft, event.y - canvasTop, targets[i])) {
                targets[i].delete();
                generateNewTarget();
            }
        }
    })

    generateNewTarget();
    generateNewTarget();
    generateNewTarget();
}

// create a new target
function generateNewTarget() {
    var x, y;
    do {
        var x = targetRadius + Math.floor(Math.random() * (canvas.width - 2 * targetRadius));
        var y = targetRadius + Math.floor(Math.random() * (canvas.height - 2 * targetRadius));
    } while (checkTargetOverlap(x, y));
    targets.push(new Target(x, y));
}

// check if a specified coordinates for a potential target would overlap with any existing targets
function checkTargetOverlap(x, y) {
    for (var i = 0; i < targets.length; i++) {
        if (Math.abs(x - targets[i].x) < 2 * targetRadius && Math.abs(y - targets[i].y) < 2 * targetRadius && !targets[i].deleted) {
            return true;
        }
    }
    return false;
}

// check if the user clicked on the specified target
function checkTargetHit(x, y, target) {
    return Math.abs(x - target.x) < targetRadius && Math.abs(y - target.y) < targetRadius && !target.deleted;
}

// draw a target on the canvas at the specified x and y coordinates
function drawTarget(x, y) {
    context.beginPath();
    context.strokeStyle = targetColor;
    context.fillStyle = targetColor;
    context.arc(x, y, targetRadius, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
}

// delete the target at the specified x and y coordinates
function deleteTarget(x, y) {
    context.beginPath();
    context.strokeStyle = 'white';
    context.fillStyle = 'white';
    context.arc(x, y, targetRadius + 1, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
}

// Target class to store coordinates of a target as well as a function to delete the target
class Target {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.deleted = false;
        drawTarget(x, y);
    }
    delete() {
        deleteTarget(this.x, this.y);
        this.deleted = true;
    }
}

