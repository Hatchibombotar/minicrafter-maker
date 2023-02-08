import styles from '../App.module.scss'

import { createSignal, onMount } from "solid-js"

import { Canvas } from "../modules/Canvas.js"
import { elementsToPreset, presetToElements, getUrlVars } from "../modules/utilities.js"

import elementsJSON from "../assets/data/elements.json"

import { Link, useNavigate } from "@solidjs/router"
import { Minicrafter } from '../components/Minicrafter'

export function ShareScreen() {
	const canvasElement = <canvas class={styles.primaryCanvas} alt="Minicrafter Image" height="32" width="32"></canvas>
	const canvas = new Canvas(canvasElement)
	const [customPresets, setPresets] = createSignal(JSON.parse(localStorage.getItem("userPresets")) ?? [])
	const [layerData, setLayerData] = createSignal(elementsJSON)
	const navigate = useNavigate()

	onMount(() => {
		if (window.location.href.includes("/share")) {
			const sharedPreset = JSON.parse(decodeURIComponent(getUrlVars().preset))
			setLayerData(presetToElements(sharedPreset, layerData()))
		}
	})

	return <div class={styles.mainPanel}>
		<div class={styles.ShareScreen}>
			<h2>You have Mail!</h2>
			<div class={styles.canvasContainer}>
				<Minicrafter canvas={canvas} layerData={layerData}></Minicrafter>
			</div>
			<div class={styles.presetButtons}>
				<button type="button" onClick={() => {
					setPresets([
						...customPresets(),
						elementsToPreset(layerData(), canvas.canvas)
					])
					localStorage.setItem("userPresets", JSON.stringify(customPresets()))
					navigate("/")
				}}>SAVE</button>
				<Link href="/"><button type="button">CANCEL</button></Link>
			</div>
		</div>
	</div>
}