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
            // console.log("hi");
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
            text("**Crickets**", window.innerWidth/2, window.innerHeight/2);
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
    // This code creates a large blob in the corner
    // ellipseMode(CORNERS);
    ellipse(700, 100, 200, 100);
}

///////////////////////////////////////////////////////////////////
// Banjo Sketch
// Pig
function banjo() {
    // Stroke adjustment
    let alpha_adjustment = current_alpha / 255;

    strokeWeight(9);
    fill(255, 0, 50, 100 * alpha_adjustment);
    quad(350, 260, 450, 260, 350, 400, 200, 400);
    ellipse(400, 200, 200, 150);
    triangle(350, 155, 300, 120, 300, 200);
    triangle(450, 150, 500, 120, 500, 200);
    ellipse(400, 220, 90, 60);
    point(380, 220);
    point(420, 220);
    fill(255, current_alpha);
    circle(350, 190, 20);
    circle(350, 190, 0);
    fill(0, current_alpha);
    circle(450, 190, 10);
    stroke(0, current_alpha);
    line(420, 300, 560, 280);
    line(200, 550, 150, 550);
    line(250, 400, 150, 550);
    ellipse(700, 150, 100);
    fill(255, current_alpha);
    ellipse(650, 150, 50);
}

///////////////////////////////////////////////////////////////////
// Bird Song Sketch
// Source: https://p5js.org/examples/hello-p5-flocking.html
let boids = [];

function birdSong() {
//   background(51);
    if (boids.length == 0){
        // Add an initial set of boids into the system
        for (let i = 0; i < 100; i++) {
            boids[i] = new Boid(random(width), random(height));
          }
    }
  // Run all the boids
  for (let i = 0; i < boids.length; i++) {
    boids[i].run(boids);
  }
}

// Boid class
// Methods for Separation, Cohesion, Alignment added
class Boid {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = p5.Vector.random2D();
    this.position = createVector(x, y);
    this.r = 3.0;
    this.maxspeed = 3;    // Maximum speed
    this.maxforce = 0.05; // Maximum steering force
  }

  run(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
  }
  
  // Forces go into acceleration
  applyForce(force) {
    this.acceleration.add(force);
  }
  
  // We accumulate a new acceleration each time based on three rules
  flock(boids) {
    let sep = this.separate(boids); // Separation
    let ali = this.align(boids);    // Alignment
    let coh = this.cohesion(boids); // Cohesion
    // Arbitrarily weight these forces
    sep.mult(2.5);
    ali.mult(1.0);
    coh.mult(1.0);
    // Add the force vectors to acceleration
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }
  
  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset acceleration to 0 each cycle
    this.acceleration.mult(0);
  }
  
  // A method that calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    return steer;
  }
  
  // Draw boid as a circle
  render() {
    let theta = this.velocity.heading() + radians(90);
    fill(0,157,174, current_alpha);
    // ki8
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    fill(0,157,174, current_alpha);
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }
  
  // Wraparound
  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }
  
  // Separation
  // Method checks for nearby boids and steers away
  separate(boids) {
    let desiredseparation = 25.0;
    let steer = createVector(0, 0);
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, boids[i].position);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }
  
    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }
  
  // Alignment
  // For every nearby boid in the system, calculate the average velocity
  align(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }
  
  // Cohesion
  // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
  cohesion(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].position); // Add location
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum); // Steer towards the location
    } else {
      return createVector(0, 0);
    }
  }  
}




///////////////////////////////////////////////////////////////////
// Ding Sketch
let setup_complete = false;
let radius_ding = 30;

function ding() {
//   background(204, current_alpha);
  if (setup_complete == false){
    x =window.innerWidth/2;
    y = window.innerHeight/2;
    setup_complete = true;
  }
    x += random(-5, 5);
    while (x < radius_ding || x> window.innerWidth + radius_ding){
        x += random(-5, 5);
    }
    y += random(-5, 5);
    while(y + radius_ding < radius_ding || y > window.innerHeight + radius_ding){
        y += random(-5,5);
    }
    fill(254, 189, 22, current_alpha);
    stroke(124, 92, 11, current_alpha);
    ellipse(x, y, radius_ding * 2);
}
 
///////////////////////////////////////////////////////////////////
// Guitar Strum Sketch
const Y_AXIS = 1;
const X_AXIS = 2;
let b1, b2, c1, c2;
function guitarStrum() {
  background(0, current_alpha);
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
  background(0, current_alpha);
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
  translate(0,0);
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
    fill(24, 36, 59, current_alpha);
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
//   background(0);
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
    fill(h, 90, 90, current_alpha);
    ellipse(x, y, r, r);
    h = (h + 1) % 360;
  }
}


