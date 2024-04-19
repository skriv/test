console.log("CentralPark Font")

let w=0, h=0;
let canvas = document.getElementById('canvas');
let dwn = document.getElementById('btndownload');
let sliderContainer = document.getElementById('slider-track');
let buttons = document.getElementById('buttons');
let slider = document.getElementById('slider-thumb-container');
let placeholder = document.getElementById('placeholder');
let loader = document.getElementById('loader');
let label = document.getElementById("label");
let loaderLeaves = document.querySelectorAll('#loader path');
let months =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
let seasons = ['summer','fall','winter','spring'];
// let kerning = ['KO','OK','YO','OY','CO','BY','AY','YA','RY','LY','DY','PY','WA','AT'];
let kerning = ['WA','AT']
let images = [];
let itemsProcessed;
let filename = '';
let lines = 1;
let timer;
let prevLetter;
let tracking = 10;
// let currentSeason = 'summer';
let defaultState = true;

// dwn.style.visibility="hidden";
// buttons.style.visibility="hidden";
// document.body.classList.add('inactive');

dwn.onclick = function(){
    // starting a counter so that we can download when all the images have been processed

    itemsProcessed = 0;
    
    //turning the SVGs to an array of images
    for (let letter of document.querySelectorAll('#svg_element svg')){
      SVGtoImageArray(letter, images);
    }

    canvas.width = w;
    canvas.height = h;
    
    images.forEach(depict);
}

function download(){
    itemsProcessed = 0;
    
    //turning the SVGs to an array of images
    for (let letter of document.querySelectorAll('#svg_element svg')){
      SVGtoImageArray(letter, images);
    }

    canvas.width = w;
    canvas.height = h;
    
    images.forEach(depict);

}

// LOADER
for (let i=0;i<loaderLeaves.length;i++){
  // setTimeout(function(){
  //   let randomLeaf = loaderLeaves[Math.floor(Math.random()*loaderLeaves.length)];
  //   console.log(randomLeaf);
  //   randomLeaf.style.display = 'none';
  // }, 10*i)
  // for (let path of paths){
        loaderLeaves[i].style.animationDelay = (Math.random()) +'s';
      // }
}

// window.addEventListener('load', function () {
// setTimeout(function(){
  document.body.classList.add("loaded")
// },2000);

// })


// DRAWING IMAGE TO CANVAS
// as seen here: https://stackoverflow.com/questions/8404937/drawing-multiple-images-on-one-canvas

const getContext = () => canvas.getContext('2d');

// It's better to use async image loading.
const loadImage = url => {
    return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`load ${url} fail`));
    img.src = url;
    });
};

// Here, I created a function to draw image.
const depict = options => {
    const ctx = getContext();
    // And this is the key to this solution
    // Always remember to make a copy of original object, then it just works :)
    const myOptions = Object.assign({}, options);
    return loadImage(myOptions.uri).then(img => {
    ctx.drawImage(img, myOptions.x, myOptions.y, myOptions.sw, myOptions.sh);
    itemsProcessed++;
    if (itemsProcessed >= images.length){
        download(canvas, filename + "AtCentralPark.png");
    }
    });
};


// Source from:  http://stackoverflow.com/questions/18480474/how-to-save-an-image-from-canvas

/* Canvas Download */
function download(canvas, filename) {
  /// create an "off-screen" anchor tag
  var lnk = document.createElement('a'), e;

  /// the key here is to set the download attribute of the a tag
  lnk.download = filename;

  /// convert canvas content to data-uri for link. When download
  /// attribute is set the content pointed to by link will be
  /// pushed as "download" in HTML5 capable browsers
  lnk.href = canvas.toDataURL("image/png;base64");

  /// create a "fake" click-event to trigger the download
  if (document.createEvent) {
    e = document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, true, window,
                     0, 0, 0, 0, 0, false, false, false,
                     false, 0, null);

    lnk.dispatchEvent(e);
  } else if (lnk.fireEvent) {
    lnk.fireEvent("onclick");
  }
}


// SAVING SVG AS IMAGE ARRAY
// Source from: https://levelup.gitconnected.com/draw-an-svg-to-canvas-and-download-it-as-image-in-javascript-f7f7713cf81f

function SVGtoImageArray(letter, array){

 h = letter.getBBox().height;
 let _w = letter.getBBox().width;

 w += _w;

 let clonedSvgElement = letter.cloneNode(true);
 let outerHTML = clonedSvgElement.outerHTML,
  blob = new Blob([outerHTML],{type:'image/svg+xml;charset=utf-8'});

 let URL = window.URL || window.webkitURL || window;
 let blobURL = URL.createObjectURL(blob);


 // Creating an object so we can pin it to the canvas later
 let letterObj = {
   "uri": blobURL,
   "x": w - _w,
   "y": 0,
   "sw": _w,
   "sh": h
 }

 array.push(letterObj);

}


// Typing the letters
const svgElem = document.getElementById('svg_element');

