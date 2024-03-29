import { ElementList } from "../../types"

const elements: ElementList = [
    {
        "id": "background",
        "elements": ["plain", "bamboo", "endstone", "terrain", "gold_border", "black_glazed_terracotta"],
        "parts": {
            "coloured": {
                "elements": ["plain", "gold_border"],
                "colour": true
            },
            "plain": {
                "elements": ["bamboo", "endstone", "terrain", "gold_border", "black_glazed_terracotta"],
                "colour": false
            }
        },
        "currentlySelected": ["plain"],
        "colour": [192, 203, 220],
        "defaultColours": [[192, 203, 220], [247, 241, 79], [247, 183, 71], [241, 0, 10], [177, 92, 222], [247, 77, 159], [51, 177, 39], [49, 43, 246]],
        "customColours": true
    },
    {
        "id": "base",
        "elements": ["steve", "alex", "diamond", "slime", "cmd"],
        "parts": {
            "coloured": {
                "elements": ["steve", "alex"],
                "colour": true
            },
            "plain": {
                "elements": ["steve", "alex", "diamond", "slime", "cmd"],
                "colour": false
            }
        },
        "currentlySelected": ["steve"],
        "colour": [181, 137, 117],
        "defaultColours": [[255, 215, 158], [255, 198, 158], [235, 171, 147], [183, 133, 114], [131, 95, 82], [79, 58, 50]]
    },
    {
        "id": "eyes",
        "elements": ["none", "steve", "concerned", "flushed", "alien", "cyclops", "cross_eyes", "dumb", "wide", "big", "low"],
        "parts": {
            "iris": {
                "elements": ["steve", "concerned", "flushed", "alien", "cyclops", "cross_eyes", "dumb", "wide", "big", "low"],
                "colour": true
            },
            "sclera": {
                "elements": ["steve", "concerned", "flushed", "alien", "cyclops", "cross_eyes", "dumb", "wide", "big", "low"],
                "colour": false
            },

            "misc": {
                "elements": ["none", "flushed"],
                "colour": false
            }
        },
        "currentlySelected": ["steve"],
        "colour": [70, 54, 125],
        "defaultColours": [[92, 168, 208], [11, 118, 130], [70, 54, 125], [67, 84, 117], [101, 94, 112], [77, 97, 67], [96, 58, 44]]
    },
    {
        "id": "hair",
        "elements": ["none", "steve", "alex", "cool", "bunch", "pixie_cut", "long_hair", "low", "scruff", "bowl", "fish", "left_long_hair"],
        "parts": {
            "hair": {
                "elements": ["none", "steve", "alex", "cool", "bunch", "pixie_cut", "long_hair", "low", "scruff", "bowl", "fish", "left_long_hair"],
                "colour": true
            }
        },
        "currentlySelected": ["steve"],
        "colour": [37, 25, 11],
        "defaultColours": [[37, 25, 11], [56, 50, 47], [86, 54, 40], [157, 114, 84], [187, 139, 95]]
    },
    {
        "id": "shirt",
        "elements": ["steve", "alex", "tartan", "referee", "bee", "creeper", "suit", "tee", "camo", "circle", "t-shirt"],
        "parts": {
            "coloured": {
                "elements": ["steve", "alex"],
                "colour": true
            },
            "plain": {
                "elements": ["tartan", "referee", "bee", "creeper", "suit", "tee", "camo", "circle", "t-shirt"],
                "colour": false
            }
        },
        "currentlySelected": ["steve"],
        "colour": [0, 154, 162],
        "defaultColours": [[203, 203, 203], [247, 241, 79], [247, 183, 71], [241, 0, 10], [177, 92, 222], [247, 77, 159], [51, 177, 39], [49, 43, 246]]
    },
    {
        "id": "mouth",
        "elements": ["none", "steve", "low", "small", "tounge", "smile", "buck", "suprised", "grin", "braces", "scary"],
        "parts": {
            "coloured": {
                "elements": ["steve", "low", "small", "smile", "buck"],
                "colour": true
            },
            "plain": {
                "elements": ["none", "tounge", "buck", "suprised", "grin", "braces", "scary"],
                "colour": false
            }
        },
        "currentlySelected": ["steve"],
        "colour": [99, 59, 49],
        "defaultColours": [[183, 133, 114], [131, 95, 82], [99, 59, 49], [79, 58, 50]]
    },
    {
        "id": "trousers",
        "elements": ["none", "steve"],
        "parts": {
            "coloured": {
                "elements": ["none", "steve"],
                "colour": true
            }
        },
        "currentlySelected": ["steve"],
        "colour": [59, 50, 155],
        "showElements": false,
        "defaultColours": [[203, 203, 203], [247, 241, 79], [247, 183, 71], [241, 0, 10], [177, 92, 222], [247, 77, 159], [51, 177, 39], [49, 43, 246]]
    },
    {
        "id": "accessories",
        "elements": ["none", "mask", "low_glasses", "bunny_ears", "cool_glasses", "crown"],
        "parts": {
            "plain": {
                "elements": ["none", "mask", "low_glasses", "bunny_ears", "cool_glasses", "crown"],
                "colour": false
            }
        },
        "showElements": true,
        "currentlySelected": ["none"],
        "limitSelections": false,
        "colour": [255, 0, 0],
        "defaultColours": [[203, 203, 203], [247, 241, 79], [247, 183, 71], [241, 0, 10], [177, 92, 222], [247, 77, 159], [51, 177, 39], [49, 43, 246]]
    },
    {
        "id": "shoes",
        "elements": ["default"],
        "parts": {
            "coloured": {
                "elements": ["default"],
                "colour": true
            }
        },
        "showElements": false,
        "currentlySelected": ["default"],
        "colour": [123, 123, 123],
        "defaultColours": [[170, 170, 170], [123, 123, 122], [83, 83, 83]]
    }
]

export default elements