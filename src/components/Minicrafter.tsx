import { onMount } from "solid-js";
import { drawMinicrafter, initCache } from "../drawMinicrafter.ts";

export function Minicrafter({ canvas, layerData }) {
	onMount(async () => {
		await initCache(layerData());
		drawMinicrafter(canvas);
	});

	return canvas.canvas;
}