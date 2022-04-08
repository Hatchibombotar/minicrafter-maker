const config = {
    height: 32,
    width: 32
}

async function drawImage() {
    document.getElementById("loading").style.display = ""

    const processingCanvas = new Canvas()
    processingCanvas.canvas.width = config.width
    processingCanvas.canvas.height = config.height

    processingCanvas.ctx.fillRect(0, 0, config.width, config.height)

    for (let i = 0; i < elementsJSON.length; i++) {
        const element = elementsJSON[i]
        for (const key of Object.keys(element.parts)) {
            const part = element.parts[key]
            if (part.elements.indexOf(element.currentlySelected) != -1) {
                const image = new Image()
                image.src = `./storage/assets/elements/${element.id}/${key}/${element.currentlySelected}.png`
                if (part.colour) {
                    const newImageLayer = new Canvas()

                    await newImageLayer.drawImage(image)
                    await newImageLayer.colourfy(element.colour)
                    await processingCanvas.layer(newImageLayer)
                } else {
                    await processingCanvas.drawImage(image)
                }
            }
        }
    }

    canvas.layer(processingCanvas)

    document.getElementById("loading").style.display = "none"
    return
}

// creates a new preset from the canvas
function createPreset() {
    currentPreset = {
        "colours": {},
        "elements": {}
    }
    for (element of elementsJSON) {
        currentPreset.colours[element.id] = element.colour
        currentPreset.elements[element.id] = element.currentlySelected
    }
    currentPreset.image = canvas.canvas.toDataURL("image/png")
    presets.push(currentPreset)
    localStorage.setItem("userPresets", JSON.stringify(presets))

    createPresetElement(currentPreset, presets.length - 1)
}

