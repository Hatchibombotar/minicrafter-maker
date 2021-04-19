const xhr = new XMLHttpRequest();

const url = `https://api.github.com/repos/Hatchibombotar/minicrafter-maker/contributors?q=contributions&order=desc`;
xhr.open('GET', url, true);
xhr.onload = function () {
    let data = JSON.parse(this.response);
    writething(data)
}
xhr.send();

function writething(data) {
    for (i in data) {
        var div = document.getElementById("contributor_section")

        const user_link = document.createElement("a")
        user_link.setAttribute("href", data[i].html_url)
        div.appendChild(user_link)

        let iconType = data.iconType
        if (iconType == undefined) iconType = "png"
        const icon = document.createElement("img")
        icon.setAttribute("class", "user_avatar")
        icon.setAttribute("src", data[i].avatar_url)
        icon.setAttribute("alt", data[i].login)
        user_link.appendChild(icon)

        // if (data[i].html_url == undefined) {
        //     user_link.setAttribute("href", "hatchibombotar.com")
        // }
    }
}