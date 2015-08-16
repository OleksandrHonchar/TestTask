// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var screenWidth = 960;
var screenHeight = 536;
var imgNames = [];
var images = [];
var canvas, context, btn, upperLine, lowerLine, resultIndex, timeoutId, imageValue, symImage, state, selectionBox;

getJSON('js/data.json', function (data) {
    // Javascript function JSON.parse to parse JSON data
    var jsonObj = JSON.parse(data);

    for (var k = 0; k < jsonObj.symbolName.length; k++) {
        imgNames [k] = jsonObj.symbolName[k].filename;
    }
    var imagesLocation = jsonObj.path;
    var i = 0;
    imgNames.forEach(function (img) {
        var image = new Image();

        image.onload = function () {
            i++;
            if (i === imgNames.length) {
                init();
            }
        };

        image.src = imagesLocation + img;
        images.push(image);
    });
});

createDOMElements();

function createDOMElements() {
    canvas = document.createElement('canvas');
    btn = document.createElement('button');
    upperLine = document.createElement('div');
    lowerLine = document.createElement('div');

    canvas.width = screenWidth;
    canvas.height = screenHeight;
    context = canvas.getContext('2d');
    btn.addEventListener('click', startSpin, false);

    document.body.appendChild(canvas);
    document.body.appendChild(btn);
    document.body.appendChild(upperLine);
    document.body.appendChild(lowerLine);

    lowerLine.id = 'lowerLine';
    upperLine.id = 'upperLine';
    lowerLine.className = 'line';
    upperLine.className = 'line';
}


function draw() {
    context.clearRect(0, 0, screenWidth, screenHeight);
    context.drawImage(symImage, 78, 195, 215, 142);

    if (state === 'win') {
        context.font = "bold 44px Arial";
        context.fillText('You Win!', 326, 283);
    } else if (state === 'noWin') {
        context.font = "bold 44px Arial";
        context.fillText('Try Again', 326, 283);
    }
}

function animate() {
    requestAnimationFrame(animate);
    draw();
}

function init() {
    selectionBox = document.getElementById('selectionBox');
    symImage = images[0];
    animate();
}

function updateImages() {
    resultIndex = Math.round(Math.random() * (images.length - 1));
    symImage = images[resultIndex];
    timeoutId = setTimeout(updateImages, 200);
}

function stopSpin() {

    clearTimeout(timeoutId);
    showResult();
    btn.style.background = 'url("resources/BTN_Spin.png")';
    btn.removeAttribute('disabled');
    selectionBox.removeAttribute('disabled');
}

function startSpin() {
    state = 'spinning';
    updateImages();
    btn.style.background = 'url("resources/BTN_Spin_d.png")';
    btn.setAttribute('disabled', 'true');
    selectionBox.setAttribute('disabled', 'true');
    setTimeout(stopSpin, 4000);
}


function showResult() {
    imageValue = selectionBox.options[selectionBox.selectedIndex].value;
    if (imageValue == resultIndex) {
        state = 'win';
    } else {
        state = 'noWin';
    }
}
