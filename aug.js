var video, canvas, context, imageData, detector, img, prevCorners;

function onSuccess(stream) {
    if (window.webkitURL) {
        vid.src = window.webkitURL.createObjectURL(stream);

    } else {
        vid.src = stream;
    }
}

function onError() {
    alert('An error has occured. :(');
}

var tmpctx, tmpcan;

function init() {

    vid = document.getElementById('output');
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    tmpcan = document.createElement('canvas');
    tmpcan.setAttribute('width', 320);
    tmpcan.setAttribute('height', 240);
    tmpctx = tmpcan.getContext('2d');

    canvas.width = parseInt(canvas.style.width);
    canvas.height = parseInt(canvas.style.height);

    if (navigator.webkitGetUserMedia) {
        navigator.getUserMedia = navigator.webkitGetUserMedia;
    }

    if (navigator.webkitGetUserMedia) {
        
        navigator.webkitGetUserMedia({video: true, audio: false}, onSuccess, onError);
        
        prevCorners = null;
        detector = new AR.Detector();
        requestAnimationFrame(tick);

    }
}

var alt = 0;
function tick() {
    
    if(vid.readyState == vid.HAVE_ENOUGH_DATA) {
        snapshot();
        var markers = detector.detect(imageData);
        handleMarkers(markers);
        //onGUI();
        //drawPicture(markers);
    }
   
    requestAnimationFrame(tick);
}

function snapshot() {
    tmpctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
    imageData = tmpctx.getImageData(0, 0, canvas.width, canvas.height);
}

function drawPicture(markers) {
    if(markers && markers.length !== 0) {
        for (i = 0; i !== markers.length; i++) {
            //skew(img, markers[i].corners);
            corners = markers[i].corners;
            console.log(context);
            context.fillStyle = 'blue';
            context.font = 'bold 16px Arial';
            context.fillText('0', corners[0].x, corners[0].y);
            context.fillText('1', corners[1].x, corners[1].y);
            context.fillText('2', corners[2].x, corners[2].y);
            context.fillText('3', corners[3].x, corners[3].y);
        }
    }
    else if (prevCorners) {
        skew(img, prevCorners);
    }
}