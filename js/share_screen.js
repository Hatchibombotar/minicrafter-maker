let elementsJSON;

let canvas = new Canvas(document.getElementById("canvas"))
var sharedPreset = JSON.parse(decodeURIComponent(getUrlVars().preset))
let presets = JSON.parse(localStorage.getItem("userPresets")) ?? []

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

    canvas.ctx.fillStyle = "#c0cbdc"
    canvas.ctx.fillRect(0, 0, canvas.canvas.width, canvas.canvas.height)
    drawImage()
}
elementsxobj.send()

function getUrlVars() {
    var vars = {}
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value
    })
    return vars
}

function createPresetElement() {
    window.location.href = "./index.html"
    return
}