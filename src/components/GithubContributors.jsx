import { createResource } from "solid-js";

export default function GithubContributors({repoName, repoOwner}) {
	const requestURL = `https://api.github.com/repos/${repoOwner}/${repoName}/contributors?q=contributions&order=desc`
	const fetchContributors = async () => (await fetch(requestURL)).json();
	const [contributors] = createResource(fetchContributors);

	return <For each={contributors()}>{ (user) => 
		<a href={user.html_url}>
			<img src={user.avatar_url + "&s=60"} alt={user.login} width="30" height="30"></img>
		</a>
	}</For>
}