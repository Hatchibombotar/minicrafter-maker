var elementsJSON, defaultPresets;
var presets = JSON.parse(localStorage.getItem("userPresets"))


itterations_length = 0

jscolor.presets.default = {
    format: 'rgb'
};

const elementsxobj = new XMLHttpRequest()
elementsxobj.overrideMimeType("application/json")
elementsxobj.open("GET", "./storage/data/elements.json", true)
elementsxobj.onload = function () {
    elementsJSON = JSON.parse(elementsxobj.responseText);
    itterations_length = elementsJSON.length
    createCanvas()
    createSelectionPane()
    createColours()
    createCustomColours()
    createImage()
    setTimeout(
        function () {
            itterations += 1
            createImage();
        }, 1000
    )
}
elementsxobj.send()

const defaultPresets_xobj = new XMLHttpRequest()
defaultPresets_xobj.overrideMimeType("application/json")
defaultPresets_xobj.open("GET", "./storage/data/default_presets.json", true)
defaultPresets_xobj.onload = function () {
    defaultPresets = JSON.parse(defaultPresets_xobj.responseText);
    for (i in defaultPresets) {
        const preset = document.createElement("img")
        preset.setAttribute("class", "presetimage")
        preset.setAttribute("src", defaultPresets[i].image)
        preset.setAttribute("onClick", `setDefaultPreset('${i}')`)
        preset.setAttribute("alt", `Custom Preset Image ${defaultPresets[i].name}`)
        document.getElementById("preset_container").appendChild(preset)
    }
    createPresetImage()
}
defaultPresets_xobj.send()

function createCanvas() {
    for (element of elementsJSON) {
        for (part of Object.keys(element.parts)) {
            const canvas = document.createElement("canvas")
            canvas.setAttribute("class", "canvas")
            canvas.setAttribute("id", `${element.id}.${part}`)
            canvas.setAttribute("width", 32)
            canvas.setAttribute("height", 32)
            document.getElementById("canvasContainer").appendChild(canvas)
        }
    }
}

function createSelectionPane() {
    for (element of elementsJSON) {
        const icon = document.createElement("img")
        icon.setAttribute("class", "category-image")
        icon.setAttribute("src", `./storage/assets/categories/${element.id}.png`)
        icon.setAttribute("id", element.id + "Img")
        icon.setAttribute("alt", element.id)
        icon.setAttribute("onclick", `toggleSelectedCategory('${element.id}')`)
        document.getElementById("category").appendChild(icon)
        for (part of element.elements) {
            if (element.showElements === false) continue
            const partIcon = document.createElement("img")
            partIcon.setAttribute("class", "category-image invisible")
            partIcon.setAttribute("src", `./storage/assets/preview/${element.id}/${part}.png`)
            partIcon.setAttribute("id", `Element: ${element.id}, Part: ${part}`)
            partIcon.setAttribute("alt", part)
            partIcon.setAttribute("onclick", `selectElement('${element.id}','${part}')`)
            document.getElementById("parts").appendChild(partIcon)
        }
    }
}
function createColours() {
    for (element of elementsJSON) {
        if (element.defaultColours === undefined) return
        for (colourIndex in element.defaultColours) {
            const colour = element.defaultColours[colourIndex]
            const colourDiv = document.createElement("div")
            colourDiv.setAttribute("class", "colour")
            colourDiv.setAttribute("id", `Category: ${element.id}, Index: ${colourIndex}`)
            colourDiv.setAttribute("onClick", `selectColour('${element.id}', '${colourIndex}')`)
            colourDiv.style["background-color"] = `rgb(${colour[0]}, ${colour[1]}, ${colour[2]})`
            colourDiv.style["display"] = `none`
            document.getElementById("colours").appendChild(colourDiv)
        }

    }
}
function createCustomColours() {
    for (element of elementsJSON) {
        var button = document.createElement('button');
        button.setAttribute("id", `customColour, Category: ${element.id}`)
        button.setAttribute("class", "colour")
        button.setAttribute("aria-label", "Custom Colour")
        button.style["display"] = `none`
        // button.setAttribute("data-jscolor", `{"onChange: 'selectCustomColour(${element.id})'"}`)

        var options = { onChange: `selectCustomColour('${element.id}')` };

        new JSColor(button, options); // 'JSColor' is an alias to 'jscolor'

        document.querySelector('#colours').appendChild(button);
    }
}

function selectCustomColour(category) {
    let currentColourChannels = document.getElementById(`customColour, Category: ${category}`).jscolor.channels //customColour, Category: background
    elementIndex = elementsJSON.findIndex(x => x.id == category)
    elementsJSON[elementIndex].colour = [currentColourChannels.r, currentColourChannels.g, currentColourChannels.b]
    createImage()
}

function selectColour(id, index) {
    elementIndex = elementsJSON.findIndex(x => x.id == id)
    elementsJSON[elementIndex].colour = elementsJSON[elementIndex].defaultColours[index]
    createImage()
}


