import { Routes, Route } from "@solidjs/router"

import {Creator} from "./pages/Creator.tsx"
import {ShareScreen} from "./pages/ShareScreen.tsx"

import githubLogo from "./assets/icons/github.png"

import './App.scss';

import GithubContributors from "./components/GithubContributors.tsx"

export default function App() {
	return (
		<div class="App">
			<header>
				<h1 class="title font-ten">Minicrafter Maker</h1>
				<div class="socialButtons">
					<a href="https://github.com/Hatchibombotar/minicrafter-maker">
						<img src={githubLogo} alt="Github"></img>
					</a>
				</div>
			</header>
            <Routes>
                <Route path="/share" component={ShareScreen} />
                <Route path="/" component={Creator} />
                <Route path="/about" element={<div>This site was made with Solid</div>} />
            </Routes>
            <footer>
				<p>Minicrafter Maker created by <a href="https://github.com/Hatchibombotar">hatchibombotar#3794</a></p>
				<p>Original minicrafter design by <a href="https://www.planetminecraft.com/member/chesto_">Chesto#5842</a></p>
				<GithubContributors repoName={"minicrafter-maker"} repoOwner={"Hatchibombotar"}></GithubContributors>
				<p>This website is not affiliated with Mojang Studios</p>
			</footer>
		</div>
	)
}