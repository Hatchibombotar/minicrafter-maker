let elementsJSON, defaultPresets;
let presets = JSON.parse(localStorage.getItem("userPresets")) ?? []
let canvas = new Canvas(document.getElementById("canvas"))
jscolor.presets.default.format = "rgb"

async function init() {
    let response = await fetch("./storage/data/elements.json")
    elementsJSON = await response.json()

    createSelectionPane()

    await createDefaultPresets()
    createPresetImage()

    canvas.ctx.fillStyle = "#c0cbdc"
    canvas.ctx.fillRect(0, 0, canvas.canvas.width, canvas.canvas.height)
    drawImage()
}

init()

function createSelectionPane() {
    for (element of elementsJSON) {
        const icon = document.createElement("img")
        icon.setAttribute("class", "category-image")
        icon.setAttribute("src", `./storage/assets/categories/${element.id}.png`)
        icon.setAttribute("id", element.id + "Img")
        icon.setAttribute("alt", element.id)
        icon.setAttribute("onclick", `toggleSelectedCategory('${element.id}')`)
        document.getElementById("categories").appendChild(icon)
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

    // Creates the colour selection buttons

    for (const element of elementsJSON) {
        const customColour = document.createElement('button')
        customColour.setAttribute("id", `customColour, Category: ${element.id}`)
        customColour.setAttribute("class", "colour")
        customColour.setAttribute("aria-label", "Custom Colour")
        customColour.style["display"] = `none`

        new JSColor(customColour, { onChange: `selectCustomColour('${element.id}')` })
        
        if (element.defaultColours === undefined) continue
        for (colourIndex in element.defaultColours) {
            const colour = element.defaultColours[colourIndex]
            const colourDiv = document.createElement("div")
            colourDiv.setAttribute("class", "colour")
            colourDiv.setAttribute("id", `Category: ${element.id}, Index: ${colourIndex}`)
            colourDiv.setAttribute("onClick", `setPartColor('${element.id}', ${JSON.stringify(colour)})`)
            colourDiv.style["background-color"] = `rgb(${colour})`
            colourDiv.style["display"] = `none`
            document.getElementById("colours").appendChild(colourDiv)
        }

        document.getElementById("colours").appendChild(customColour)
    }
}

function selectCustomColour(category) {
    const currentColourChannels = document.getElementById(`customColour, Category: ${category}`).jscolor.channels
    setPartColor(category, [currentColourChannels.r, currentColourChannels.g, currentColourChannels.b])
}

function setPartColor(category, colour) {
    categoryIndex = elementsJSON.findIndex(x => x.id == category)
    elementsJSON[categoryIndex].colour = colour
    drawImage()
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
    drawImage()
}

// Everything to do with the preset system

async function createDefaultPresets() {
    let response = await fetch("./storage/data/default_presets.json")
    defaultPresets = await response.json()

    for (i in defaultPresets) {
        const preset = document.createElement("img")
        preset.setAttribute("class", "presetimage")
        preset.setAttribute("src", defaultPresets[i].image)
        preset.setAttribute("onClick", `setDefaultPreset('${i}')`)
        preset.setAttribute("alt", `Custom Preset Image ${defaultPresets[i].name}`)

        document.getElementById("preset_container").appendChild(preset)
    }
}

// creates the custom presets
function createPresetImage() {
    for (i in presets) {
        createPresetElement(presets[i], i)
    }
}

function createPresetElement(preset, presetID) {
    const presetElement = document.createElement("img")
    presetElement.setAttribute("class", "presetimage customPreset")
    presetElement.setAttribute("src", preset.image)
    presetElement.setAttribute("onClick", `setCustomPreset('${presetID}')`)
    presetElement.setAttribute("alt", `Custom Preview Image ${presetID}`)
    document.getElementById("preset_container").appendChild(presetElement)
}

function setDefaultPreset(number) {
    setAsPreset(defaultPresets[number])
}

function setCustomPreset(number) {
    setAsPreset(presets[number])
}

function setAsPreset(preset) {
    for (element of elementsJSON) {
        element.colour = preset.colours[element.id]
        element.currentlySelected = preset.elements[element.id]
    }
    drawImage()
}

function resetPresets() {
    if (confirm("Are you sure you want to delete all your custom presets?")) {
        localStorage.setItem("userPresets", null)
        document.querySelectorAll('.customPreset').forEach(e => e.remove())
    }
}

function deleteLastPreset() {
    presets.pop()
    localStorage.setItem("userPresets", JSON.stringify(presets))
    document.querySelectorAll('.customPreset').forEach(e => e.remove())
    createPresetImage()
}

function togglePresetExtras() {
    for (i of document.getElementsByClassName('hideable')) {
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
    window.location.href = `./share.html?preset=${encodeURIComponent(JSON.stringify(shareLink))}`
}