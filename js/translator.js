const en_US = {
    "colour_panel.title": "Colors",
    "colour_panel.iris": "Iris",
    "colour_panel.sclera": "Sclera",
    "colour_panel.hair": "Hair",
    "colour_panel.mouth": "Mouth",
    "colour_panel.shirt": "Shirt",
    "colour_panel.trousers": "Pants",
    "colour_panel.background": "Background",
    "colour_panel.skin": "Skin",
    "colour_panel.shoe": "Shoes",

    "options.eyes": "Eyes",
    "options.hair": "Hair",
    "options.mouth": "Mouth",
    "options.shirt": "Shirt",
    "options.trousers": "Pants",
    "options.background": "Background",
    "options.accessories": "Accessories",
    "options.base": "Skin"
}

const en_GB = {
    "colour_panel.title": "Colours",
    "colour_panel.iris": "Iris",
    "colour_panel.sclera": "Sclera",
    "colour_panel.hair": "Hair",
    "colour_panel.mouth": "Mouth",
    "colour_panel.shirt": "Shirt",
    "colour_panel.trousers": "Trousers",
    "colour_panel.background": "Background",
    "colour_panel.skin": "Skin",
    "colour_panel.shoe": "Shoes",

    "options.eyes": "Eyes",
    "options.hair": "Hair",
    "options.mouth": "Mouth",
    "options.shirt": "Shirt",
    "options.trousers": "Trousers",
    "options.background": "Background",
    "options.accessories": "Accessories",
    "options.base": "Skin"
}
const langlist = [en_US, en_GB]
const langlisttext = ["en_US", "en_GB"]
lang = en_US

function setLanguage() {
    const elements = document.querySelectorAll("[translate-key]");

    elements.forEach(el => {
        // console.log(el);
        // console.log(el.getAttribute('translate-key'));
        // console.log(en_US[el.getAttribute('translate-key')])
        // var key = el.getAttribute('translate-key')
        el.textContent = lang[el.getAttribute('translate-key')]
    })
}

function changeLanguage() {
    var index = langlist.findIndex(element => {
        if (element === lang) {
            return true
        }
    });
    console.log(index)

    if (index+1 == langlist.length) {
        index = -1
    }
    lang = langlist[index+1]
    console.log(langlisttext[index+1])
    document.cookie = "language="+langlisttext[index+1]
    setLanguage()
}

window.onload = function() {
    var index = langlisttext.findIndex(element => {
        if (element === document.cookie.replace("language=","")) {
            return true
        }
    });
    lang = langlist[index]

    setLanguage()
}