var eyes = []
var hair = []
var bg = []
var shirt = []
var mouth = []
var trousers = []
var base = []
var accessories = []
var elementsJSON = []

var eyesEntry = 2
var hairEntry = 2
var bgEntry = 1
var shirtEntry = 1
var mouthEntry = 2
var trousersEntry = 2
var baseEntry = 1
var accessoriesEntry = 1

var processStarted = 0


const elementsxobj = new XMLHttpRequest()
elementsxobj.overrideMimeType("application/json")
elementsxobj.open("GET", "./storage/data/elements.json", true)
elementsxobj.onload = function () {
    elementsJSON = JSON.parse(elementsxobj.responseText);
    for (i of elementsJSON) {
        if (i.id == "eyes") { eyes = i.elements }
        else if (i.id == "hair") { hair = i.elements }
        else if (i.id == "bg") { bg = i.elements }
        else if (i.id == "shirt") { shirt = i.elements }
        else if (i.id == "mouth") { mouth = i.elements }
        else if (i.id == "trousers") { trousers = i.elements }
        else if (i.id == "base") { base = i.elements }
        else if (i.id == "accessories") { accessories = i.elements }
    }
    createImage()
    processStarted = 0
}
elementsxobj.send()

function changeEyes(direction) {
    if (direction == "left") {
        eyesEntry = eyesEntry - 1
    } else {
        eyesEntry = eyesEntry + 1
    }
    fixScores()
    createImage()
}

function changeHair(direction) {
    if (direction == "left") {
        hairEntry = hairEntry - 1
    } else {
        hairEntry = hairEntry + 1
    }
    fixScores()
    createImage()
}
function changeBg(direction) {
    if (direction == "left") {
        bgEntry = bgEntry - 1
    } else {
        bgEntry = bgEntry + 1
    }
    fixScores()
    createImage()
}
function changeShirt(direction) {
    if (direction == "left") {
        shirtEntry = shirtEntry - 1
    } else {
        shirtEntry = shirtEntry + 1
    }
    fixScores()
    createImage()
}
function changeMouth(direction) {
    if (direction == "left") {
        mouthEntry = mouthEntry - 1
    } else {
        mouthEntry = mouthEntry + 1
    }
    fixScores()
    createImage()
}
function changeTrousers(direction) {
    if (direction == "left") {
        trousersEntry = trousersEntry - 1
    } else {
        trousersEntry = trousersEntry + 1
    }
    fixScores()
    createImage()
}
function changeBase(direction) {
    if (direction == "left") {
        baseEntry = baseEntry - 1
    } else {
        baseEntry = baseEntry + 1
    }
    fixScores()
    createImage()
}
function changeAccessories(direction) {
    if (direction == "left") {
        accessoriesEntry = accessoriesEntry - 1
    } else {
        accessoriesEntry = accessoriesEntry + 1
    }
    fixScores()
    createImage()
}

