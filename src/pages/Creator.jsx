import styles from '../App.module.css';

import { createEffect, createSignal } from "solid-js";

import { Canvas } from "../modules/Canvas.js";
import { drawMinicrafter, initCache, modifyLayer } from "../drawMinicrafter.js";
import { elementsToPreset, presetToElements } from "../modules/utilities.js";

import saveIcon from "../assets/icons/ui/save.svg"
import shareIcon from "../assets/icons/ui/share.svg"
import trashIcon from "../assets/icons/ui/trash.svg"
import editIcon from "../assets/icons/ui/pencil-alt.svg"

import elementsJSON from "../assets/data/elements.json"
import defaultPresets from "../assets/data/default_presets.json"

import ColourPicker from "../components/ColourPicker"
import { Minicrafter } from '../components/Minicrafter';

import { useNavigate } from "@solidjs/router"

export function Creator() {
	const canvasElement = <canvas class={styles.primaryCanvas} alt="Minicrafter Image" height="32" width="32"/>
	const canvas = new Canvas(canvasElement)

	const [layerData, setLayerData] = createSignal(elementsJSON)
	return <div class={styles.mainPanel}>
		<CustomisePanel canvas={canvas} layerData={layerData} setLayerData={setLayerData}/>
		<PreviewPanel canvas={canvas} layerData={layerData} setLayerData={setLayerData}/>
	</div>

}

function CustomisePanel({ canvas, layerData, setLayerData }) {
	const [selectedCategory, setCategory] = createSignal()
	return (
		<div class={styles.customisePanel}>
			<h2>Settings</h2>
			<div class="customise-options">
				<div class={styles.categories}>
					<For each={layerData()}>{(layer) =>
						<img
							class={`
                				${styles.categoryImage}
                				${selectedCategory() == layer.id ? styles.categorySelected : undefined}`
							}
							src={`./categories/${layer.id}.png`}
							height="40"
							width="40"
							alt={layer.id}
							onClick={() => setCategory(layer.id)}>
						</img>
					}</For>
				</div>
				<div class={styles.parts}>
					<Show when={!selectedCategory()}>
						<p class={styles.hint}>Press an icon to change how the character looks!</p>
					</Show>
					<For each={layerData()}>{(layer, layerIndex) =>
						<Show when={selectedCategory() == layer.id && layer.showElements !== false}>
							<For each={layer.elements}>{(part) =>
								<img
									classList={{
										[styles.elementSelected]: layerData()[layerIndex()].currentlySelected.includes(part)
									}}
									src={`./preview/${layer.id}/${part}.png`}
									height="50"
									width="50"
									alt={part}
									onClick={async () => {
										const allLayerData = layerData()
										const currentLayerData = allLayerData[layerIndex()]
										if (layer.limitSelections === false) {
											currentLayerData.currentlySelected.push(part)
											if (part == "none") currentLayerData.currentlySelected = [currentLayerData.elements[0]]
											else currentLayerData.currentlySelected = currentLayerData.currentlySelected.filter((element) => element != "none")
										} else {
											currentLayerData.currentlySelected = [part]
										}

										setLayerData([...allLayerData])

										await modifyLayer(layer)
										await drawMinicrafter(canvas)
									}}>
								</img>
							}</For>
						</Show>
					}</For>
				</div>
				<div class={styles.colourContainer}>
					<For each={layerData()}>{(layer) =>
						<Show when={selectedCategory() == layer.id}>
							<For each={layer.defaultColours}>{(colour, i) =>
								<div
									class={styles.colour}
									style={{ background: `rgb(${colour.join(",")})` }}
									onClick={async () => {
										layer.colour = colour
										await modifyLayer(layer)
										await drawMinicrafter(canvas)
									}}>
								</div>

							}</For>
							<ColourPicker
								class={styles.colour}
								onInput={async (colour) => {
									layer.colour = colour
									await modifyLayer(layer)
									await drawMinicrafter(canvas)
								}}>
							</ColourPicker>
						</Show>
					}</For>
				</div>
			</div>
		</div>
	)
}

function PreviewPanel({ canvas, layerData, setLayerData }) {
	const [customPresets, setPresets] = createSignal(JSON.parse(localStorage.getItem("userPresets")) ?? [])
	const navigate = useNavigate()

	return (
		<div class="preview-panel">
			<h2>Preview</h2>
			<div class={styles.canvasContainer}>
				<Minicrafter canvas={canvas} layerData={layerData}/>
				<div>
					<img src={saveIcon} height="20px" width="20px" alt="Save your Minicrafter as a preset" title="Save" onClick={() => {
						setPresets([
							...customPresets(),
							elementsToPreset(layerData(), canvas.canvas)
						])
					}}
					/>
					<img src={shareIcon} height="20px" width="20px" alt="Share your Minicrafter." title="Share" onClick={() => {
						const shareLink = elementsToPreset(layerData())
						navigate(`/share?preset=${encodeURIComponent(JSON.stringify(shareLink))}`, { replace: false })
					}}/>
				</div>
			</div>
			<Presets canvas={canvas} customPresets={customPresets} layerData={layerData} setLayerData={setLayerData} setPresets={setPresets}/>
		</div>
	)
}

function Presets({ canvas, customPresets, layerData, setLayerData, setPresets }) {
	const [presetsDeletable, makePresetsDeletable] = createSignal(false)
	const toggleDelete = () => makePresetsDeletable(!presetsDeletable())

	createEffect(() => {
		localStorage.setItem("userPresets", JSON.stringify(customPresets()))
	})

	return <>
		<div class={styles.presetContainer}>
			<h3>Presets</h3>
			<For each={defaultPresets}>{(preset, i) =>
				<div onClick={async () => {
					setLayerData([...presetToElements(preset, layerData())])

					await initCache(layerData())
					drawMinicrafter(canvas)
				}}>
					<img class={styles.presetImage} src={preset.image} alt={preset.name ?? "Minicrafter Preset"}/>
				</div>
			}</For>
			<For each={customPresets()}>{(preset, i) =>
				<div onClick={async () => {
					if (!presetsDeletable()) {
						setLayerData([...presetToElements(preset, layerData())])

						await initCache(layerData())
						drawMinicrafter(canvas)
					} else {
						const customPresetsNow = customPresets()
						customPresetsNow.splice(i(), 1)
						setPresets([...customPresetsNow])
					}
				}}>
					<img class={styles.presetImage} src={preset.image} alt="Custom Saved Minicrafter"/>
					<Show when={presetsDeletable()}>
						<img class={styles.presetDeleteIcon} src="./none.png"/>
					</Show>
				</div>
			}</For>
		</div>
		<div class={styles.presetButtons}>
			<button type="button" onClick={() => toggleDelete()}>
				<img src={editIcon} height="20px" width="20px" alt="Delete All"/>
			</button>
			<Show when={presetsDeletable()}>
				<button type="button" class="hideable invisible" onClick={() => {
					if (confirm("Are you sure you want to delete all your custom presets?")) setPresets([])
				}}>
					<img src={trashIcon} height="20px" width="20px" alt="Delete All"/>
				</button>
			</Show>
		</div>
	</>
}