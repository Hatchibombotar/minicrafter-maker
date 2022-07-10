import {Canvas} from "./canvasOperations.js";
import {drawMinicrafter, initCache} from "./drawMinicrafter.js";
import {elementsToPreset, presetToElements} from "./utils.js";

let elementsJSON;

let canvas = new Canvas(document.getElementById("canvas"))
const sharedPreset = JSON.parse(decodeURIComponent(getUrlVars().preset))
let presets = JSON.parse(localStorage.getItem("userPresets")) ?? []

async function init() {
    let response = await fetch("./storage/data/elements.json")
    elementsJSON = await response.json()
    elementsJSON = presetToElements(sharedPreset, elementsJSON)

    await initCache(elementsJSON)
    drawMinicrafter(canvas)
}

init()

document.getElementById("save-preset").onclick = function() {
    presets.push(elementsToPreset(elementsJSON, canvas))
    localStorage.setItem("userPresets", JSON.stringify(presets))
    window.location.href = "./index.html"
}

function getUrlVars() {
    var vars = {}
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value
    })
    return vars
}


document.querySelector(".share-url").innerHTML = document.location.href