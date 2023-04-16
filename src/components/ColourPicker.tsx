import { createSignal } from "solid-js";
import styles from '../App.module.scss';

export default function ColourPicker({ onInput }) {
	const [colour, setColour] = createSignal([0, 0, 0])
	let effectTimer: number;

	let picker;

	return <div
		style={{ background: `rgb(${colour().join(",")})` }}
		class={styles.colour}
		onClick={() => {
			picker.click()``
		}}>
		<input
			style={{ opacity: 0, height: "35px", width: "35px" }}
			type="color"
			name="color"
			ref={picker}
			onInput={(e) => {
				// change the format to RGB and then set it as the colour.
				const splitHex = e.currentTarget.value.substring(1).match(/.{1,2}/g);
				setColour([
					parseInt(splitHex[0], 16),
					parseInt(splitHex[1], 16),
					parseInt(splitHex[2], 16)
				])

				clearTimeout(effectTimer)
				effectTimer = setTimeout(() => {
					onInput(colour())
				}, 10);
			}}>
		</input>
	</div>
}