var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('load', function() {
    init();
});

var c = canvas.getContext('2d');

/* c.fillStyle = "blue";
c.fillRect(100, 100, 100, 100);
c.fillStyle = "red";
c.fillRect(200, 200, 100, 100);
c.fillStyle = "green";
c.fillRect(300, 300, 100, 100);

c.beginPath();
c.moveTo(100, 600);
c.lineTo(600, 600);
c.lineTo(600, 100);
c.strokeStyle = "#u4ffe5";
c.stroke(); 

for (var i = 0; i < 2; i++) {
    c.beginPath();
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    c.arc(x, y, 30, 0, Math.PI * 2, false);
    c.strokeStyle = "blue";
    c.stroke();
} */

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 50;
var colorArray = ['#D6875A','#2C598A','#65D695', '#4F90D6' ,'#488A64'];

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.round(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function () {
        if (this.x > innerWidth - this.radius || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
    
        if (this.y > innerHeight - this.radius || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 50 && mouse.x - this.x > - 50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius){
            this.radius -= 1;
        }

        this.draw();
    }
}

var circleArray = [];

function init() {
    circleArray = [];
    for (var i = 0; i < 100; i++) {
        var radius = Math.random() * 30 + 5;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 2;
        var dy = (Math.random() - 0.5) * 2;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    for (var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
}

animate();