function createImage() {
    if (processStarted == 0) {
        processStarted = 1

        var overlayBg = new Image();
        overlayBg.src = `./storage/assets/elements/backgrounds/${bg[bgEntry - 1]}.png`;

        var overlayBgPlain = new Image();
        overlayBgPlain.src = `./storage/assets/elements/backgroundsPlain/${bg[bgEntry - 1]}.png`;

        var overlayEyes = new Image();
        overlayEyes.src = `./storage/assets/elements/eyes/${eyes[eyesEntry - 1]}.png`;

        var overlayIris = new Image();
        overlayIris.src = `./storage/assets/elements/eyes_iris/${eyes[eyesEntry - 1]}.png`;

        var overlaySclera = new Image();
        overlaySclera.src = `./storage/assets/elements/eyes_sclera/${eyes[eyesEntry - 1]}.png`;

        var overlayHair = new Image();
        overlayHair.src = `./storage/assets/elements/hair/${hair[hairEntry - 1]}.png`;

        var overlayBase = new Image();
        overlayBase.src = `./storage/assets/elements/base/${base[baseEntry - 1]}.png`;

        var overlayBaseOutline = new Image();
        overlayBaseOutline.src = `./storage/assets/elements/base_plain/${base[baseEntry - 1]}.png`;

        var overlayShirtPlain = new Image();
        overlayShirtPlain.src = `./storage/assets/elements/shirts_plain/${shirt[shirtEntry - 1]}.png`;

        var overlayShirt = new Image();
        overlayShirt.src = `./storage/assets/elements/shirts/${shirt[shirtEntry - 1]}.png`;

        var overlayMouth = new Image();
        overlayMouth.src = `./storage/assets/elements/mouths/${mouth[mouthEntry - 1]}.png`;

        var overlayMouthPlain = new Image();
        overlayMouthPlain.src = `./storage/assets/elements/mouths_plain/${mouth[mouthEntry - 1]}.png`;

        var overlayTrousers = new Image();
        overlayTrousers.src = `./storage/assets/elements/trousers/${trousers[trousersEntry - 1]}.png`;

        var overlayShoe = new Image();
        overlayShoe.src = `./storage/assets/elements/shoes/default.png`;

        var overlayAccessories = new Image();
        overlayAccessories.src = `./storage/assets/elements/accessories/${accessories[accessoriesEntry - 1]}.png`;

        Caman("#caman-image", function () {
            this.newLayer(function () {
                this.overlayImage(overlayBg);
                this.filter.colorize_bg(255, 0, 255, 100);

            });
            this.newLayer(function () {
                this.overlayImage(overlayBgPlain);
            });
            this.newLayer(function () {
                this.overlayImage(overlayBase);
                this.filter.colorize_base(255, 0, 255, 85)
            });
            this.newLayer(function () {
                this.overlayImage(overlayBaseOutline);
            });
            this.newLayer(function () {
                this.overlayImage(overlayIris);
                this.filter.colorize_iris(255, 0, 255, 85)
            });
            this.newLayer(function () {
                this.overlayImage(overlaySclera);
                this.filter.colorize_sclera(255, 0, 255, 85)
            });
            this.newLayer(function () {
                this.overlayImage(overlayEyes);
            });
            this.newLayer(function () {
                this.overlayImage(overlayHair);
                this.filter.colorize_hair(255, 0, 255, 100);
            });
            this.newLayer(function () {
                this.overlayImage(overlayShirt);
                this.filter.colorize_shirt(255, 0, 255, 85)
            });
            this.newLayer(function () {
                this.overlayImage(overlayShirtPlain);
            });
            this.newLayer(function () {
                this.overlayImage(overlayMouth);
                this.filter.colorize_mouth(255, 0, 255, 85)
            });
            this.newLayer(function () {
                this.overlayImage(overlayMouthPlain);
            });
            this.newLayer(function () {
                this.overlayImage(overlayTrousers);
                this.filter.colorize_trousers(255, 0, 255, 85)
            });
            this.newLayer(function () {
                this.overlayImage(overlayShoe);
                this.filter.colorize_shoes(255, 0, 255, 85)
            });
            this.newLayer(function () {
                this.overlayImage(overlayAccessories);
            });
            this.render();

        });
        c = Caman("#caman-image");
        Caman.Event.listen(c, "renderFinished", function () {
            processStarted = 0
        });
    } else {
        console.log("Process already started.")
    }
}


// setTimeout(
//     createImage, 500
// );


function fixScores() {
    //eyes
    if (eyesEntry == (eyes.length + 1)) {
        eyesEntry = 1
    } else if (eyesEntry <= 0) {
        eyesEntry = eyes.length
    };
    //hair
    if (hairEntry == (hair.length + 1)) {
        hairEntry = 1
    } else if (hairEntry <= 0) {
        hairEntry = hair.length
    };
    //bg
    if (bgEntry == (bg.length + 1)) {
        bgEntry = 1
    } else if (bgEntry <= 0) {
        bgEntry = bg.length
    };
    //shirt
    if (shirtEntry == (shirt.length + 1)) {
        shirtEntry = 1
    } else if (shirtEntry <= 0) {
        shirtEntry = shirt.length
    };
    //mouth
    if (mouthEntry == (mouth.length + 1)) {
        mouthEntry = 1
    } else if (mouthEntry <= 0) {
        mouthEntry = mouth.length
    };
    //trousers
    if (trousersEntry == (trousers.length + 1)) {
        trousersEntry = 1
    } else if (trousersEntry <= 0) {
        trousersEntry = trousers.length
    };
    //base
    if (baseEntry == (base.length + 1)) {
        baseEntry = 1
    } else if (baseEntry <= 0) {
        baseEntry = base.length
    };
    //accessories
    if (accessoriesEntry == (accessories.length + 1)) {
        accessoriesEntry = 1
    } else if (accessoriesEntry <= 0) {
        accessoriesEntry = accessories.length
    };
}

Caman.Filter.register("colorize_hair", function () {
    var color_array = document.getElementById("colorHair").value.replace("rgb(", "").replace(")", "").split(",")
    this.process("colorize_hair", function (rgba) {
        if (rgba.a > 0) {
            rgba.r = rgba.r - (255 - color_array[0])
            rgba.g = rgba.g - (255 - color_array[1])
            rgba.b = rgba.b - (255 - color_array[2])
        }
        return rgba;
    });
});

