/* 
 * javascript file for website2.html
 * contains all the functions for the working of the canvas element
 */

//canvas and context variable for global use
var canvas;
var ctx;

// objects for table, 2 lamps, all the figures that user might draw during the session
var table;
var lamp1;
var lamp2;
var shapes = [];

var selectedElement;
var selectedShape = 'square';
var currentShape;

var drawEnabled = 0;
var mousedownPosition = {
  x: 0,
  y: 0
};
//variable responsible for checking mouse drag
var mouseDrag = 0;
var mouseDrag2 = false;

/*
 * The following function is called on page load.
 * It calls the paintCanvas function to draw the default canvas.
 * Sets up event listeners for user interaction
 */
function init() {
  canvas = document.getElementById('lampCanvas');
  ctx = canvas.getContext('2d');

  canvas.addEventListener('mousedown', function(e) {
    mouseDrag = 1;
    mousedownPosition.x = e.offsetX;
    mousedownPosition.y = e.offsetY;
    var lamp = checkLamp(e.offsetX, e.offsetY, e.pageX, e.pageY);
  });

  canvas.addEventListener('mousemove', function(e) {
    //checks if mouse is being dragged
    if (mouseDrag == 1) {
      mouseDrag2 = true;
      ctx.clearRect(0, 0, 800, 500);
      paintCanvas();
      currentShape.width = e.offsetX - currentShape.startPosition.x;
      currentShape.height = e.offsetY - currentShape.startPosition.y;
      currentShape.drawfunction(ctx);
    }
  });

  document.addEventListener('mouseup', function(e) {
    mouseDrag = 0;

    //checks if mouse has been release after mouse drag
    if (mouseDrag2 == true) {
      mouseDrag2 = false;
      Shapes.objects.push(currentShape);
    }
  });

  //sets up event listener for the left button which enables the user to move the lamps to the left
  (document.getElementById('leftButton')).addEventListener('click', function() {
    selectedElement.movefunction(ctx, 'left');
  });

  //sets up event listener for the right button which enables the user to move the lamps to the right
  (document.getElementById('rightButton')).addEventListener('click', function() {
    selectedElement.movefunction(ctx, 'right');
  });

  //creates objects for the table and 2 lamps.
  table = new Table(100, 400);
  lamp1 = new Lamp("lamp1", 200, 170, 100, 120, '#270b4c');
  lamp2 = new Lamp("lamp2", 450, 170, 100, 70, '#a3384b');
  paintCanvas();

}

/*
 * The following function paints / repaints the canvas. 
 */
function paintCanvas() {

  // Displays the title of the canvas
  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "#800080";
  ctx.textAlign = "center";
  ctx.fillText("Invitation to Rummage Sale!", lampCanvas.width / 2, 50);
  ctx.font = "20px Comic Sans MS";
  ctx.fillStyle = "#800080";
  ctx.fillText("10/10/2017", lampCanvas.width / 2, 80);

  //calls functions responsible for drawing the table and lamps
  table.drawfunction(ctx);
  lamp1.drawfunction(ctx);
  lamp2.drawfunction(ctx);

  //calls functions for drawing any shapes that the user might have drawn during the session
  console.log(Shapes.objects);
  if (Shapes.objects.length) {
    for (var i = 0; i < Shapes.objects.length; i++)
      (Shapes.objects[i]).drawfunction(ctx);
  }
}

/*constructer for the Lamp object
 * inputs : 1) lampType : the type of lamp you want. lamp1/lamp2
            2) startPositionX : x value of the starting position of the lamp
            3) startPositionY: y value of the starting position of the lamp
            4) width : width of the lamp
            5) height : height of the lamp
            6) color: color of the lamp
            */
function Lamp(lampType, startPositionX, startPositionY, width, height, color) {
  this.lampType = lampType;
  this.startPosition = {
    x: startPositionX || 0,
    y: startPositionY || 0
  };
  this.width = width || 100;
  this.height = height || 190;
  //point where the lamp ends. this helps in detecting wether the user has clicked on the lamp
  this.endPosition = {
    x: this.startPosition.x + this.width,
    y: this.startPosition.y + this.height
  };
  this.color = color || '#AAAAAA';
  // keeps track of all the lamp objects present. required when you want to repaint the canvas
  Lamp.objects.push(this);
}

