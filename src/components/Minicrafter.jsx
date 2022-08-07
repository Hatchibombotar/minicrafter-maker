import { onMount } from "solid-js";
import { drawMinicrafter, initCache } from "../modules/drawMinicrafter.js";

export function Minicrafter({ canvas, layerData }) {
	onMount(async () => {
		await initCache(layerData());
		drawMinicrafter(canvas);
	});

	return canvas.canvas;
}