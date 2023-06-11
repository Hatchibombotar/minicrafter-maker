import { Preset, ElementList } from "../types"

import { Accessor, Setter, createEffect, createSignal } from "solid-js"

/**
 * Turns an elementsJSON into a preset object.
 *
 * @param {Array} elementsJSON The elementsJSON to be changed to a preset.
 * @param {canvas} canvas (Optional) The canvas to generate the icon from.
*/
export function elementsToPreset(elementsJSON: ElementList, canvas: (HTMLCanvasElement | undefined) = undefined ) {
    const currentPreset: Preset = {
        "version": 2,
        "elements": {},
        "image": canvas != undefined ? canvas.toDataURL("image/png") : "./presets/custom.png"
    }
    for (const layer of elementsJSON) {
        currentPreset.elements[layer.id] = [layer.currentlySelected, layer.colour]
    }


    return currentPreset
}

/**
 * Turns a preset object into an elementsJSON array.
 *
 * @param {preset} preset The preset to be applied
 * @param {Array} elementsJSON The elementsJSON to have the preset applied to.
*/
export function presetToElements(preset: Preset, elementsJSON: ElementList): ElementList {
    for (const key of Object.keys(preset.elements)) {
        const elementIndex = elementsJSON.findIndex(x => x.id == key)
        elementsJSON[elementIndex].currentlySelected = preset.elements[key][0]
        elementsJSON[elementIndex].colour = preset.elements[key][1]
    }
    return elementsJSON
}

export function getUrlVars(): { [key: string]: any } {
    var vars = {}
    var values = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (_match, key, value) {
        return vars[key] = value
    })
    return vars
}

export function createLocalSignal(init: any, name: string): [Accessor<any>, Setter<any>] {
    let localState = localStorage.getItem(name);

    const [state, setState] = createSignal(localState ? JSON.parse(localState) : init);
    createEffect(() => localStorage.setItem(name, JSON.stringify(state())));
    return [state, setState];
}