document.addEventListener('keydown', function(event) {
    const key = event.key; // "a", "1", "Shift", etc.
    console.log(prevLetter,key);
    let itm;
    let elem = document.querySelector("[data-id='"+key+"']");
    if (key == " "){
        elem = document.querySelector("[data-id='space']");
    }
    if (key == "Backspace"){
      svgElem.removeChild(svgElem.lastElementChild);
      filename = filename.slice(0, -1);
    } else if (key == "Enter"){
      // svgElem.appendChild(document.createElement("br"));
      // lines++;
      itemsProcessed = 0;
    
      //turning the SVGs to an array of images
      for (let letter of document.querySelectorAll('#svg_element svg')){
        SVGtoImageArray(letter, images);
      }
      canvas.width = w;
      canvas.height = h;
      
      images.forEach(depict);
    } else if (elem !== null && svgElem.childElementCount <=10){
      console.log("jjjj")
      if (kern(prevLetter,key)){
        svgElem.removeChild(svgElem.lastElementChild);
        itm = document.querySelector("[data-id='"+prevLetter+key+"']");
        console.log(itm);
      } else {
        itm = elem;
        console.log(itm)
      };
      let cln = itm.cloneNode(true);
      let paths = cln.getElementsByTagName('path');
      for (let path of paths){
        path.style.animationDelay = (Math.random()/2) +'s';
      }
      svgElem.appendChild(cln);
      filename += key;
    }
    // hide or show controls
    if (filename != ''){
      placeholder.style.opacity = "0";
      // dwn.style.visibility="visible";
      buttons.style.top="0px";
      dwn.style.bottom="0px";
    } else {
      placeholder.style.opacity = "1"; 
      // dwn.style.visibility="hidden";
      buttons.style.top="-100px";
      dwn.style.bottom="-100px";
    }
    prevLetter = filename.charAt(filename.length-1);
    setContainerHeight();
});

// assign palettes
let fall = ['#F38230','#F38230', '#F38230', '#F4BC29', '#E55630'];
let winter = ['#1568B0','#1568B0','#1568B0','#1A305B','#95C0E7'];
let spring = ['#B367A7','#B367A7','#6E358A','#F59CBC'];
let summer = ['#73C043', '#226143'];
let defaultPalette = ['#78c145'];
let darkPalette = ['#78c145'];

function changeSeason(season){
  document.querySelector('button.active').classList.remove('active');
  document.getElementById("button-" + season).classList.add('active');
  document.body.classList.remove('fall', 'winter', 'spring', 'summer', 'defaultPalette', 'darkPalette')
  let arr = eval(season)
  let paths = document.querySelectorAll("svg path");
  document.body.classList.add(season);
  for (let path of paths){
    setTimeout(function(){
        path.style.fill = arr[Math.floor(Math.random() * arr.length)];
    }, Math.random()*500)
  }
}


function setContainerHeight(){
  let cH = 0;
  let cW = 0;
  let heights = [];
  for (let letter of document.querySelectorAll("#svg_element svg")){
      // cW += letter.viewBox.baseVal.width + tracking;
      cW += letter.viewBox.baseVal.width;
      cH = letter.viewBox.baseVal.height;
      heights.push(cH);
  }
  svgElem.style.height = Math.min(...heights) * 100 / cW + "vw";
}



// DRAG RADIALLY

let rotate = false;
let rotation = 0;
let centerX = window.innerWidth/2;
let centerY = window.innerHeight/2;

sliderContainer.onmousedown = function(e1){
  startX = e1.clientX;
  startY = e1.clientY;
  rotate = true;
}

document.ontouchstart = function(e1){
  startX = e1.clientX;
  startY = e1.clientY;
  rotate = true;
}

document.onmouseup = function(){
  // startRotation = rotation;
  rotate = false;
}

document.ontouchend = function(){
  // startRotation = rotation;
  rotate = false;
}

document.onmousemove = function(e2){
  // sliderContainer.classList.remove("inactive");
  document.body.classList.remove("inactive");
  if (rotate){
    defaultState = false;
    newX = e2.clientX;
    newY = e2.clientY;
    let x = centerX - newX;
    let y = centerY - newY;
    let a = rad2deg(Math.atan2(y, x));
    rotation = a-90;
    slider.style.transform = "rotate("+ rotation +"deg)";
    let newSeason = seasons[Math.floor(interpolate(rotation,-270,90,0,4))];
    if (newSeason !== currentSeason){
      document.body.classList.remove(currentSeason);
      currentSeason = seasons[Math.floor(interpolate(rotation,-270,90,0,4))];
      document.body.classList.add(currentSeason);
      console.log(eval(currentSeason));
      changeSeason(eval(currentSeason));
    }
    label.innerHTML = currentSeason;
   }
   clearTimeout(timer);
   timer=setTimeout(mouseStopped,300);
}

document.onclick = function(){
  // console.log("clicked")
  // document.body.classList.toggle("defaultPalette");
}

function kern(l1,l2){
  let str = (l1+l2).toUpperCase();
  if (contains(kerning, str)){
    return true;
  }
}

function contains(src, test){ 
  return src.indexOf(test) !== -1; 
} 

// function hasSubArray(master, sub) {
//     return sub.every((i => v => i = master.indexOf(v, i) + 1)(0));
// }

// console.log(contains(kerning, "KO"))
// console.log(contains(kerning, "KP"))

// DETERMINE SEASON FROM DATE
// source https://stackoverflow.com/questions/5670678/javascript-coding-input-a-specific-date-output-the-season
// const getSeason = d => Math.floor((d.getMonth() / 12 * 4)) % 4
// console.log(['Summer', 'Autumn', 'Winter', 'Spring'][getSeason(new Date())])


function rad2deg(radians) {
  var pi = Math.PI;
  return radians * (180/pi);
}

function mouseStopped(){                             
    // sliderContainer.classList.add("inactive");
    // buttons.classList.add("inactive");
    // document.body.classList.add("inactive");
}

function interpolate(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

const render=(arr)=>arr.map(arrr=>console.log(Object.keys({arr})[0]))