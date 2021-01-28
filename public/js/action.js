var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(100,100);
ctx.strokeStyle = "red";
ctx.stroke();
ctx.closePath();