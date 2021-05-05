// Teachable Machine

// Storing the labels
let labels_dict = {};
let labels_list = [];

// Number of sketches
let num_of_classifiers = 9;

let current_alpha;
let alpha_bound = 255 / num_of_classifiers - 1;



let waiting_message = "Classifying..."

// Classifier and model url
let classifier;

let modelURL = 'https://teachablemachine.withgoogle.com/models/sZjfSVJTi/';

// Teachable Machine Model Load
function preload() {
    classifier = ml5.soundClassifier(modelURL + 'model.json');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);


    textSize(window.innerWidth / 30);
    textAlign(CENTER, CENTER);
    // STEP 2: Start classifying (will listen to mic by default)
    classifyAudio();
}

// STEP 2 classify!
function classifyAudio() {
    classifier.classify(gotResults);
}

function draw() {
    background(255);

    // Wait until the classifier starts to begin running sketches
    print(labels_dict)
    if (labels_list.length == 0){
        text(waiting_message, window.innerWidth/2, window.innerHeight/2);
        return;
    }
    
    // Call each sketch
    for(i = 0; i < labels_list.length; i++){

        let current_label = labels_list[i];

        // Stores the current alpha value
        current_alpha = labels_dict[current_label];

        // Check if the confidence is high enough to render
        if (labels_dict[current_label] < alpha_bound){
            break;
        }
        else if(current_label == "Black Hole"){
            blackHole();
        }
        else if(current_label == "banjo"){
            banjo();
        }
        else if(current_label == "bird song"){
            birdSong();
        }
        else if(current_label == "ding"){
            ding();
        }
        else if(current_label == "guitar strum"){
            guitarStrum();
        }
        else if(current_label == "percussive"){
            percussive();
        }
        else if(current_label == "rain"){
            rain();
        }
        else if(current_label == "rave"){
            rave();
        }
        else if(current_label == "wish you were here"){
            wishYouWereHere();
        }
        else if(labels_dict["Background Noise"] > 255 - alpha_bound){
            text("Background", window.innerWidth/2, window.innerHeight/2);
            break;
        }
    }
}

// STEP 3: Get the classification!
function gotResults(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    // Store the labels
    labels_tm = results;
    labels_list = [];
    for (let a = 0; a < labels_tm.length ; a += 1) { 
        labels_dict[labels_tm[a].label]=labels_tm[a].confidence * 255; 
        labels_list.push(labels_tm[a].label)
    }

}


///////////////////////////////////////////////////////////////////
// Black Hole Sketch
function blackHole() {
    background(150, 20, 99);
    fill(255)
    rectMode(CENTER);
    line(0, 0, 800, 600);
    rect(400, 300, 200, 100);
    fill(200, 0, 130)
    ellipseMode(RADIUS);
    ellipse(400, 100, 200, 100);
    fill(20, 0, 100);
    ellipseMode(CENTER);
    ellipse(400, 100, 200, 100);
    fill(10, 10, 90);
    ellipseMode(CORNER);
    ellipse(400, 100, 200, 100);
    fill(10, 20, 100, 200);
    ellipseMode(CORNERS);
    ellipse(700, 100, 200, 100);
}

///////////////////////////////////////////////////////////////////
// Banjo Sketch
function banjo() {
    background(255);
    strokeWeight(9);
    fill(255, 0, 50, 100);
    quad(350, 260, 450, 260, 350, 400, 200, 400);
    ellipse(400, 200, 200, 150);
    triangle(350, 155, 300, 120, 300, 200);
    triangle(450, 150, 500, 120, 500, 200);
    ellipse(400, 220, 90, 60);
    point(380, 220);
    point(420, 220);
    fill(255);
    circle(350, 190, 20);
    circle(350, 190, 0);
    fill(0);
    circle(450, 190, 10);
    line(420, 300, 560, 280);
    line(200, 550, 150, 550);
    line(250, 400, 150, 550);
    ellipse(700, 150, 100);
    fill(255);
    ellipse(650, 150, 50);
}

///////////////////////////////////////////////////////////////////
// Bird Song Sketch
function birdSong(){
    background(150);
}

///////////////////////////////////////////////////////////////////
// Ding Sketch
function ding(){
    
}
// let message = 'tickle',
//   font,
//   bounds, // holds x, y, w, h of the text's bounding box
//   fontsize = 60,
//   x,
//   y; // x and y coordinates of the text

// function preload() {
//   font = loadFont('assets/SourceSansPro-Regular.otf');
// }

// function setup() {
//   createCanvas(710, 400);

//   // set up the font
//   textFont(font);
//   textSize(fontsize);

//   // get the width and height of the text so we can center it initially
//   bounds = font.textBounds(message, 0, 0, fontsize);
//   x = width / 2 - bounds.w / 2;
//   y = height / 2 - bounds.h / 2;
// }

// function ding() {
//   background(204, 120);

//   // write the text in black and get its bounding box
//   fill(0);
//   text(message, x, y);
//   bounds = font.textBounds(message, x, y, fontsize);

