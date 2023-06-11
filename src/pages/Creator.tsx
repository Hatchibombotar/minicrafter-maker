import { createSignal, Show, For } from "solid-js"
import { Canvas } from "../modules/Canvas.ts";
import { useNavigate } from "@solidjs/router"
import { HiSolidSave, HiSolidShare, HiSolidTrash, HiSolidPencilAlt } from 'solid-icons/hi'
import { drawMinicrafter, initCache, modifyLayer } from "../drawMinicrafter.js"
import { elementsToPreset, presetToElements, createLocalSignal } from "../modules/utilities.ts"
import elementsJSON from "../assets/data/elements.ts"
import defaultPresets from "../assets/data/default_presets.ts"
import ColourPicker from "../components/ColourPicker"
import { Minicrafter } from '../components/Minicrafter'
import { Preset, Colour, ElementList } from '../types';

const canvasElement = <canvas class="primaryCanvas" height="32" width="32" /> as HTMLCanvasElement
const canvas = new Canvas(canvasElement)
const [layerData, setLayerData] = createSignal(elementsJSON)

export function Creator() {
	return <>
		<CustomisePanel />
		<PreviewPanel />
	</>
}

function CustomisePanel() {
	const [selectedCategory, setCategory] = createSignal()
	return (
		<div class="box-container px-2">
			<h2 class="text-lg">Edit</h2>
			<div class="flex flex-col items-center justify-center sm:block sm:justify-normal">
				<div class="category-selector">
					<For each={layerData()}>{(layer) =>
						<img
							classList={{
								"outline-2 outline-black outline": selectedCategory() == layer.id
							}}
							src={`./categories/${layer.id}.png`}
							height="40"
							width="40"
							alt={layer.id}
							onclick={() => setCategory(layer.id)}>
						</img>
					}</For>
				</div>
				<div class="parts">
					<Show when={!selectedCategory()}>
						<p class="w-40 mx-auto sm:mx-1 text-center sm:text-left">Press an icon to change how the character looks!</p>
					</Show>
					<For each={layerData()}>{(layer: any, layerIndex) =>
						<Show when={selectedCategory() == layer.id && layer.showElements !== false}>
							<For each={layer.elements}>{(part: string) =>
								<img
									classList={{
										"outline-2 outline-black outline": layerData()[layerIndex()].currentlySelected.includes(part)
									}}
									src={`./preview/${layer.id}/${part}.png`}
									height="50"
									width="50"
									alt={part}
									onclick={async () => {
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
				<div class="colour-container">
					<For each={layerData()}>{(layer) =>
						<Show when={selectedCategory() == layer.id}>
							<For each={layer.defaultColours}>{(colour, i) =>
								<div
									class="colour"
									style={{ background: `rgb(${colour.join(",")})` }}
									onclick={async () => {
										layer.colour = colour
										await modifyLayer(layer)
										await drawMinicrafter(canvas)
									}}>
								</div>

							}</For>
							<ColourPicker
								onInput={async (colour) => {
									layer.colour = colour
									await modifyLayer(layer)
									await drawMinicrafter(canvas)
								}} />
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
		<div class="box-container">
			<h2 class="px-2 text-lg">Preview</h2>
			<div class="canvas-container">
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
		<div class="m-1">
			<h3 class="text-base">Saved Characters</h3>
			<div class="preset-container">
				<For each={defaultPresets}>{(preset: Preset) =>
					<div onclick={async () => {
						setLayerData([...presetToElements(preset, layerData())])

						await initCache(layerData())
						drawMinicrafter(canvas)
					}}>
						<img class="w-8 h-8 cursor-pointer" src={preset.image} alt={preset.name ?? "Minicrafter Preset"} />
					</div>
				}</For>
				<For each={customPresets()}>{(preset: Preset, i) =>
					<div onclick={async () => {
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
						<img class="w-8 h-8 cursor-pointer" src={preset.image} alt="Custom Saved Minicrafter" />
						<Show when={presetsDeletable()}>
							<img class="preset-icon-overlay" src="./none.png" />
						</Show>
					</div>
				}</For>
			</div>
		</div>
		<div class="pl-1">
			<button class="preset-button" type="button" onclick={() => toggleDelete()} title="Edit">
				<HiSolidPencilAlt size={20} />
			</button>
			<Show when={presetsDeletable()}>
				<button class="preset-button" type="button" title="Delete All" onclick={
					() => {
						if (confirm("Are you sure you want to delete all your custom presets?")) setPresets([])
					}
				}>
					<HiSolidTrash size={20} />
				</button>
			</Show>
		</div>
	</>
}