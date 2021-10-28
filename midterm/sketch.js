//colors
var skyBlue = '#b0d6f5';
var darkGreen = '#314a1d';
var mossGreen = '#8b8b3b';
var slateGray = '#686d66';
var mushroomWhite = '#FEFACB';
var pluck;
var forest;
var music;

var cloudX = 0;
var mushroomList = []; //array to store mushrooms
var mushroomColors = ['#DB1616', '#ff8c00', '#3783ff', '#fb7efd', '#7442c8']; // array of mushroom colors
var mushroomCount = 0;

function preload() {
  soundFormats('mp3', 'ogg'); //loud sounds
  pluck = loadSound('pluck'); //when mushroom is picked/grows back
  forest = loadSound('forest'); //forest ambience
  music = loadSound('music'); //soft calming music
}

function setup() {
  createCanvas(600, 600);
  noStroke();
  mushroomCounter = createElement('p', 'mushrooms picked: ' + mushroomCount); //mushroom counter
  mushroomCounter.position(400, -5);

  resetButton = createButton('regrow the mushrooms!'); //button to regrow mushrooms
  resetButton.position(430, 50);
  resetButton.style('font-family', 'cursive');
  resetButton.style('font-weight', 'bold');
  resetButton.mousePressed(reset);

  for (i = 0; i < 8; i++) { //create 8 random mushrooms to start
    mushroomList.push(new Mushroom(random(50, 550), random(300, 550), random(mushroomColors)));
  }
  music.setVolume(.25); //adjusting volume of tracks for balance
  pluck.setVolume(2);
  forest.setVolume(.8);
  forest.loop();
  music.loop();
}


function draw() {
  background(skyBlue); //sky

  mushroomCounter.html('mushrooms picked: ' + mushroomCount);
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

  for (i = 0; i < mushroomList.length; i++) { //go through all mushrooms that exist
    mushroomList[i].drawSelf();
  }
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
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
  drawSelf() {
    fill(mushroomWhite);
    ellipse(this.x, this.y + 10, 20, 50); //mushroom stem
    fill(this.color);
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
  checkClick() {
    const disX = this.x - mouseX;
    const disYCap = this.y - mouseY;
    const disYStem = this.y + 10 - mouseY;
    if ((sqrt(sq(disX) + sq(disYCap)) < 60) && mouseY < this.y) {
      return true;
    } else if ((sqrt(sq(disX) + sq(disYStem)) < 50) && (mouseX > this.x - 10) && (mouseX < this.x + 10)) {
      return true;
    }
  }
}

function mousePressed() {
  for (i = 0; i < mushroomList.length; i++) {
    if (mushroomList[i].checkClick()) {
      mushroomList.splice(i, 1); //remove mushroom from array
      mushroomCount += 1; //increase mushroom count at top of screen
      pluck.play(); //play pluck sound when mushroom is picked
    }
  }
}

function reset() {
  if (mushroomList.length == 0) {
    for (i = 0; i < 8; i++) { //create 8 random mushrooms to start
      mushroomList.push(new Mushroom(random(50, 550), random(300, 550), random(mushroomColors)));
    }
    for (i = 0; i < 15; i++) { //play intense, loud long-ish plucking sound when mushrooms grow back
      pluck.play();
    }
  } else {
    alert("there are still mushrooms to pick!"); //sends alert to user
  }

}