Lamp.objects = [];

/*constructer for the Table object
 * inputs : 1) startPositionX : x value of the starting position of the table
            2) startPositionY : y value of the starting position of the table
            3) color: color of the table
            */
function Table(startPositionX, startPositionY, color) {
  this.startPosition = {
    x: startPositionX || 0,
    y: startPositionY || 0
  };
  this.color = color || '#AAAAAA';
}

/*constructer for the Shapes object (for the shapes that the user might draw on the canvas)
 * inputs : 1) shapeType : the type of shape the user has drawn. eg. 'square', 'circle'
            2) startPositionX : x value of the starting position of the shape
            3) startPositionY: y value of the starting position of the shape
            4) width : width of the shape
            5) height : height of the shape
            6) color: color of the shape
            */
function Shapes(shapeType, startPositionX, startPositionY, width, height, color) {
  this.shapeType = shapeType;
  this.name = name;
  this.startPosition = {
    x: startPositionX || 0,
    y: startPositionY || 0
  };
  this.width = width || 0;
  this.height = height || 0;
  this.endPosition = {
    x: this.startPosition.x + this.width,
    y: this.startPosition.y + this.height
  };
  this.color = color || '#AAAAAA';
}

//contains all the Shapes objects. Required to repaint the canvas
Shapes.objects = [];

/*
 * The following function draws the table
 * inputs : ctx - context of the canvas
 */
Table.prototype.drawfunction = function(ctx) {

  //parameters that determine shape of the table
  var startPosition = this.startPosition;
  var tableWidth = 500;
  var inclinationWidth = 70;
  var tableTopHeight = 100;
  var tableLegsHeight = 120;
  var tableLegsWidth = 20;

  //the below code draws the table's legs
  ctx.fillStyle = 'black';
  ctx.fillRect(startPosition.x, startPosition.y, tableLegsWidth, tableLegsHeight);
  ctx.fillRect(startPosition.x + inclinationWidth, startPosition.y - tableTopHeight, tableLegsWidth, tableLegsHeight);
  ctx.fillRect(startPosition.x + tableWidth, startPosition.y, tableLegsWidth, tableLegsHeight);
  ctx.fillRect(startPosition.x + inclinationWidth + tableWidth, startPosition.y - tableTopHeight, tableLegsWidth, tableLegsHeight);

  //the below code draws the table top
  var img = document.getElementById("patternBg");
  var pat = ctx.createPattern(img, 'repeat');
  ctx.beginPath();
  ctx.moveTo(startPosition.x, startPosition.y);
  ctx.lineTo(startPosition.x + tableWidth + tableLegsWidth, startPosition.y);
  ctx.lineTo(startPosition.x + inclinationWidth + tableWidth + tableLegsWidth, startPosition.y - tableTopHeight);
  ctx.lineTo(startPosition.x + inclinationWidth, startPosition.y - tableTopHeight);
  ctx.closePath();
  ctx.fillStyle = 'black';
  ctx.fillStyle = pat;
  ctx.fill();
}

/*
 * The following function draws the lamp
 * inputs : ctx - context of the canvas
 */
