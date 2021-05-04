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
function blackHole(){
    background(50);
}

///////////////////////////////////////////////////////////////////
// Banjo Sketch
function banjo(){
    background(100);
}

///////////////////////////////////////////////////////////////////
// Bird Song Sketch
function birdSong(){
    background(150);
}

///////////////////////////////////////////////////////////////////
// Ding Sketch
function ding(){
    background(200);
}

///////////////////////////////////////////////////////////////////
// Guitar Strum Sketch
function guitarStrum(){
    background(10);
}

///////////////////////////////////////////////////////////////////
// Percussion Sketch
function percussive(){
    background(225);
}

///////////////////////////////////////////////////////////////////
// Rain Sketch


let snowflakes = []; // array to hold snowflake objects

function rain() {
  noStroke();
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
}

// snowflake class
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
    fill(50,current_alpha);
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
function wishYouWereHere(){

}