Caman.Filter.register("colorize_bg", function () {
    var color_array = document.getElementById("colorBackground").value.replace("rgb(", "").replace(")", "").split(",")
    this.process("colorize_bg", function (rgba) {
        if (rgba.a > 0) {
            rgba.r = rgba.r - (255 - color_array[0])
            rgba.g = rgba.g - (255 - color_array[1])
            rgba.b = rgba.b - (255 - color_array[2])
        }
        return rgba;
    });
});

Caman.Filter.register("colorize_shirt", function () {
    var color_array = document.getElementById("colorShirt").value.replace("rgb(", "").replace(")", "").split(",")
    this.process("colorize_shirt", function (rgba) {
        if (rgba.a > 0) {
            rgba.r = rgba.r - (255 - color_array[0])
            rgba.g = rgba.g - (255 - color_array[1])
            rgba.b = rgba.b - (255 - color_array[2])
        }
        return rgba;
    });
});

Caman.Filter.register("colorize_mouth", function () {
    var color_array = document.getElementById("colorMouth").value.replace("rgb(", "").replace(")", "").split(",")
    this.process("colorize_mouth", function (rgba) {
        if (rgba.a > 0) {
            rgba.r = rgba.r - (255 - color_array[0])
            rgba.g = rgba.g - (255 - color_array[1])
            rgba.b = rgba.b - (255 - color_array[2])
        }
        return rgba;
    });
});

Caman.Filter.register("colorize_iris", function () {
    var color_array = document.getElementById("colorIris").value.replace("rgb(", "").replace(")", "").split(",")
    this.process("colorize_iris", function (rgba) {
        if (rgba.a > 0) {
            rgba.r = rgba.r - (255 - color_array[0])
            rgba.g = rgba.g - (255 - color_array[1])
            rgba.b = rgba.b - (255 - color_array[2])
        }
        return rgba;
    });
});

Caman.Filter.register("colorize_sclera", function () {
    var color_array = document.getElementById("colorSclera").value.replace("rgb(", "").replace(")", "").split(",")
    this.process("colorize_sclera", function (rgba) {
        if (rgba.a > 0) {
            rgba.r = rgba.r - (255 - color_array[0])
            rgba.g = rgba.g - (255 - color_array[1])
            rgba.b = rgba.b - (255 - color_array[2])
        }
        return rgba;
    });
});

Caman.Filter.register("colorize_base", function () {
    var color_array = document.getElementById("colorBase").value.replace("rgb(", "").replace(")", "").split(",")
    this.process("colorize_base", function (rgba) {
        if (rgba.a > 10) {
            rgba.r = rgba.r - (255 - color_array[0])
            rgba.g = rgba.g - (255 - color_array[1])
            rgba.b = rgba.b - (255 - color_array[2])
        }
        return rgba;
    });
});

Caman.Filter.register("colorize_trousers", function () {
    var color_array = document.getElementById("colorTrousers").value.replace("rgb(", "").replace(")", "").split(",")
    this.process("colorize_trousers", function (rgba) {
        if (rgba.a > 10) {
            rgba.r = rgba.r - (255 - color_array[0])
            rgba.g = rgba.g - (255 - color_array[1])
            rgba.b = rgba.b - (255 - color_array[2])
        }
        return rgba;
    });
});

Caman.Filter.register("colorize_shoes", function () {
    var color_array = document.getElementById("colorShoes").value.replace("rgb(", "").replace(")", "").split(",")
    this.process("colorize_shoes", function (rgba) {
        if (rgba.a > 10) {
            rgba.r = rgba.r - (255 - color_array[0])
            rgba.g = rgba.g - (255 - color_array[1])
            rgba.b = rgba.b - (255 - color_array[2])
        }
        return rgba;
    });
});


