const gameBoard = document.getElementById('gameBoard')
const context = gameBoard.getContext('2d');
const scoreText = document.getElementById('scoreVal');

const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
const UNIT = 25;

var foodX;
var foodY;
let score = 0;
let active = true;
let started = false;

//speed
let xVel = 25;
let yVel = 0;

//4 unit of sanke
let snake = [
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0}
];

window.addEventListener('keydown',keyPress)
startGame();

function startGame(){
    context.fillStyle = "rgb(70, 221, 70)";
    context.fillRect(0,0,WIDTH,HEIGHT) //(Xstart,Ystart,width,height)
    createFood();
    displayFood();
    drawSanke();
}

function clearBoard()
{
    context.fillStyle = "rgb(70, 221, 70)";
    context.fillRect(0,0,WIDTH,HEIGHT)
}

function createFood(){
    foodX = Math.floor(Math.random()*WIDTH/UNIT)*UNIT; 
    foodY = Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
}


function displayFood(){
    context.fillStyle = "red"
    context.fillRect(foodX,foodY,UNIT,UNIT)
}

function drawSanke(){
    snake.forEach((snakePart, index) => {
        context.fillStyle = index === 0 ? "darkgreen" : "green"; // Head is darker
        context.strokeStyle = "black";
        context.fillRect(snakePart.x, snakePart.y, UNIT, UNIT);
        context.strokeRect(snakePart.x, snakePart.y, UNIT, UNIT);
    });
}

function moveSanke(){
    const head = {x:snake[0].x+xVel,y:snake[0].y+yVel} //unit*4,0
    snake.unshift(head)
    if(snake[0].x == foodX && snake[0].y == foodY){
        score +=1;
        scoreText.textContent = score; 
        createFood();
    }
    else
     snake.pop();
}

function nextTick(){
    if(active){
        setTimeout(() => {
            clearBoard();
            displayFood();
            moveSanke();
            drawSanke();
            checkGameOver();
            nextTick();
        },200-score*5) //200ms initial speed,speed increase by 5ms for each points
    }
    else{
        clearBoard();
        document.getElementById('gameOverText').style.display = 'block';
    }
}  

function keyPress(event){
    if(!started){
        started = true;
        nextTick();
    }
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    switch(true){
        case(event.keyCode==LEFT && xVel!=UNIT):
            xVel = -UNIT;
            yVel = 0;
            break;
        case(event.keyCode==RIGHT && xVel!=-UNIT):
            xVel = UNIT;
            yVel = 0;
            break;
        case(event.keyCode==UP && yVel!=UNIT):
            xVel = 0;
            yVel = -UNIT;
            break;
        case(event.keyCode==DOWN && yVel!=-UNIT):
            xVel = 0;
            yVel = UNIT; 
            break;
    }
}

function checkGameOver(){
    const headX = snake[0].x;
    const headY = snake[0].y;

    // Check if the head touches any part of the snake's body
    for (let i = 1; i < snake.length; i++) {
        if (headX === snake[i].x && headY === snake[i].y) {
            active = false;
            return;
        }
    }
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=WIDTH):
        case(snake[0].y<0):
        case(snake[0].y>=HEIGHT):
            active=false;
            break;
    }
}

function refreshPage(){
    location.reload();
}
