import { createResource, For } from "solid-js";

type GithubContributor = {
	"login": string;
	"id": number;
	"node_id": string;
	"avatar_url": string;
	"gravatar_id": string;
	"url": string;
	"html_url": string;
	"followers_url": string;
	"following_url": string;
	"gists_url": string;
	"starred_url": string;
	"subscriptions_url": string;
	"organizations_url": string;
	"repos_url": string;
	"events_url": string;
	"received_events_url": string;
	"type": string;
	"site_admin": boolean;
	"contributions": string;
}

export default function GithubContributors({ repoName, repoOwner }) {
	const requestURL = `https://api.github.com/repos/${repoOwner}/${repoName}/contributors?q=contributions&order=desc`
	const fetchContributors = async () => (await fetch(requestURL)).json();
	const [contributors] = createResource(fetchContributors);

	return <For each={contributors()}>{(user: GithubContributor) =>
		<a href={user.html_url}>
			<img src={user.avatar_url + "&s=60"} alt={user.login} width="30" height="30" />
		</a>
	}</For>
}