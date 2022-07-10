const contributorUrl = "https://api.github.com/repos/Hatchibombotar/minicrafter-maker/contributors?q=contributions&order=desc"

async function createContributorImages() {
    let response = await fetch(contributorUrl)
    userData = await response.json()

    for (const user of userData) {
        const contributorDiv = document.getElementById("contributor-section")

        const userElement = document.createElement("a")
        userElement.setAttribute("href", user.html_url)

        const userIcon = document.createElement("img")
        userIcon.setAttribute("src", user.avatar_url + "&s=60")
        userIcon.setAttribute("alt", user.login)
        userElement.appendChild(userIcon)

        contributorDiv.appendChild(userElement)
    }
}

createContributorImages()