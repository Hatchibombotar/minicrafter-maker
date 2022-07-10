import { Canvas } from "./canvasOperations.js";
import { drawMinicrafter, initCache, modifyLayer } from "./drawMinicrafter.js";
import { elementsToPreset, presetToElements } from "./utils.js";

let elementsJSON, defaultPresets;
let presets = JSON.parse(localStorage.getItem("userPresets")) ?? []
let canvas = new Canvas(document.getElementById("canvas"))
jscolor.presets.default.format = "rgb"

async function init() {
    // set the canvas to be a placeholder to reduce visual loading speed
    const placeholder = new Image()
    placeholder.src = "./storage/assets/presets/steve.png"
    canvas.drawImage(placeholder)

    let response = await fetch("./storage/data/elements.json")
    elementsJSON = await response.json()

    // Creates the customise panel
    for (const layer of elementsJSON) {
        const categoryIcon = document.createElement("img")
        categoryIcon.setAttribute("class", "category-image")
        categoryIcon.setAttribute("src", `./storage/assets/categories/${layer.id}.png`)
        categoryIcon.setAttribute("id", `category-${layer.id}`)
        categoryIcon.setAttribute("alt", layer.id)
        categoryIcon.setAttribute("width", 40)
        categoryIcon.setAttribute("height", 40)
        categoryIcon.onclick = () => {
            document.getElementById("hint-text").classList.add("invisible")

            document.querySelectorAll(`.category-image`).forEach(el => el.classList.remove("element-selected"))

            document.querySelector(`#category-${layer.id}`).classList.add("element-selected")

            document.querySelectorAll(".part").forEach(el => el.classList.add("invisible"))
            document.querySelectorAll(".colour").forEach(el => el.classList.add("invisible"))

            document.querySelectorAll(`.part-${layer.id}`).forEach(el => el.classList.remove("invisible"))
            document.querySelectorAll(`.colour-${layer.id}`).forEach(el => el.classList.remove("invisible"))
        }
        document.getElementById("categories").appendChild(categoryIcon)
        for (const part of layer.elements) {
            if (layer.showElements === false) continue
            const partIcon = document.createElement("img")
            partIcon.setAttribute("class", `invisible part-${layer.id} part part-name-${part}`)
            partIcon.setAttribute("src", `./storage/assets/preview/${layer.id}/${part}.png`)
            partIcon.setAttribute("width", 50)
            partIcon.setAttribute("height", 50)
            partIcon.setAttribute("alt", part)
            partIcon.onclick = async () => {
                if (layer.limitSelections || layer.limitSelections == undefined) {
                    // single selections
                    if (!partIcon.classList.contains("element-selected")) {
                        // select
                        layer.currentlySelected = [part]
                        document.querySelectorAll(`.part-${layer.id}`).forEach(el => el.classList.remove("element-selected"))
                        partIcon.classList.add("element-selected")
                    } else {
                        // deselect
                        partIcon.classList.remove("element-selected")
                        layer.currentlySelected = [layer.elements[0]]
                    }
                } else {
                    // multiple selections
                    if (!partIcon.classList.contains("element-selected")) {
                        // select
                        layer.currentlySelected.push(part)
                        partIcon.classList.add("element-selected")
                        if (part == "none") {
                            document.querySelectorAll(`.part-${layer.id}`).forEach(el => el.classList.remove("element-selected"))
                            layer.currentlySelected = ["none"]
                        }
                    } else {
                        // deselect
                        layer.currentlySelected = layer.currentlySelected.filter(selectedElement => selectedElement != part)
                        partIcon.classList.remove("element-selected")
                    }
                }
                await modifyLayer(layer)
                drawMinicrafter(canvas)
            }
            document.getElementById("parts").appendChild(partIcon)
        }

        const customColour = document.createElement('button')
        customColour.setAttribute("class", `colour colour-custom invisible colour-${layer.id}`)
        customColour.setAttribute("aria-label", "Custom Colour")

        new JSColor(customColour, {
            onInput: async function () {
                layer.colour = [this.channel("r"), this.channel("g"), this.channel("b")]
                await modifyLayer(layer)
                drawMinicrafter(canvas)
            }
        })

        if (layer.defaultColours === undefined) continue
        for (const colourIndex in layer.defaultColours) {
            const colour = layer.defaultColours[colourIndex]
            const colourDiv = document.createElement("div")
            colourDiv.setAttribute("class", `colour invisible colour-${layer.id}`)
            colourDiv.onclick = async () => {
                layer.colour = colour
                await modifyLayer(layer)
                drawMinicrafter(canvas)
            }
            colourDiv.style["background-color"] = `rgb(${colour})`
            document.getElementById("colour-container").appendChild(colourDiv)
        }

        document.getElementById("colour-container").appendChild(customColour)
    }

    // built-in presets
    let defaultPresetsResponse = await fetch("./storage/data/default_presets.json")
    defaultPresets = await defaultPresetsResponse.json()
    for (const preset of defaultPresets) {
        createPresetElement(preset, true)
    }

    // custom presets
    for (const preset of presets) {
        createPresetElement(preset)
    }
    await initCache(elementsJSON)
    drawMinicrafter(canvas)
    selectElements()
}

