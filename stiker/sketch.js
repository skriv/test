// require https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.16/p5.min.js
let logoWidth = 150;
let logoHeight = 229;

let weight = 18;
let count = 6;
let c1 = '#4a4a4a';
let c2 = '#262626';

let weightSlider = document.getElementById("weightSlider");
let countSlider = document.getElementById("countSlider");
let heightSlider = document.getElementById("heightSlider");

// let colors = [['#FF94D0', '#FF518F', '#FF004B'],['#FFDC00', '#FF9D1D', '#FF5A48'],['#00F3A1', '#02D1A1', '#01AFA0'],['#43BAFF', '#0098FF', '#0176FF']];

function setup() {
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
  angleMode(DEGREES);
  rectMode(CENTER);
  
  // weightSlider = createSlider(8, 26, weight);
  // weightSlider.position(10, 10);
  // weightSlider.position(100000, 10);
  // weightSlider.id('weightSlider');
  
  // countSlider = createSlider(1, 12, count);
  // countSlider.position(10, 30);
  // countSlider.position(1000000, 30);
  // countSlider.id('countSlider');
  
  // heightSlider = createSlider(100, 300, logoHeight);
  // heightSlider.position(10, 50);
  // heightSlider.position(1000000, 50);
  // heightSlider.id('heightSlider');
}

function draw() {
  background('#F5F5F5');
  background('white');
  
  // console.log(weight, logoHeight);
  
  count = countSlider.value;
  // weight = weightSlider.value()/count*3;
    weight = weightSlider.value;
    // logoWidth = heightSlider.value;
    logoHeight = 150 * heightSlider.value;
    logoWidth = 1.8*150 / heightSlider.value;


  for (let i=count;i>0;i--){
      if (i%2==0){fill(c1)}else{fill(c2)};
      push();
      translate(width/2, height/2);
      rotate(360/count/2 * i);
      // let scaleVal = map(logoHeight, 100, 300, 1.2, 0.7);
      // scale(scaleVal);
      drawH();
      pop();
  }
  
//   push();
//   translate(25, 95);
//   noStroke();
//   for (let x=0;x<4;x++){
//     for (let y=0;y<3;y++){
//       fill(colors[x][y]);
//       ellipse(x*40, y*40, 30, 30);
//     }
//   }
//   pop();

  document.getElementById("btn").onclick = function(){
    saveCanvas('myCanvas', 'jpg');
  }
    

  
}

function drawH(){
  noStroke();
  rect(-logoWidth/2,0,weight,logoHeight);
  rect(logoWidth/2,0,weight,logoHeight);
  rect(0,0,logoWidth,weight);
}


let cursor = document.getElementById("cursor");
document.addEventListener("mousemove", function(e){
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
})