//Presets
function presetSet(skin) {
    if (skin == "steve") {
        // colors
        document.querySelector('#colorIris').jscolor.fromString('rgb(70, 54, 125)')
        document.querySelector('#colorSclera').jscolor.fromString('rgb(226, 233, 244)')
        document.querySelector('#colorHair').jscolor.fromString('rgb(37,25,11)')
        document.querySelector('#colorMouth').jscolor.fromString('rgb(99,59,49)')
        document.querySelector('#colorShirt').jscolor.fromString('rgb(0,154,162)')
        document.querySelector('#colorTrousers').jscolor.fromString('rgb(59,50,155)')
        document.querySelector('#colorBackground').jscolor.fromString('rgb(192,203,220)')
        document.querySelector('#colorBase').jscolor.fromString('rgb(181,137,117)')
        document.querySelector('#colorShoes').jscolor.fromString('rgb(123,123,123)')
        // parts
        eyesEntry = 2
        hairEntry = 2
        bgEntry = 1
        shirtEntry = 1
        mouthEntry = 2
        trousersEntry = 2
        baseEntry = 1
    }
    if (skin == "alex") {
        // colors
        document.querySelector('#colorIris').jscolor.fromString('rgb(25,83,26)')
        document.querySelector('#colorSclera').jscolor.fromString('rgb(226, 233, 244)')
        document.querySelector('#colorHair').jscolor.fromString('rgb(229,142,64)')
        document.querySelector('#colorMouth').jscolor.fromString('rgb(207,161,153)')
        document.querySelector('#colorShirt').jscolor.fromString('rgb(113,154,112)')
        document.querySelector('#colorTrousers').jscolor.fromString('rgb(84,57,38)')
        document.querySelector('#colorBackground').jscolor.fromString('rgb(192,203,220)')
        document.querySelector('#colorBase').jscolor.fromString('rgb(219,198,169)')
        document.querySelector('#colorShoes').jscolor.fromString('rgb(123,123,123)')
        // parts
        eyesEntry = 2
        hairEntry = 3
        bgEntry = 1
        shirtEntry = 2
        mouthEntry = 2
        trousersEntry = 2
        baseEntry = 2
    }
    createImage()
}

// var presets = [
//     {
//         "colours": {
//             "colorIris": "rgb(59,50,155)",
//             "colorSclera": "rgb(25,83,26)",
//             "colorHair": "rgb(25,83,26)",
//             "colorMouth": "rgb(25,83,26)",
//             "colorShirt": "rgb(25,83,26)",
//             "colorTrousers": "rgb(25,83,26)",
//             "colorBackground": "rgb(25,83,26)",
//             "colorBase": "rgb(25,83,26)",
//             "colorShoes": "rgb(25,83,26)"
//         },
//         "elements": {
//             "eyes": 2,
//             "hair": 2,
//             "bg": 2,
//             "shirt": 2,
//             "mouth": 2,
//             "trousers": 2,
//             "base": 2
//         }
//     },
//     {
//         "colours": {
//             "colorIris": "rgb(25,83,26)",
//             "colorSclera": "rgb(25,83,26)",
//             "colorHair": "'rgb(25,100,26)",
//             "colorMouth": "rgb(25,83,26)",
//             "colorShirt": "rgb(25,83,26)",
//             "colorTrousers": "rgb(25,83,26)",
//             "colorBackground": "rgb(25,83,26)",
//             "colorBase": "rgb(25,83,26)",
//             "colorShoes": "rgb(25,83,26)"
//         },
//         "elements": {
//             "eyes": 2,
//             "hair": 2,
//             "bg": 2,
//             "shirt": 2,
//             "mouth": 2,
//             "trousers": 2,
//             "base": 2
//         }
//     }
// ]
// console.log(presets)
var presets = JSON.parse(localStorage.getItem("userPresets"))

function createPresetImage() {
    for (i in presets) {
        const preview = document.createElement("img")
        preview.setAttribute("class", "presetimage customPreset")
        preview.setAttribute("src", "storage/assets/presets/custom.png")
        preview.setAttribute("onClick", `setCustomPreview('${i}')`)
        preview.setAttribute("alt", `Custom Preview Image ${i}`)
        // div.appendChild(preview)
        document.getElementById("preset_container").appendChild(preview)
    }
}

function setCustomPreview(number) {
    const preset = presets[number]

    // colors
    document.querySelector('#colorIris').jscolor.fromString(preset.colours.colorIris)
    document.querySelector('#colorSclera').jscolor.fromString(preset.colours.colorSclera)
    document.querySelector('#colorHair').jscolor.fromString(preset.colours.colorHair)
    document.querySelector('#colorMouth').jscolor.fromString(preset.colours.colorMouth)
    document.querySelector('#colorShirt').jscolor.fromString(preset.colours.colorShirt)
    document.querySelector('#colorTrousers').jscolor.fromString(preset.colours.colorTrousers)
    document.querySelector('#colorBackground').jscolor.fromString(preset.colours.colorBackground)
    document.querySelector('#colorBase').jscolor.fromString(preset.colours.colorBase)
    document.querySelector('#colorShoes').jscolor.fromString(preset.colours.colorShoes)
    // parts
    eyesEntry = preset.elements.eyes
    hairEntry = preset.elements.hair
    bgEntry = preset.elements.bg
    shirtEntry = preset.elements.shirt
    mouthEntry = preset.elements.mouth
    trousersEntry = preset.elements.trousers
    baseEntry = preset.elements.base
    accessoriesEntry = preset.elements.accessories

    createImage()
}

