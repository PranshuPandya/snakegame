var choise=prompt("1.easy,2.medium, 3.hard");
var time;
if(choise==1) time=150;
if(choise==2) time=125;
if(choise==3) time=50;
const cvs=document.getElementById("snake");
const ctx=cvs.getContext("2d");

// create the unit
const box=32;

//load imges

const ground= new Image();
ground.src ="img/ground.png";

const foodImg = new Image();
foodImg.src="img/food.png";

//add audio
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3"
down.src = "audio/down.mp3"
eat.src = "audio/eat.mp3"
up.src = "audio/up.mp3"
left.src = "audio/left.mp3"
right.src = "audio/right.mp3"
up.src = "audio/up.mp3"
//create the snake

let snake=[];
snake[0]={
    x:9*box,
    y:10*box
}
//create food

let food={
    x: Math.floor(Math.random()*17+1) * box,
    y: Math.floor(Math.random()*15+3) * box
}

//create the score var
let score = 0;

//control the snake
let d;
document.addEventListener("keydown",direction);

function direction(event){
    if(event.keyCode==37 && d!="right") {d="left";left.play();}
    else if(event.keyCode==38 && d!="down") {d="up";up.play();}
    else if(event.keyCode==39 && d!="left") {d="right";right.play();}
    else if(event.keyCode==40 && d!="up") {d="down";down.play();}
}


//check collision function
function collision(head,array){
    for(let i=0;i<array.length; i++){
        if(head.x == array[i].x && head.y ==array[i].y){
            
            // console.log("ye true bhi chalata");
            return true;
        }
    }
        // console.log("ye to false chala");
        return false;
}


//draw everything on the canvas
function draw(){
    ctx.drawImage(ground,0,0);

    for(let i=0; i<snake.length ; i++){
        // ctx.fillStyle= (i==0)? "green" : (i%2==0)? "orange" : "blue" ;
        if(i==0) ctx.fillStyle="black";
        else {
            if(i%3==1) ctx.fillStyle="orange";
            if(i%3==2) ctx.fillStyle="white";
            if(i%3==0) ctx.fillStyle="green";
        }
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

        ctx.strokeStyle="red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    //old head pos
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    // snake.pop();
    //which dirn
    if(d == "left") snakeX-= box;
    if(d == "up") snakeY-=box;
    if(d == "right") snakeX+= box;
    if(d == "down") snakeY+= box;
    
    //if snake eat food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        food={
            x: Math.floor(Math.random()*17+1) * box,
            y: Math.floor(Math.random()*15+3) * box
        }
        eat.play();
    }else{
    //remove the tail
    snake.pop();
    }
    //add new head
    let newHead={
        x: snakeX,
        y: snakeY
    }
    //game over
    if(snakeX < box || snakeX >17*box || snakeY < 3*box 
        || snakeY > 17*box || collision(newHead,snake)){
            clearInterval(game);
            dead.play();
        }
    
    snake.unshift(newHead);

    ctx.fillStyle="white";
    ctx.font="45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
    // console.log("chala");
}

let game = setInterval(draw,time);
