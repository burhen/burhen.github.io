canvas = document.getElementById('c');
ctx = canvas.getContext('2d');

var to;
var fromrange = -100;
var torange = 100;
var points = [];
var mouseInside = false, mousex, mousey;

document.querySelector('#eq').onkeyup = function(e) {
  clearTimeout(to);
  to = setTimeout(getEquation(),250);
}

function draw() {
  canvas.width = w();
  canvas.height = h();
  ctx.fillStyle = "rgba(31, 23, 22, 1)";
  ctx.fillRect(0,0,w(),h());

  ctx.font="12px Verdana";
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.strokeStyle = "rgba(255,255,255,0.1)";

  //X Axis points
  for (i = 1; i < w(); i += w()/(w()/50))
  {
    ctx.fillText(Math.floor(i - w()/2 - 2), i, h() - 5);
  }

  //Y Axis points
  for (i = 1; i < h(); i += h()/(h()/50))
  {
    ctx.fillText(Math.floor(i - h()/2 - 2), 5, i);
  }

  if(!mouseInside)
  {
    ctx.fillRect(w()/2 + parseInt(w()*(1/(torange - fromrange))),0,1,h());
    ctx.fillRect(0,h()/2,w(),1);
  }
  else {
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.strokeStyle = "rgba(255,255,255,0.2)";

    ctx.fillRect(0,mousey,w(),1);
    ctx.fillRect(mousex,0,1,h());

    ctx.font="12px Verdana";
    ctx.fillText("(" + Math.floor(mousex - w()/2 - w()*((1)/(torange - fromrange))) + "," + Math.floor(mousey - h()/2) + ")", mousex + 20, mousey - 20);

  }

  ctx.strokeStyle = "rgba(255,255,255,0.05)";
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (i = 1; i < points.length - 2; i ++)
  {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();

  for (i = 1; i < points.length - 2; i ++)
  {
    ctx.strokeRect(points[i].x-2, points[i].y-2, 4, 4);
  }

  ctx.beginPath();
  ctx.strokeStyle = "#914";
  ctx.lineWidth=2;
  ctx.moveTo(points[0].x, points[0].y);

  for (i = 1; i < points.length - 2; i ++)
  {
    var xc = (points[i].x + points[i + 1].x) / 2;
    var yc = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
  }
  // curve through the last two points
  ctx.quadraticCurveTo(points[i].x, points[i].y, points[i].x, points[i].y);

  ctx.stroke();
}

function getEquation() {
  var source =  document.querySelector('#eq').value;
  source = source.replace(/sin/ig,"Math.sin");
  source = source.replace(/cos/ig,"Math.cos");
  source = source.replace(/tan/ig,"Math.tan");
  source = source.replace(/cosine/ig,"Math.tan");
  source = source.replace(/sqrt/ig,"Math.sqrt");
  source = source.replace(/pi/ig,"Math.PI");
  source = source.replace(/([a-z]|\d+(?:\.\d+)?)*\s*\^\s*([a-z]|\d+(?:\.\d+)?)/ig, "Math.pow($1, $2)");
  points = [];
  for(var i = fromrange; i < torange; i++)
  {
    var equation = source.replace(/x/ig,(i));
    try {
      val = eval(equation);
      document.querySelector('#eq').style.color = "#8BC34A";
      points.push({
        "x": parseInt(w()/2 + w()*((i+1)/(torange - fromrange))),
        "y": parseInt(val + h()/2)
      });
    }
    catch(e) {
      document.querySelector('#eq').style.color = "#F33";
    }
  }

  console.log(points);
  draw();
}

window.onresize = function() {
  getEquation();
}

getEquation();

document.querySelector('#c').onmousemove = function(e) {
  mouseInside = true;
  mousex = e.x;
  mousey = e.y;
  draw();
}

document.querySelector('#c').onmouseout = function(e) {
  mouseInside = false;
  draw();
}

function w() { return window.innerWidth; }
function h() { return window.innerHeight; }