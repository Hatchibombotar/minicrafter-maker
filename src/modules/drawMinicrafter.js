import {Canvas} from "./Canvas.js";

const layerCache = new Map()

/**
 * Draws the character onto a canvas using all of the layers in `layerCache`
 *
 * @param {Canvas} canvas The canvas to draw it on
*/
export async function drawMinicrafter(canvas) {
    const processingCanvas = new Canvas()
    processingCanvas.canvas.width = 32
    processingCanvas.canvas.height = 32

    processingCanvas.ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (const layer of layerCache) {
        const newImageLayer = new Canvas()
        newImageLayer.canvas.width = 32
        newImageLayer.canvas.height = 32

        await newImageLayer.ctx.putImageData(layer[1], 0, 0)

        processingCanvas.layer(newImageLayer)
        await canvas.layer(processingCanvas)
    }

    canvas.clear()
    canvas.layer(processingCanvas)
    return
}

/**
 * Modifies a layer in `layerCache`
 *
 * @param layer The layer being modified, identified by it's `id` property
 * @param {boolean} loadingGIF If the loading gif should display, default `true`
*/
export async function modifyLayer(layer) {

    const processingCanvas = new Canvas()
    processingCanvas.canvas.width = 32
    processingCanvas.canvas.height = 32

    for (const selectedElement of layer.currentlySelected) {
        for (const key of Object.keys(layer.parts)) {
            const part = layer.parts[key]
            if (part.elements.indexOf(selectedElement) != -1) {
                const image = new Image()
                image.src = `./elements/${layer.id}/${key}/${selectedElement}.png`
                if (part.colour) {
                    await processingCanvas.drawImage(image)
                    await processingCanvas.colourfy(layer.colour)
                } else {
                    await processingCanvas.drawImage(image)
                }
            }
        }
    }
    layerCache.set(layer.id, processingCanvas.ctx.getImageData(0, 0, 32, 32))
}

/**
 * Initialise `layerCache`'s layers or sets all at once.
 *
 * @param {Array} elementsJSON The elementsJSON array
*/
export async function initCache(elementsJSON) {
    for (const layer of elementsJSON) {
        await modifyLayer(layer)
    }
}