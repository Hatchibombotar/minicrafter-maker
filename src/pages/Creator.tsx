import styles from '../App.module.scss'

import { createSignal, Show, For } from "solid-js"

import { Canvas } from "../modules/Canvas.ts";
import { drawMinicrafter, initCache, modifyLayer } from "../drawMinicrafter.js"
import { elementsToPreset, presetToElements, createLocalSignal } from "../modules/utilities.ts"

import { HiSolidSave, HiSolidShare, HiSolidTrash, HiSolidPencilAlt } from 'solid-icons/hi'

import elementsJSON from "../assets/data/elements.ts"
import defaultPresets from "../assets/data/default_presets.ts"

import ColourPicker from "../components/ColourPicker"
import { Minicrafter } from '../components/Minicrafter'

import { useNavigate } from "@solidjs/router"

import { Preset, Colour, ElementList } from '../types';

const canvasElement = <canvas class={styles.primaryCanvas} height="32" width="32" /> as HTMLCanvasElement
const canvas = new Canvas(canvasElement)
const [layerData, setLayerData] = createSignal(elementsJSON)

export function Creator() {
	return <div class={styles.mainPanel}>
		<CustomisePanel />
		<PreviewPanel />
	</div>

}

function CustomisePanel() {
	const [selectedCategory, setCategory] = createSignal()
	return (
		<div class={styles.customisePanel}>
			<h2>Settings</h2>
			<div>
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
					<For each={layerData()}>{(layer: any, layerIndex) =>
						<Show when={selectedCategory() == layer.id && layer.showElements !== false}>
							<For each={layer.elements}>{(part: string) =>
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


											if (currentLayerData.currentlySelected.includes(part)) {
												currentLayerData.currentlySelected = currentLayerData.currentlySelected.filter((element) => element != part)
											} else {
												currentLayerData.currentlySelected.push(part)
											}

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

const [customPresets, setPresets] = createLocalSignal([], "userPresets")

function PreviewPanel() {
	const navigate = useNavigate()

	return (
		<div>
			<h2>Preview</h2>
			<div class={styles.canvasContainer}>
				<Minicrafter canvas={canvas} layerData={layerData} />
				<div>
					<a title="Save">
						<HiSolidSave size={20} onclick={() => {
							setPresets([
								...customPresets(),
								elementsToPreset(layerData(), canvas.canvas)
							])
						}} />
					</a>
					<a title="Share">
						<HiSolidShare size={20} onclick={() => {
							const shareLink = elementsToPreset(layerData())
							navigate(`/share?preset=${encodeURIComponent(JSON.stringify(shareLink))}`, { replace: false })
						}} />
					</a>
				</div>
			</div>
			<Presets />
		</div>
	)
}

function Presets() {
	const [presetsDeletable, makePresetsDeletable] = createSignal(false)
	const toggleDelete = () => makePresetsDeletable(!presetsDeletable())

	return <>
		<div class={styles.presetContainer}>
			<h3>Saved Characters</h3>
			<For each={defaultPresets}>{(preset: Preset) =>
				<div onClick={async () => {
					setLayerData([...presetToElements(preset, layerData())])

					await initCache(layerData())
					drawMinicrafter(canvas)
				}}>
					<img class={styles.presetImage} src={preset.image} alt={preset.name ?? "Minicrafter Preset"} />
				</div>
			}</For>
			<For each={customPresets()}>{(preset: Preset, i) =>
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
					<img class={styles.presetImage} src={preset.image} alt="Custom Saved Minicrafter" />
					<Show when={presetsDeletable()}>
						<img class={styles.presetDeleteIcon} src="./none.png" />
					</Show>
				</div>
			}</For>
		</div>
		<div class={styles.presetButtons}>
			<button type="button" onClick={() => toggleDelete()} title="Edit">
				<HiSolidPencilAlt size={20} />
			</button>
			<Show when={presetsDeletable()}>
				<button type="button" title="Delete All" onClick={() => {
					if (confirm("Are you sure you want to delete all your custom presets?")) setPresets([])
				}}>
					<HiSolidTrash size={20} />
				</button>
			</Show>
		</div>
	</>
}