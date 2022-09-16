const Loc = {
    LEFT : 0,
    UP : 0,
    RIGHT : 1,
    DOWN : 1
}

window.onload = function() {
    // init
    var canvas = document.getElementById("myCanvas");
    var depthSlider = document.getElementById("depth");
    var context = canvas.getContext("2d");
    let wOut = 400;
    let hOut = wOut;
    let xOut = 0;
    let yOut = xOut;
    depthSlider.value = 0;
    // init listener
    depthSlider.addEventListener("input", drawShape);
    // initial draw
    drawShape();

    // definitions
    function drawShape() {
        let wInner = 400 + (4 * depthSlider.value);
        let hInner = 400 + (4 * depthSlider.value);
        let xInner = -(2 * depthSlider.value);
        let yInner = -(2 * depthSlider.value);
        for (var i = 0, colr = 0x59, colg = 0x6b, colb = 0xdf; i < wOut; ++i) {
            draw(xOut + Math.floor(i/2), yOut + Math.floor(i/2), wOut - i, hOut - i,
                 "#".concat(colr.toString(16).padStart(2, "0"),
                            colg.toString(16).padStart(2, "0"),
                            colb.toString(16).padStart(2, "0")));
            colr = (i % Math.ceil(400 / 0x59)) ? colr : colr - 1;
            colg = (i % Math.ceil(400 / 0x6b)) ? colg : colg - 1;
            colb = (i % Math.ceil(400 / 0xdf)) ? colb : colb - 1;// = (0 === i % 5) ? colb - 3 : colb - 1;
        }
        draw(xInner, yInner, wInner, hInner, "#16223f");


        function draw(x, y, w, h, col) {
            //context.reset();
            context.beginPath();
            context.rect(x, y, w, h);
            context.fillStyle = col;
            context.fill();
        }

        function drawLines(x, baseCol) {
            // top
            for (var i = 0; i < x; ++i) {
                context.beginPath();
                context.moveTo(0, 0);
                context.lineTo(i, i);
            }

            // top right
            context.moveTo(400, 0);
            context.lineTo(400 - x, y);
            // bottom left
            context.moveTo(0, 400);
            context.lineTo(x, 400 - y);
            // bottom right
            context.moveTo(400, 400);
            context.lineTo(400 - x, 400 - y);
            context.stroke();
        }

        function computeCol(r, g, b, loc) {

        }
    }
}