import { Preset } from "../../types"
const defaultPresets: Preset[] = [
    {
        "name": "Steve",
        "image": "./presets/steve.png",
        "version": 2,
        "elements": {
            "eyes": [
                ["steve"],
                [ 70, 54, 125 ]
            ],
            "hair": [
                ["steve"],
                [ 37, 25, 11 ]
            ],
            "background": [
                ["plain"],
                [ 192, 203, 220 ]
            ],
            "shirt": [
                ["steve"],
                [ 0, 154, 162 ]
            ],
            "mouth": [
                ["steve"],
                [ 99, 59, 49 ]
            ],
            "trousers": [
                ["steve"],
                [ 59, 50, 155 ]
            ],
            "base": [
                ["steve"],
                [ 181, 137, 117 ]
            ],
            "accessories": [
                ["none"]
            ],
            "shoes": [
                ["default"],
                [ 123, 123, 123 ]
            ]
        }
    },
    {
        "name": "Alex",
        "image": "./presets/alex.png",
        "version": 2,
        "elements": {
            "eyes": [
                ["steve"],
                [ 25, 83, 26 ]
            ],
            "hair": [
                ["alex"],
                [ 229, 142, 64 ]
            ],
            "background": [
                ["plain"],
                [ 192, 203, 220 ]
            ],
            "shirt": [
                ["alex"],
                [ 113, 154, 112 ]
            ],
            "mouth": [
                ["steve"],
                [ 207, 161, 153 ]
            ],
            "trousers": [
                ["steve"],
                [ 84, 57, 38 ]
            ],
            "base": [
                ["alex"],
                [ 219, 198, 169 ]
            ],
            "accessories": [
                ["none"]
            ],
            "shoes": [
                ["default"],
                [ 123, 123, 123 ]
            ]
        }
    }
]

export default defaultPresets