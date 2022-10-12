import { createSignal } from "solid-js";
import styles from '../App.module.css';

export default function ColourPicker({ onInput }) {
	let [colour, setColour] = createSignal([0, 0, 0])
	const picker = <input
		style={{ opacity: 0, height: "35px", width: "35px"}}
		type="color"
		name="color"
		onInput={(e) => {
			// change the format to RGB and then set it as the colour.
			const splitHex = e.currentTarget.value.substring(1).match(/.{1,2}/g);
			setColour([
				parseInt(splitHex[0], 16),
				parseInt(splitHex[1], 16),
				parseInt(splitHex[2], 16)
			])
			onInput(colour())
		}}>
	</input>

	return <div
		style={{ background: `rgb(${colour().join(",")})` }}
		class={styles.colour}
		onClick={() => {
			picker.click()
		}}>
		{picker}
	</div>
}