Lamp.prototype.drawfunction = function(ctx) {

  var startPosition = this.startPosition;
  var radius = 40;
  var lampHeight = 70;
  var inclination = 30;

  //The below code draws the lamp stand
  var grd = ctx.createRadialGradient(startPosition.x, startPosition.y + lampHeight + 100, 45, startPosition.x, startPosition.y + lampHeight + 100, 65);

  if (this.lampType == "lamp1") {
    grd.addColorStop(0, "gray");
    grd.addColorStop(1, "ghostwhite");
  } else {
    grd.addColorStop(0, "#653221");
    grd.addColorStop(1, "#9f6934");
  }

  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.moveTo(startPosition.x, startPosition.y + lampHeight + 100);
  ctx.bezierCurveTo(startPosition.x, startPosition.y + lampHeight + 100 - 30, startPosition.x + 2 * radius, startPosition.y + lampHeight + 100 - 30, startPosition.x + 2 * radius, startPosition.y + lampHeight + 100);
  ctx.bezierCurveTo(startPosition.x + 2 * radius, startPosition.y + lampHeight + 100 + 30, startPosition.x, startPosition.y + lampHeight + 100 + 30, startPosition.x, startPosition.y + lampHeight + 100);
  ctx.closePath();
  ctx.fill();

  if (this.lampType == "lamp1") {
    ctx.fillStyle = 'black';
    ctx.fillRect(startPosition.x + radius - 5, startPosition.y + lampHeight, 10, 100);
  } else {
    var grd2 = ctx.createRadialGradient(startPosition.x, startPosition.y + lampHeight, 40, startPosition.x, startPosition.y + lampHeight, 100);
    grd2.addColorStop(0, "#653221");
    grd2.addColorStop(0.5, "#9f6934");
    grd2.addColorStop(1, "#653221");
    ctx.fillStyle = grd2;
    ctx.beginPath();
    ctx.moveTo(startPosition.x + radius - 10, startPosition.y + lampHeight);
    ctx.lineTo(startPosition.x + radius + 10, startPosition.y + lampHeight);
    ctx.lineTo(startPosition.x + radius + 10, startPosition.y + lampHeight + 25);
    ctx.bezierCurveTo(startPosition.x + radius + 10 + 25, startPosition.y + lampHeight + 25, startPosition.x + radius + 5 + 25, startPosition.y + lampHeight + 90, startPosition.x + radius + 5, startPosition.y + lampHeight + 90);
    ctx.lineTo(startPosition.x + radius + 10 + 5, startPosition.y + lampHeight + 100);
    ctx.lineTo(startPosition.x + radius - 10 - 5, startPosition.y + lampHeight + 100);
    ctx.lineTo(startPosition.x + radius - 10 + 5, startPosition.y + lampHeight + 90);
    ctx.bezierCurveTo(startPosition.x + radius - 10 + 5 - 25, startPosition.y + lampHeight + 90, startPosition.x + radius - 10 - 25, startPosition.y + lampHeight + 25, startPosition.x + radius - 10, startPosition.y + lampHeight + 25);
    ctx.lineTo(startPosition.x + radius - 10, startPosition.y + lampHeight);
    ctx.closePath();
    ctx.fill();

  }
  
  //the below section of code draws the lamp shade + light bulb
  //hole at the top of the lamp (black circle)
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(startPosition.x, startPosition.y);
  ctx.bezierCurveTo(startPosition.x, startPosition.y - 20, startPosition.x + 2 * radius, startPosition.y - 20, startPosition.x + 2 * radius, startPosition.y);
  ctx.bezierCurveTo(startPosition.x + 2 * radius, startPosition.y + 20, startPosition.x, startPosition.y + 20, startPosition.x, startPosition.y);
  ctx.closePath();
  ctx.fill();

  //light bulb
  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.arc(startPosition.x + radius, startPosition.y + 10, 15, 0, 2 * Math.PI);
  ctx.fill();

  //lamp shade
  if (this.lampType == "lamp2") {
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(startPosition.x, startPosition.y);
    ctx.bezierCurveTo(startPosition.x, startPosition.y + 20, startPosition.x + 2 * radius, startPosition.y + 20, startPosition.x + 2 * radius, startPosition.y);
    ctx.lineTo(startPosition.x + 2 * radius + inclination, startPosition.y + lampHeight);
    ctx.quadraticCurveTo(startPosition.x + radius, startPosition.y + lampHeight + 40, startPosition.x - inclination, startPosition.y + lampHeight);
    ctx.closePath();
    //ctx.stroke();
    var grd2 = ctx.createRadialGradient(startPosition.x, startPosition.y + lampHeight, 50, startPosition.x, startPosition.y + lampHeight, 110);
    grd2.addColorStop(0, this.color);
    grd2.addColorStop(0.5, "ghostwhite");
    grd2.addColorStop(1, this.color);
    ctx.fillStyle = grd2;
    ctx.fill();
  } else {
    var grd = ctx.createLinearGradient(startPosition.x, startPosition.y, startPosition.x + 75, startPosition.y);
    grd.addColorStop(0, this.color);
    grd.addColorStop(0.75, "ghostwhite");
    grd.addColorStop(1, this.color);
    lampHeight = 120;
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(startPosition.x, startPosition.y);
    ctx.bezierCurveTo(startPosition.x, startPosition.y + 20, startPosition.x + 2 * radius, startPosition.y + 20, startPosition.x + 2 * radius, startPosition.y);
    ctx.lineTo(startPosition.x + 2 * radius, startPosition.y + lampHeight);
    ctx.quadraticCurveTo(startPosition.x + radius, startPosition.y + lampHeight + 20, startPosition.x, startPosition.y + lampHeight);
    ctx.closePath();
    //ctx.stroke();
    ctx.fillStyle = grd;
    ctx.fill();
  }

}

