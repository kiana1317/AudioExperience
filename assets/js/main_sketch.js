// Teachable Machine

// Storing the label
let label = "waiting...";

// Classifier and model url
let classifier;

let modelURL = 'https://teachablemachine.withgoogle.com/models/sZjfSVJTi/';

// STEP 1: Load the model!
function preload() {
  classifier = ml5.soundClassifier(modelURL + 'model.json');
}

let snowflakes = []; 

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  textSize(width / 30);
  textAlign(CENTER, CENTER);
  // STEP 2: Start classifying (will listen to mic by default)
  classifyAudio();
}

// STEP 2 classify!
function classifyAudio() {
  classifier.classify(gotResults);
}

function draw() {
  background(220);

  // STEP 4: Draw the label
  //text(label, width/2, height - 16);
  // Background noise is headphones
  // Draw the emoji
  // textSize(256);
  // text(label, width / 2, height / 2);

  let original = 'start';
  if (label == 'Background Noise') {

  } else if (label == 'Black Hole') {
    background(0);
  } else if (label == 'banjo') {
    fill(255);
    push();
  translate(width * 0.5, height * 0.5);
  rotate(frameCount / 50.0);
  star(0, 0, 80, 100, 40);
  pop();

  } else if (label == 'bird song') {
    background(200,50,40);
  } else if (label == 'ding') {
    fill(177, 166, 55);
    rect(50, 60, 70, 80);
  } else if (label == 'guitar strum') {

  } else if (label == 'percussion') {

  } else if (label == 'rain') {
    background('brown');
  let t = frameCount / 60; // update time

  // create a random number of snowflakes each frame
  for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }
  } else if (label == 'rave') {

  } else if (label == 'wish you were here') {

  }
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function snowflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
}

// STEP 3: Get the classification!
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // Store the label
  label = results[0].label;
}










// // Teachable Machine

// // Storing the label
// let label = "waiting...";

// // Classifier and model url
// let classifier;

// let modelURL = 'https://teachablemachine.withgoogle.com/models/sZjfSVJTi/';

// let labels= {};
// // STEP 1: Load the model!
// function preload() {
//   classifier = ml5.soundClassifier(modelURL + 'model.json');
// }

// let snowflakes = []; 

// function setup() {
//   createCanvas(800, 600);

//   textSize(width / 30);
//   textAlign(CENTER, CENTER);
//   // STEP 2: Start classifying (will listen to mic by default)
//   classifyAudio();
// }

// // STEP 2 classify!
// function classifyAudio() {
//   classifier.classify(gotResults);
// }

// function draw() {
//   background(220);

//   // STEP 4: Draw the label
//   //text(label, width/2, height - 16);
//   // Background noise is headphones
//   // Draw the emoji
//   // textSize(256);
//   // text(label, width / 2, height / 2);

//   let original = 'start';
//   if (label == 'Background Noise') {

//   } else if (label == 'Black Hole') {
//     background(0);
//   } else if (label == 'banjo') {
//     fill(255);
//     push();
//   translate(width * 0.5, height * 0.5);
//   rotate(frameCount / 50.0);
//   star(0, 0, 80, 100, 40);
//   pop();

  
//     if (labels["rave"] > 0.1){
//         rain();
//     }
//   else if (label == 'rave') {

//   } else if (label == 'wish you were here') {

//   }
// }
// }
// // 
// function rain(){
//    background('brown');
//     let t = frameCount / 60; // update time

//     // create a random number of snowflakes each frame
//     for (let i = 0; i < random(5); i++) {
//       snowflakes.push(new snowflake()); // append snowflake object
//     }

//     // loop through snowflakes with a for..of loop
//     for (let flake of snowflakes) {
//       flake.update(t); // update snowflake position
//       flake.display(); // draw snowflake
//     }
// }

// function star(x, y, radius1, radius2, npoints) {
//   let angle = TWO_PI / npoints;
//   let halfAngle = angle / 2.0;
//   beginShape();
//   for (let a = 0; a < TWO_PI; a += angle) {
//     let sx = x + cos(a) * radius2;
//     let sy = y + sin(a) * radius2;
//     vertex(sx, sy);
//     sx = x + cos(a + halfAngle) * radius1;
//     sy = y + sin(a + halfAngle) * radius1;
//     vertex(sx, sy);
//   }
//   endShape(CLOSE);
// }

// function snowflake() {
//   // initialize coordinates
//   this.posX = 0;
//   this.posY = random(-50, 0);
//   this.initialangle = random(0, 2 * PI);
//   this.size = random(2, 5);

//   // radius of snowflake spiral
//   // chosen so the snowflakes are uniformly spread out in area
//   this.radius = sqrt(random(pow(width / 2, 2)));

//   this.update = function(time) {
//     // x position follows a circle
//     let w = 0.6; // angular speed
//     let angle = w * time + this.initialangle;
//     this.posX = width / 2 + this.radius * sin(angle);

//     // different size snowflakes fall at slightly different y speeds
//     this.posY += pow(this.size, 0.5);

//     // delete snowflake if past end of screen
//     if (this.posY > height) {
//       let index = snowflakes.indexOf(this);
//       snowflakes.splice(index, 1);
//     }
//   };

//   this.display = function() {
//     ellipse(this.posX, this.posY, this.size);
//   };
// }

// // STEP 3: Get the classification!
// function gotResults(error, results) {
//   if (error) {
//     console.error(error);
//     return;
//   }
//   // Store the label
//   labels_tm = results;
  
//   for (let a = 0; a < labels.length ; a += 1) { 
//     labels[labels_tm[a].label]=labels_tm[a].confidence; 
//   }
  
// }