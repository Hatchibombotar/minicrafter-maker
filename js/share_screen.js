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
var accessoriesEntry = 3

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

function createImage() {
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

}

Caman.Filter.register("colorize_hair", function () {
    var color_array = sharedPreset.colours.colorHair.replace("rgb(", "").replace(")", "").split(",")
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
    var color_array = sharedPreset.colours.colorBackground.replace("rgb(", "").replace(")", "").split(",")
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
    var color_array = sharedPreset.colours.colorShirt.replace("rgb(", "").replace(")", "").split(",")
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
    var color_array = sharedPreset.colours.colorMouth.replace("rgb(", "").replace(")", "").split(",")
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
    var color_array = sharedPreset.colours.colorIris.replace("rgb(", "").replace(")", "").split(",")
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
    var color_array = sharedPreset.colours.colorSclera.replace("rgb(", "").replace(")", "").split(",")
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
    var color_array = sharedPreset.colours.colorBase.replace("rgb(", "").replace(")", "").split(",")
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
    var color_array = sharedPreset.colours.colorTrousers.replace("rgb(", "").replace(")", "").split(",")
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
    var color_array = sharedPreset.colours.colorShoes.replace("rgb(", "").replace(")", "").split(",")
    this.process("colorize_shoes", function (rgba) {
        if (rgba.a > 10) {
            rgba.r = rgba.r - (255 - color_array[0])
            rgba.g = rgba.g - (255 - color_array[1])
            rgba.b = rgba.b - (255 - color_array[2])
        }
        return rgba;
    });
});

var presets = JSON.parse(localStorage.getItem("userPresets"))


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

const sharedPreset = JSON.parse(decodeURIComponent(getUrlVars().preset))
eyesEntry = sharedPreset.elements.eyes
hairEntry = sharedPreset.elements.hair
bgEntry = sharedPreset.elements.bg
shirtEntry = sharedPreset.elements.shirt
mouthEntry = sharedPreset.elements.mouth
trousersEntry = sharedPreset.elements.trousers
baseEntry = sharedPreset.elements.base
accessoriesEntry = sharedPreset.elements.accessories
createImage()


function savePreset() {
    if (presets != null) {
        presets.push(sharedPreset)

    } else {
        presets = [sharedPreset]
    }
    localStorage.setItem("userPresets", JSON.stringify(presets))
    window.location.href = "./index.html";
}
