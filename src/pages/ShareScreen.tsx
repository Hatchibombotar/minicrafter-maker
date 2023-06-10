import styles from '../App.scss'

import { createSignal, onMount } from "solid-js"

import { Canvas } from "../modules/Canvas.ts"
import { elementsToPreset, presetToElements, getUrlVars } from "../modules/utilities.ts"

import elementsJSON from "../assets/data/elements.ts"

import { Link, useNavigate } from "@solidjs/router"
import { Minicrafter } from '../components/Minicrafter.jsx'
import { createLocalSignal } from '../modules/utilities.ts'

export function ShareScreen() {
	const canvasElement = <canvas class="primaryCanvas" height="32" width="32"></canvas> as HTMLCanvasElement
	const canvas = new Canvas(canvasElement)
	// const [customPresets, setPresets] = createSignal(JSON.parse(localStorage.getItem("userPresets")) ?? [])
	const [layerData, setLayerData] = createSignal(elementsJSON)
	const navigate = useNavigate()
	const [customPresets, setPresets] = createLocalSignal([], "userPresets")


	onMount(() => {
		if (window.location.href.includes("/share")) {
			const sharedPreset = JSON.parse(decodeURIComponent(getUrlVars().preset))
			setLayerData(presetToElements(sharedPreset, layerData()))
		}
	})

	return <div class="mainPanel">
		<div class="ShareScreen">
			<h2>You have Mail!</h2>
			<div class="canvasContainer">
				<Minicrafter canvas={canvas} layerData={layerData}></Minicrafter>
			</div>
			<div class="presetButtons">
				<button type="button" onClick={() => {
					setPresets([
						...customPresets(),
						elementsToPreset(layerData(), canvas.canvas)
					])
					navigate("/")
				}}>SAVE</button>
				<Link href="/"><button type="button">CANCEL</button></Link>
			</div>
		</div>
	</div>
}