function toggleSelectedCategory(selectedCategory) {
    for (element of elementsJSON) {
        for (part of element.elements) {
            if (element.showElements === false) continue
            const thing = document.getElementById(`Element: ${element.id}, Part: ${part}`)
            if (element.id != selectedCategory) {
                thing.classList.add("invisible")
            } else {
                thing.classList.remove("invisible")
            }
        }
        for (colourIndex in element.defaultColours) {
            if (element.defaultColours === undefined) continue
            const thing = document.getElementById(`Category: ${element.id}, Index: ${colourIndex}`)
            if (element.id != selectedCategory) {
                // thing.classList.add("invisible")
                thing.style.display = "none"
            } else {
                thing.style.display = ""
            }
        }
        if (element.id != selectedCategory) {
            document.getElementById(`customColour, Category: ${element.id}`).style.display = "none"
        } else {
            document.getElementById(`customColour, Category: ${element.id}`).style.display = ""
        }
    }
    document.getElementById("hint-text").classList.add("invisible")
}

function selectElement(category, element) {
    elementIndex = elementsJSON.findIndex(x => x.id == category)
    elementsJSON[elementIndex].currentlySelected = element
    createImage()
}

itterations = 0


function createImage() {
    for (const element of elementsJSON) {
        for (const part of Object.keys(element.parts)) {
            if (element.parts[part].elements.indexOf(element.currentlySelected) != -1) {
                const path = `./storage/assets/elements/${element.id}/${part}/${element.currentlySelected}.png`
                const image = new Image()
                image.src = path
                const canvasCtx = document.getElementById(`${element.id}.${part}`).getContext("2d")
                image.onload = function () {
                    canvasCtx.clearRect(0, 0, 32, 32);
                    canvasCtx.drawImage(image, 0, 0);
                    if (element.parts[part].colour === true) {
                        const colourId = element.colour

                        const imageData = canvasCtx.getImageData(0, 0, 32, 32);
                        const data = imageData.data;
                        for (var i = 0; i < data.length; i += 4) {
                            if (data[i + 3] != 0) {
                                data[i] = data[i] - (255 - colourId[0]);     // red
                                data[i + 1] = data[i + 1] - (255 - colourId[1]); // green
                                data[i + 2] = data[i + 2] - (255 - colourId[2]); // blue
                            }
                        }
                        canvasCtx.putImageData(imageData, 0, 0);
                    }
                }
            } else {
                document.getElementById(`${element.id}.${part}`).getContext("2d").clearRect(0, 0, 32, 32);
            }
        }
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

// Everything to do with the preset system

function createPresetImage() {
    for (i in presets) {
        const preset = document.createElement("img")
        preset.setAttribute("class", "presetimage customPreset")
        preset.setAttribute("src", presets[i].image)
        preset.setAttribute("onClick", `setCustomPreset('${i}')`)
        preset.setAttribute("alt", `Custom Preview Image ${i}`)
        document.getElementById("preset_container").appendChild(preset)
    }
}

function setDefaultPreset(number) {
    const preset = defaultPresets[number]
    for (element of elementsJSON) {
        element.colour = preset.colours[element.id]
        element.currentlySelected = preset.elements[element.id]
    }
    createImage()
}

function setCustomPreset(number) {
    const preset = presets[number]
    for (element of elementsJSON) {
        element.colour = preset.colours[element.id]
        element.currentlySelected = preset.elements[element.id]
    }
    createImage()
}

function createPreset() {
    currentPreset = {
        "colours": {},
        "elements": {}
    }
    for (element of elementsJSON) {
        currentPreset.colours[element.id] = element.colour
        currentPreset.elements[element.id] = element.currentlySelected
    }
    currentPreset.image = "./storage/assets/presets/custom.png"
    // const currentCanvass = document.getElementsByClassName("canvas")
    // const displayCanvas = document.createElement("canvas")
    // for (currentCanvas of currentCanvass) {
    //     const layerImage = new Image()
    //     layerImage.src = currentCanvas.toDataURL("image/png")
    //     layerImage.onload = function () {
    //         displayCanvas.getContext("2d").drawImage(layerImage, 0, 0)
    //     }
    //     overlayCanvas(currentCanvas.getContext("2d"), displayCanvas.getContext("2d"))
    // }
    // currentPreset.image = displayCanvas.toDataURL("image/png")

    if (presets != null) {
        presets.push(currentPreset)

    } else {
        presets = [currentPreset]
    }
    localStorage.setItem("userPresets", JSON.stringify(presets))

    var preset_image = document.createElement("img")
    preset_image.setAttribute("class", "presetimage customPreset")
    preset_image.setAttribute("src", currentPreset.image)
    preset_image.setAttribute("onClick", `setCustomPreset('${presets.length - 1}')`)
    document.getElementById("preset_container").appendChild(preset_image)
}


function resetPresets() {
    if (confirm("Are you sure you want to delete all your custom presets?")) {
        localStorage.setItem("userPresets", null)
        document.querySelectorAll('.customPreset').forEach(e => e.remove());
    }
}

function deleteLastPreset() {
    presets.pop()
    localStorage.setItem("userPresets", JSON.stringify(presets))
    document.querySelectorAll('.customPreset').forEach(e => e.remove());
    createPresetImage()
}

function togglePresetExtras() {
    for (i of document.querySelectorAll('.hideable')) {
        if (!i.classList.contains("invisible")) {
            i.classList.add("invisible")
        } else {
            i.classList.remove("invisible")
        }
    }
}

function shareLink() {
    const shareLink = {}
    for (element of elementsJSON) {
        shareLink[element.id] = [element.currentlySelected, element.colour]
    }
    window.location.href = `./share.html?preset=${encodeURIComponent(JSON.stringify(shareLink))}`;
}