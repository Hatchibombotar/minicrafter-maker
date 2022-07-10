/**
 * Turns an elementsJSON into a preset object.
 *
 * @param {Array} elementsJSON The elementsJSON to be changed to a preset.
 * @param {canvas} canvas (Optional) The canvas to generate the icon from.
*/
export function elementsToPreset(elementsJSON, canvas = undefined) {
    const currentPreset = {
        "version": 2,
        "elements": {}
    }
    for (const layer of elementsJSON) {
        currentPreset.elements[layer.id] = [layer.currentlySelected, layer.colour]
    }

    if (canvas) currentPreset.image = canvas.canvas.toDataURL("image/png")
    
    return currentPreset
}

/**
 * Turns a preset object into an elementsJSON array.
 *
 * @param {preset} preset The preset to be applied
 * @param {Array} elementsJSON The elementsJSON to have the preset applied to.
*/
export function presetToElements(preset, elementsJSON) {
    const updatedPreset = upgradePresetFormat(preset)
    for (const key of Object.keys(updatedPreset.elements)) {
        const elementIndex = elementsJSON.findIndex(x => x.id == key)
        elementsJSON[elementIndex].currentlySelected = updatedPreset.elements[key][0]
        elementsJSON[elementIndex].colour = updatedPreset.elements[key][1]
    }
    return elementsJSON
}

/**
 * Ensures a preset is the latest format
 *
 * @param {preset} preset The preset to be updated
*/
export function upgradePresetFormat(oldFormat) {
    const oldVersion = oldFormat.version ?? 1
    if (oldVersion == 1) {
        const newFormat = {
            "name": oldFormat.name,
            "image": oldFormat.image,
            "version": 2,
            "elements": {}
        }

        for (const key of Object.keys(oldFormat.elements)) {
            newFormat.elements[key] = [
                [oldFormat.elements[key]],
                oldFormat.colours[key]
            ]
        }
        return newFormat
    } else {
        return oldFormat
    }
}