/*
 * The following function moves the lamp
 * inputs : 1) ctx - context of the canvas
            2) direction - direction in which the lamp has to be moved (left/right)
 */
Lamp.prototype.movefunction = function(ctx, direction) {
  var stepSize = 10;
  if (direction == 'left') {
    this.startPosition.x -= 10;
    ctx.clearRect(0, 0, 800, 500);
    paintCanvas();
  } else if (direction == 'right') {
    this.startPosition.x += 10;
    ctx.clearRect(0, 0, 800, 500);
    paintCanvas();
  }
}

Shapes.prototype.drawfunction = function(ctx) {
  ctx.fillStyle = this.color;
  if (this.shapeType == 'square') {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.startPosition.x, this.startPosition.y, this.width, this.height);
  } else if (this.shapeType == 'triangle') {
    ctx.beginPath();
    ctx.moveTo(this.startPosition.x + this.width / 2, this.startPosition.y);
    ctx.lineTo(this.startPosition.x + this.width, this.startPosition.y + this.height);
    ctx.lineTo(this.startPosition.x, this.startPosition.y + this.height);
    ctx.closePath();
    ctx.fill();
  } else if (this.shapeType == 'circle') {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.startPosition.x, this.startPosition.y, Math.abs(this.width), 0, 2 * Math.PI);
    ctx.fill();
  }

}

/*
* The following function stores the shape in the global variable selectedShape for later use
*/
function selectShape(shape) {
  selectedShape = shape;
}

/*
 * The following function checks if any of the two lamps has been clicked on
 * inputs : 1) x: x value of the point clicked on the canvas. (offset from parent container)
            2) y: y value of the point clicked on the canvas. (offset from parent container)
            3) xp : x value of the point clicked on the page.
            4) yp : y value of the point clicked on the page.
*/
function checkLamp(x, y, xp, yp) {
  var objs = Lamp.objects;
  //if a lamp has been clicked on flag will be set to 1
  var flag = 0;
  // the below code loops through all the lamp objects and sees if the user has clicked on it
  // if yes, the flag is set to 1
  for (var i = 0; i < objs.length; i++) {
    if (x > objs[i].startPosition.x && x < objs[i].endPosition.x && y > objs[i].startPosition.y && y < objs[i].endPosition.y) {
      var colorPicker = document.getElementById('controlBox');
      colorPicker.style.left = xp + 'px';
      colorPicker.style.top = yp + 'px';
      colorPicker.style.display = 'block';
      selectedElement = objs[i];
      flag = 1;
      break;
    }
  }

  //if at this point, the flag is 0, it means that the user has clicked on a part of the canvas
  // which does not contain the lamps
  //this means that the user is trying to draw a shape on the canvas.
  if (flag == 0) {
    drawEnabled = 1;
    document.getElementById('controlBox').style.display = 'none';
    console.log(selectedShape)
    currentShape = new Shapes(selectedShape, x, y, 0, 0, document.getElementById('shapeColor_picker').value);
  }
}

/*
The following function changes the color property of the lamp object
* repaints the canvas so that changes are reflected
*/
function changeColor() {
  selectedElement.color = document.getElementById('color_picker').value;
  ctx.clearRect(0, 0, 800, 500);
  paintCanvas();
}