init()


let presetsDeletable = false
function createPresetElement(preset, defaultPreset = false) {
    const presetElementContainer = document.createElement("div")
    presetElementContainer.setAttribute("class", "preset-div")
    if (presetsDeletable) presetElementContainer.classList.add("preset-deletable")

    const presetImg = document.createElement("img")
    presetImg.setAttribute("class", "preset-image")
    presetImg.setAttribute("src", preset.image)
    presetImg.setAttribute("alt", `Custom Preset`)
    presetImg.onclick = async (event) => {
        if (!defaultPreset && event.target.parentNode.classList.contains("preset-deletable")) {
            presets.splice(presets.findIndex(x => x == preset), 1)
            localStorage.setItem("userPresets", JSON.stringify(presets))

            document.querySelectorAll('.preset-div.preset-custom').forEach(e => e.remove())
            for (const i of presets) {
                createPresetElement(i)
            }
        } else {
            presetToElements(preset, elementsJSON)
            await initCache(elementsJSON, true)
            drawMinicrafter(canvas)
            selectElements()
        }
    }

    if (!defaultPreset) {
        presetImg.classList.add("preset-custom")
        presetElementContainer.classList.add("preset-custom")
    }

    const deleteButton = document.createElement("img")
    deleteButton.setAttribute("class", "preset-delete")
    deleteButton.setAttribute("src", "../storage/assets/none.png")

    presetElementContainer.appendChild(presetImg)
    presetElementContainer.appendChild(deleteButton)
    document.getElementById("presets-container").appendChild(presetElementContainer)
}

function selectElements() {
    document.querySelectorAll(`.part`).forEach(x => x.classList.remove("element-selected"))
    for (const layer of elementsJSON) {
        if (layer.showElements == false && layer.showElements != undefined) continue
        for (const part of layer.currentlySelected) {
            if (part == "none" && !layer.limitSelections) continue
            const element = document.querySelector(`.part-${layer.id}.part-name-${part}`)
            element.classList.add("element-selected")
        }
    }
}

document.getElementById("presets-reset").onclick = function () {
    if (confirm("Are you sure you want to delete all your custom presets?")) {
        presets = []
        localStorage.setItem("userPresets", null)
        document.querySelectorAll('.preset-div.preset-custom').forEach(e => e.remove())
    }
}

document.getElementById("presets-edit").onclick = function () {
    presetsDeletable = !presetsDeletable
    for (const i of document.getElementsByClassName('hideable')) {
        if (presetsDeletable) i.classList.remove("invisible")
        else i.classList.add("invisible")
    }
    for (const i of document.querySelectorAll('.preset-div.preset-custom')) {
        if (presetsDeletable) i.classList.add("preset-deletable")
        else i.classList.remove("preset-deletable")
    }
}

document.getElementById("button-share").onclick = function () {
    const shareLink = elementsToPreset(elementsJSON)
    window.location.href = `./share.html?preset=${encodeURIComponent(JSON.stringify(shareLink))}`
}

document.getElementById("button-save").onclick = function () {
    presets.push(elementsToPreset(elementsJSON, canvas))
    localStorage.setItem("userPresets", JSON.stringify(presets))
    createPresetElement(presets[presets.length - 1])

    if (presetsDeletable) {
        document.querySelectorAll('.preset-div.preset-custom').forEach(e => e.classList.add("preset-deletable"))
    }
}