var elementsJSON;

var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d');
var sharedPreset = JSON.parse(decodeURIComponent(getUrlVars().preset))
var presets = JSON.parse(localStorage.getItem("userPresets"))

itterations_length = 0

const elementsxobj = new XMLHttpRequest()
elementsxobj.overrideMimeType("application/json")
elementsxobj.open("GET", "./storage/data/elements.json", true)
elementsxobj.onload = function () {
    elementsJSON = JSON.parse(elementsxobj.responseText);
    itterations_length = elementsJSON.length
    for (key of Object.keys(sharedPreset)) {
        var element = sharedPreset[key]
        var index = elementsJSON.findIndex(x => x.id == key)
        elementsJSON[index].currentlySelected = element[0]
        elementsJSON[index].colour = element[1]
    }
    createImage()
}
elementsxobj.send()

itterations = 0
function createImage() {
    if (itterations >= itterations_length) {
        itterations = 0
        return
    }
    if (itterations == 0) {
        itterations = 0
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    }
    element = elementsJSON[itterations]
    for (key of Object.keys(element.parts)) {
        const part = element.parts[key]
        if (part.elements.indexOf(element.currentlySelected) != -1) {
            var path = `./storage/assets/elements/${element.id}/${key}/${element.currentlySelected}.png`
            var image = new Image()
            image.src = path
            if (part.colour) {
                overlayAndColourfy(image, element.colour)
            } else {
                overlay(image)
            }
        }
    }
    setTimeout(
        function () {
            itterations += 1
            createImage();
        }, 10
    )

}

function overlayAndColourfy(image, colourId) {
    var newCanvasLayer = document.createElement('canvas');
    newCanvasLayer.width = 32;
    newCanvasLayer.height = 32;

    var newCanvasLayerCtx = newCanvasLayer.getContext("2d");

    image.onload = function () {
        newCanvasLayerCtx.drawImage(image, 0, 0);
        const imageData = newCanvasLayerCtx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (var i = 0; i < data.length; i += 4) {
            if (data[i + 3] != 0) {
                data[i] = data[i] - (255 - colourId[0]);     // red
                data[i + 1] = data[i + 1] - (255 - colourId[1]); // green
                data[i + 2] = data[i + 2] - (255 - colourId[2]); // blue
            }
        }
        newCanvasLayerCtx.putImageData(imageData, 0, 0);

        overlayCanvas(ctx, newCanvasLayerCtx)
        return
    }
}
function overlay(image) {
    image.onload = function () {
        ctx.drawImage(image, 0, 0);
        return
    }
}

function overlayCanvas(canvas1, canvas2) {
    c1ImgData = canvas1.getImageData(0, 0, canvas.width, canvas.height)
    c2ImgData = canvas2.getImageData(0, 0, canvas.width, canvas.height)
    const c1Data = c1ImgData.data;
    const c2Data = c2ImgData.data;
    for (var i = 0; i < c2Data.length; i += 4) {
        if (c2Data[i + 3]) {
            c1Data[i] = c2Data[i]
            c1Data[i + 1] = c2Data[i + 1]
            c1Data[i + 2] = c2Data[i + 2]
        }
    }
    canvas1.putImageData(c1ImgData, 0, 0);
    return
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function savePreset() {
    currentPreset = {
        "colours": {},
        "elements": {}
    }
    for (element of elementsJSON) {
        currentPreset.colours[element.id] = element.colour
        currentPreset.elements[element.id] = element.currentlySelected
    }
    currentPreset.image = canvas.toDataURL("image/png")
    if (presets != null) {
        presets.push(currentPreset)

    } else {
        presets = [currentPreset]
    }
    localStorage.setItem("userPresets", JSON.stringify(presets))
    window.location.href = "./index.html";
}