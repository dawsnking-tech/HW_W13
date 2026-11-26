var x = 50;
var y = 50;
var diameter = 25;

var exitX = 0;
var exitY = 0;
var exitChosen = false;
var escapeReached = false;


var balls = [
  { x: 100, y: 100, vx: 3, vy: 2, size: 25, r: 55, g: 20, b: 200 },
  { x: 200, y: 150, vx: -2, vy: 3 , size: 35, r: 155, g: 40, b: 160 },
  { x: 300, y: 220, vx: 2, vy: -3 , size: 45, r: 255, g: 60, b: 120 },
  { x: 400, y: 300, vx: -3, vy: -2, size: 15, r: 95, g: 80, b: 80 },
  { x: 500, y: 400, vx: 2, vy: 3, size: 20, r: 12, g: 100, b: 40 },
];

function setup()
{
    createCanvas(1000,1000);
}

function createPlayer()
{
    fill(24,200,29);

    if(diameter < 50)
    {
        diameter += 2;
    }
    else
    {
        diameter = 25;
    }

    circle(x,y,diameter);
}

function movePlayer()
{
    if(keyIsDown(83))
    {
        y += 10;
    }
    else if(keyIsDown(87))
    {
        y -= 10;
    }
    else if(keyIsDown(65))
    {
        x -= 10;
    }
    else if(keyIsDown(68))
    {
        x += 10;
    }

    if(x > width)
    {
        x = 0;
    }

    if(x < 0)
    {
        x = width;
    }

    if(y > height)
    {
        y = 0;
    }

    if(y < 0)
    {
        y = height;
    }
}




function createObstacles()
{


    for(var i = 0; i < balls.length; i++)
    {
        circle(balls[i].x, balls[i].y, balls[i].size);
        fill(balls[i].r,balls[i].g,balls[i].b);
    }
}




function moveObstacles()
{
    for(var i = 0; i < balls.length; i++)
    {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;

        if(balls[i].x > width + balls[i].size/2)
        {
            balls[i].x = -balls[i].size/2;
        }
        else if(balls[i].x < -balls[i].size/2)
        {
            balls[i].x = width + balls[i].size/2;
        }

        if(balls[i].y > height + balls[i].size/2)
        {
            balls[i].y = -balls[i].size/2;
        }
        else if(balls[i].y < -balls[i].size/2)
        {
            balls[i].y = height + balls[i].size/2;
        }
    }
}




function createBorders()
{
    fill(255,165,0);

    rect(0,0,width,10);
    rect(0,height-10,width,10);
    rect(0,0,10,height);
    rect(width-10,0,10,height);
}



function createExit()
{
    if(exitChosen)
    {
        fill(255,0,0);
        square(exitX,exitY,50);
    }
}

// winner
function displayWinMessage()
{
    if(exitChosen &&
       x >= exitX &&
       x <= exitX + 50 &&
       y >= exitY &&
       y <= exitY + 50)
    {
        escapeReached = true;
    }

    if(escapeReached)
    {
        fill(255);
        textSize(50);
        textAlign(CENTER,CENTER);
        text("You Escaped!",width/2,height/2);
    }
}

// Title
function displayText()
{
    fill(255);
    textSize(50);
    text("Click to choose your exit", width/3, height/10);
}

function draw()
{
    background(0);

    createPlayer();
    movePlayer();

    createObstacles();
    moveObstacles();

    createBorders();

    createExit();

    displayText();

    displayWinMessage();
}

// create exit
function mouseClicked()
{
    exitX = mouseX;
    exitY = mouseY;
    exitChosen = true;
}