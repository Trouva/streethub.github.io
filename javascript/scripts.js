var StreetHubColors = new Array('DC4632','EDA9A1', '152E42', 'F0B649', 'F3EFEB', 'FFFFFF');
var FancyColors = new Array('FCE473','F68B39', 'ED6C63', '847BB9', '42AFE3', '97CD76');

function draw(element, colors){
  var canvas = document.getElementById(element);

  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
    canvas.height = 68;
    canvas.width = window.innerWidth;
    a = Math.floor(window.innerWidth / 48) + 1;
    b = 2;

    for (var i = 0; i < a; i++) {
      var startX = i * 48;
      availableColors = colors.slice(0);
      for (var j = 0; j < b; j++) {

        var startY = j * 48 + (i%2) * 24;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + 48, startY - 24);
        ctx.lineTo(startX + 48, startY + 24);
        var firstColor = Math.floor(Math.random()*availableColors.length);
        ctx.fillStyle = availableColors[firstColor];
        availableColors.splice(firstColor, 1);
        ctx.fill();

        if (i%2 != 0 && j == 1) {
          startY = -24;
        }
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + 48, startY + 24);
        ctx.lineTo(startX, startY + 48);
        var secondColor = Math.floor(Math.random()*availableColors.length);
        ctx.fillStyle = availableColors[secondColor];
        availableColors.splice(secondColor, 1);
        ctx.fill();

      }
    }
  }
}

function position(trigger, target) {
  if ((window.pageYOffset + 20) > trigger.offsetTop) {
    target.className = 'fixed';
  } else {
    target.className = 'absolute';
  }
}

// document.onreadystatechange = function () {
//   if (document.readyState == 'complete') {
//     draw('top', StreetHubColors);
//     var global = document.getElementById('global');
//     var header = document.getElementById('header');
//     position(global, header);

//     window.onscroll = function (event) {
//       position(global, header);
//     }
//   }
// }

hljs.initHighlightingOnLoad();