//   // check if the mouse is inside the bounding box and tickle if so
//   if (
//     mouseX >= bounds.x &&
//     mouseX <= bounds.x + bounds.w &&
//     mouseY >= bounds.y &&
//     mouseY <= bounds.y + bounds.h
//   ) {
//     x += random(-5, 5);
//     y += random(-5, 5);
//   }
// }
 
///////////////////////////////////////////////////////////////////
// Guitar Strum Sketch
const Y_AXIS = 1;
const X_AXIS = 2;
let b1, b2, c1, c2;
function guitarStrum() {
  background(0);
  c1 = color(random(255), random(255), random(255));
  c2 = color(random(255), random(255), random(255));
  // Foreground
  setGradient(50, 90, 540, 80, c1, c2, Y_AXIS);
  setGradient(50, 190, 540, 80, c2, c1, X_AXIS);
}
function setGradient(x1, y1, w1, h1, c1, c2, axis) {
  noFill();
  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y1; i <= y1 + h1; i++) {
      let inter = map(i, y1, y1 + h1, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x1, i, x1 + w1, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x1; i <= x1 + w1; i++) {
      let inter = map(i, x1, x1 + w1, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y1, i, y1 + h1);
    }
  }
}

///////////////////////////////////////////////////////////////////
// Percussion Sketch
let a = 0;
function percussive() {
  background(0);
  frameRate(30);
  stroke(250);
  // Let's pick an angle 0 to 90 degrees based on the mouse position
  // Convert it to radians
  theta = radians(a);
  // Start the tree from the bottom of the screen
  translate(width / 2, height);
  // Draw a line 120 pixels
  line(0, 0, 0, -120);
  // Move to the end of that line
  translate(0, -120);
  // Start the recursive branching!
  branch(120);
  a = a + 1 % 90
}
function branch(h) {
  // Each branch will be 2/3rds the size of the previous one
  h *= 0.66;
  // All recursive functions must have an exit condition!!!!
  // Here, ours is when the length of the branch is 2 pixels or less
  if (h > 2) {
    push(); // Save the current state of transformation (i.e. where are we now)
    rotate(theta); // Rotate by theta
    line(0, 0, 0, -h); // Draw the branch
    translate(0, -h); // Move to the end of the branch
    branch(h); // Ok, now call myself to draw two new branches!!
    pop(); // Whenever we get back here, we "pop" in order to restore the previous matrix state
    // Repeat the same thing, only branch off to the "left" this time!
    push();
    rotate(-theta);
    line(0, 0, 0, -h);
    translate(0, -h);
    branch(h);
    pop();
  }
}


///////////////////////////////////////////////////////////////////
// Rain Sketch

let raindrops = []; // array to hold snowflake objects
function rain() {
  noStroke();
  let t = frameCount / 60; // update time
  // create a random number of raindrops each frame
  for (let i = 0; i < random(5); i++) {
    raindrops.push(new raindrop()); // append raindrop object
  }
  // loop through raindrops with a for..of loop
  for (let drop of raindrops) {
    drop.update(t); // update raindrop position
    drop.display(); // draw raindrop
  }
}
// raindrop class
function raindrop() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);
  // radius of raindrop spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));
  this.update = function(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);
    // different size raindrops fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);
    // delete raindrop if past end of screen
    if (this.posY > height) {
      let index = raindrops.indexOf(this);
      raindrops.splice(index, 1);
    }
  };
  this.display = function() {
    fill(50, current_alpha);
    ellipse(this.posX, this.posY, this.size);
  };
}

///////////////////////////////////////////////////////////////////
// Rave Sketch
let cirx;
let d;
let row;
let r, g, b;

function rave(){
    // This is the information that would go in the design
    row = 0;
    inc = 75;

    // Setting the alpha (transparency) for the design

    // the sketch
    for (let y = -5; y <= window.innerHeight + 180; y += 30) {

        if (row % 2 != 1) {
        cirx = 0;
        } else {
        cirx = 84;
        }

        for (let x = cirx; x <= window.innerWidth; x += 170) {

            for (let icircle = 9; icircle > 0; icircle--) {
                if (icircle % 2 == 0) {

                r = mouseX - (row * 10);
                g = (row * 10);
                b = (row * 20);

                fill(r, g, b, current_alpha);
                 //increase diameter of each circle by 20px
                 d = icircle * 30;

                 //draw circle 1
                 circle(x, y, d);

                } 
            }
        }
        
        row++
    }
}

///////////////////////////////////////////////////////////////////
// Wish You Were Here Sketch
let dim;
function wishYouWereHere() {
  dim = width / 2;
  background(0);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  ellipseMode(RADIUS);
  frameRate(1);
  for (let x = 0; x <= width; x += dim) {
    drawGradient(x, height / 2);
  }
}
function drawGradient(x, y) {
  let radius = dim / 2;
  let h = random(0, 360);
  for (let r = radius; r > 0; --r) {
    fill(h, 90, 90);
    ellipse(x, y, r, r);
    h = (h + 1) % 360;
  }
}


