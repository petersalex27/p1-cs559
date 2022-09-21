function getColor(red, green, blue) {
    return "#".concat(red.toString(16).padStart(2, "0"),
        green.toString(16).padStart(2, "0"),
        blue.toString(16).padStart(2, "0"));
}

window.onload = function() {
    // init
    var canvas = document.getElementById("myCanvas");
    var canvas2 = document.getElementById("myCanvas2");
    var depthSlider = document.getElementById("depth");
    var spinSlider = document.getElementById("spin");
    var ampSlider = document.getElementById("amp");
    var periodSlider = document.getElementById("period");
    var context = canvas.getContext("2d");
    var context2 = canvas2.getContext("2d");
    let wOut = 400;
    let hOut = wOut;
    let xOut = 0;
    let yOut = xOut;
    depthSlider.value = depthSlider.max;
    spinSlider.value = spinSlider.min;
    ampSlider.value = 50;
    periodSlider.value = 100;
    // init listener
    depthSlider.addEventListener("input", drawShape);
    spinSlider.addEventListener("input", drawShape);
    ampSlider.addEventListener("input", drawShape);
    periodSlider.addEventListener("input", drawShape);
    // initial draw
    drawShape();

    // definitions
    function drawShape() {
        context.reset();
        context2.reset();
        drawDepth(-4 * depthSlider.value);
        drawWave();

        function drawDepth(howDeep, red = 0x59, green = 0x6b, blue = 0xdf) {
            let i = 0;
            const cRed = red, cGreen = green, cBlue = blue;

            context.beginPath();
            context.rect(0, 0, 400, 400);
            context.fillStyle = getColor(red, green, blue);
            context.fill();

            for ( ; i < howDeep || i === 0; ++i) {
                let c = getColor(red, green, blue);
                drawRect(xOut + Math.floor(i/2), yOut + Math.floor(i/2), wOut - i, hOut - i, c, i);
                red = (i % Math.ceil(400 / cRed)) ? red : red - 1;
                green = (i % Math.ceil(400 / cGreen)) ? green : green - 1;
                blue = (i % Math.ceil(400 / cBlue)) ? blue : blue - 1;
            }
        }

        function drawWave() {
            context2.beginPath();
            for (let i = 0; i < 400; ) {
                context2.ellipse(i, 200, periodSlider.value, ampSlider.value, 0, 0, 180);
                i += periodSlider.value;
                context2.ellipse(i, 200, periodSlider.value, ampSlider.value, 0, 0, 180, true);
                i += periodSlider.value;
            }
            context2.stroke();
        }

        function drawRect(x, y, w, h, col, currDepth) {
            context.beginPath();
            if (spinSlider.value != 0) {
                context.translate(200, 200);
                context.rotate((currDepth + spinSlider.value) * Math.PI / 180);
                context.translate(-200, -200);
            }
            context.rect(x, y, w, h);
            context.fillStyle = col;
            context.fill();
        }
    }
}