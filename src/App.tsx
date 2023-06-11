import { Routes, Route } from "@solidjs/router"
import { Creator } from "./pages/Creator.tsx"
import { ShareScreen } from "./pages/ShareScreen.tsx"
import GITHUB_LOGO from "./assets/icons/github.png"
import LOGO from "./assets/logo_small.png"
import './App.scss';

export default function App() {
	return (
		<div class="font-five p-2">

			<header class="flex flex-col justify-center items-center">
				<h1 class="title font-ten">Minicrafter Maker</h1>

				<a href="https://github.com/Hatchibombotar/minicrafter-maker">
					<img class="rounded-full w-8 h-8" src={GITHUB_LOGO} alt="Github"></img>
				</a>
			</header>

			<main class="my-3 flex flex-col-reverse sm:flex-row justify-center">
				<Routes>
					<Route path="/share" component={ShareScreen} />
					<Route path="/" component={Creator} />
					<Route path="/about" element={<div>This site was made with Solid</div>} />
				</Routes>
			</main>

			<footer class="mt-16">
				<a class="my-4 flex items-center justify-center sm:justify-start cursor-pointer" href="https://www.hatchibombotar.com" target="_blank">
					<img src={LOGO} class="h-8" />
					<p class="ml-2">Created by Hatchibombotar</p>
				</a>
				<p>Original minicrafter design by <a href="https://www.planetminecraft.com/member/chesto_">Chesto#5842</a></p>
				<p>This website is not affiliated with Mojang Studios</p>
			</footer>

		</div>
	)
}