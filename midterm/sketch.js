//colors
var skyBlue = '#b0d6f5';
var lightGreen = '#68864f';
var mediumGreen = '#486433';
var darkGreen = '#314a1d';
var mossGreen = '#8b8b3b';
var darkBrown = '#494122';
var lightBrown = '#494122';
var slateGray = '#686d66';
var mushroomRed = '#DB1616';
var mushroomWhite = '#FEFACB';

var cloudX = 0;

function setup() {
  createCanvas(600, 600);
  background(skyBlue); //sky
  noStroke();

  mushy = new Mushroom(100, 400);
  agaric = new Mushroom(350, 500);
}


function draw() {
  background(skyBlue); //sky

  drawCloud();
  drawCloud();

  fill(slateGray);
  triangle(36, 300, 208, 73, 292, 300); //mountains
  triangle(220, 300, 320, 150, 420, 300);
  triangle(300, 300, 485, 115, 570, 300);

  fill(255);
  triangle(173, 120, 208, 73, 225, 120); //snow on mountains
  triangle(303, 176, 320, 150, 337, 176);
  triangle(458, 141, 485, 115, 497, 141);

  fill(mossGreen); //forest floor
  rect(0, 300, width, 300);

  grassTuft(200, 400);
  grassTuft(100, 500);
  grassTuft(500, 350);
  grassTuft(450, 550);
  grassTuft(50, 350);
  grassTuft(350, 475);


  mushy.drawSelf();
  agaric.drawSelf();
}

function grassTuft(x, y) { //makes tiny blades of grass in a tuft
  fill(darkGreen);
  arc(x, y, 10, 20, 0, PI / 2, OPEN);
  arc(x + 2, y, 10, 20, PI / 2, PI, OPEN);
  arc(x + 5, y, 10, 20, PI / 2, PI, OPEN);
  arc(x + 2, y, 10, 20, 0, PI / 2, OPEN);
}

function drawCloud() { //draws cloud and moves it across screen
  fill(255);
  ellipse(cloudX, 50 + sin(frameCount / 10), 30, 30);
  ellipse(cloudX + 5, 60 + sin(frameCount / 10), 30, 30);
  ellipse(cloudX + 20, 50 + sin(frameCount / 10), 30, 30);
  ellipse(cloudX + 20, 40 + sin(frameCount / 10), 30, 30);
  ellipse(cloudX + 30, 60 + sin(frameCount / 10), 30, 30);

  if (cloudX + 30 > width) {
    cloudX = 0
  } else {
    cloudX = cloudX + .25;
  }
}

class Mushroom { //mushroom class, takes x and y coordinates
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  drawSelf() {
    fill(mushroomWhite);
    ellipse(this.x, this.y + 10, 20, 50); //mushroom stem
    fill(mushroomRed);
    arc(this.x, this.y, 60, 50, PI, 0, CHORD); //mushroom cap
    fill(mushroomWhite);
    stroke(mushroomWhite);
    line(this.x - 30, this.y, this.x + 30, this.y);
    noStroke();
    ellipse(this.x + 10, this.y - 10, 5, 5); //mushroom dots
    ellipse(this.x, this.y - 17, 5, 5);
    ellipse(this.x - 8, this.y - 7, 5, 5);
    ellipse(this.x - 20, this.y - 8, 5, 5);
    ellipse(this.x + 20, this.y - 6, 5, 5);
  }
}