// function saveInLocalStorage(key, value) {
//     localStorage.setItem(key, value);
// }

// function loadFromLocalStorage(key) {
//     localStorage.getItem(key)
// }

function createPreset() {
    const currentPreset = {}
    currentPreset.colours = {}
    currentPreset.elements = {}

    currentPreset.colours.colorIris = document.getElementById("colorIris").value
    currentPreset.colours.colorSclera = document.getElementById("colorSclera").value
    currentPreset.colours.colorHair = document.getElementById("colorHair").value
    currentPreset.colours.colorMouth = document.getElementById("colorMouth").value
    currentPreset.colours.colorShirt = document.getElementById("colorShirt").value
    currentPreset.colours.colorTrousers = document.getElementById("colorTrousers").value
    currentPreset.colours.colorBackground = document.getElementById("colorBackground").value
    currentPreset.colours.colorBase = document.getElementById("colorBase").value
    currentPreset.colours.colorShoes = document.getElementById("colorShoes").value

    currentPreset.elements.eyes = eyesEntry
    currentPreset.elements.hair = hairEntry
    currentPreset.elements.bg = bgEntry
    currentPreset.elements.shirt = shirtEntry
    currentPreset.elements.mouth = mouthEntry
    currentPreset.elements.trousers = trousersEntry
    currentPreset.elements.base = baseEntry
    currentPreset.elements.accessories = accessoriesEntry
    if (presets != null) {
        presets.push(currentPreset)

    } else {
        presets = [currentPreset]
    }

    localStorage.setItem("userPresets", JSON.stringify(presets))
    console.log(currentPreset)

    //create preset element
    const preset_image = document.createElement("img")
    preset_image.setAttribute("class", "presetimage customPreset")
    preset_image.setAttribute("src", "storage/assets/presets/custom.png")
    // preset_image.setAttribute("id", "customPreset")
    preset_image.setAttribute("onClick", `setCustomPreview('${presets.length - 1}')`)
    document.getElementById("preset_container").appendChild(preset_image)

}


Caman.Event.listen("processStart", function (process) {
    document.getElementById("progress").innerHTML = 'Applying ' + process.name;
});

Caman.Event.listen("renderFinished", function () {
    document.getElementById("progress").innerHTML = ''
});
var createThingsgs = 0
Caman.Event.listen("renderFinished", function () {
    if (createThingsgs == 0) {
        createPresetImage()
        createThingsgs = 1
    }
});

function resetPresets() {
    if (confirm("Are you sure you want to delete all your custom presets?")) {
        localStorage.setItem("userPresets", null)
        document.querySelectorAll('.customPreset').forEach(e => e.remove());
    }
}

function deleteLastPreset() {
    presets.pop()
    localStorage.setItem("userPresets", JSON.stringify(presets))
    document.querySelectorAll('.customPreset').forEach(e => e.remove());
    createPresetImage()
}

function togglePresetExtras() {
    for (i of document.querySelectorAll('.hideable')) {
        if (!i.classList.contains("invisible")) {
            i.classList.add("invisible")
        } else {
            i.classList.remove("invisible")
        }
    }
}

function shareLink() {
    const currentPreset = {}
    currentPreset.colours = {}
    currentPreset.elements = {}

    currentPreset.colours.colorIris = document.getElementById("colorIris").value
    currentPreset.colours.colorSclera = document.getElementById("colorSclera").value
    currentPreset.colours.colorHair = document.getElementById("colorHair").value
    currentPreset.colours.colorMouth = document.getElementById("colorMouth").value
    currentPreset.colours.colorShirt = document.getElementById("colorShirt").value
    currentPreset.colours.colorTrousers = document.getElementById("colorTrousers").value
    currentPreset.colours.colorBackground = document.getElementById("colorBackground").value
    currentPreset.colours.colorBase = document.getElementById("colorBase").value
    currentPreset.colours.colorShoes = document.getElementById("colorShoes").value

    currentPreset.elements.eyes = eyesEntry
    currentPreset.elements.hair = hairEntry
    currentPreset.elements.bg = bgEntry
    currentPreset.elements.shirt = shirtEntry
    currentPreset.elements.mouth = mouthEntry
    currentPreset.elements.trousers = trousersEntry
    currentPreset.elements.base = baseEntry
    currentPreset.elements.accessories = accessoriesEntry

    window.location.href = `./share.html?preset=${encodeURIComponent(JSON.stringify(currentPreset))}`;
}