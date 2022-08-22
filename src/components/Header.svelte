<script>
	import { getContext } from "svelte";
	import wordmark from "$svg/wordmark.svg";
	import { onMount } from 'svelte';
	import { select } from "d3";
	import Icon from "$components/helpers/Icon.svelte";

	let copy = getContext("copy");
	let infoOverlay;
	let body;
	let infoVisible = false;

	console.log(copy);

	onMount(() => {
		body = select("body")
		infoOverlay = select(".infoOverlay")
	});

	function showInfo() {
		infoVisible = !infoVisible
		infoVisible ? infoOverlay.style("left", 0) : infoOverlay.style("left", "-100%")
		infoVisible ? body.style("overflow-y", "hidden") : body.style("overflow-y", "auto")
	}
</script>

<header>
	<div class="wordmark">
		<a href="https://pudding.cool" aria-label="The Pudding">{@html wordmark}</a>
	</div>
	<button class="infoBtn" on:click="{showInfo}">
		{#if infoVisible}
			<Icon name="x-circle" width="1.5rem" height="1.5rem" stroke="#ffffff"/>
		{:else}
			<Icon name="info" width="1.5rem" height="1.5rem" stroke="#262626"/>
		{/if}
	</button>
	<div class="infoOverlay">
		<div>
			<h5>About this project</h5>
			{#each copy.info as { value }}
				<p>{@html value}</p>
			{/each}
			<p class="byline">By <a href="https://pudding.cool/author/jan-diehm/">Jan Diehm</a></p>
		</div>
	</div>
</header>

<style>
	header {
		background-color: var(--color-white);
		height: 3.5rem;
	}
	.wordmark {
		max-width: 10em;
		margin: 0 auto;
		padding: 0.25em 0;
	}

	.wordmark a {
		border: none;
		display: block;
		color: var(--color-fg);
	}

	.wordmark a:hover {
		background-color: transparent;
	}

	:global(.wordmark svg path) {
		fill: currentColor;
	}

	.infoBtn {
		position: absolute;
		top: 0.4rem;
		left: 0;
		background-color: transparent;
		z-index: 1000;
	}

	.infoOverlay {
		width: 100%;
		height: 100vh;
		position: absolute;
		top: 0;
		background-color: rgba(25, 25, 25, 0.98);
		left: -100%;
		transition: left 1s;
		z-index: 999;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 2rem;
		font-family: var(--sans);
		color: var(--color-white);
	}

	h5 {
		font-weight: 700;
		margin: 0 0 2rem 0;
		font-family: var(--sans-display);
		text-transform: uppercase;
		letter-spacing: 1px;
		font-size: var(--32px);
	}

	.byline {
		margin: 2rem 0 0 0;
	}

	.byline a {
		font-weight: 700;
	}

	.infoOverlay div {
		margin: 0 auto;
		max-width: 40rem;
	}

	.infoOverlay p {
		color: var(--color-gray-50);
		font-family: var(--sans-copy);
		font-size: var(--16px);
		line-height: 1.65;
	}

	:global(.infoOverlay a) {
		color: var(--color-white);
		background-image: linear-gradient(180deg,transparent 0,var(--color-gray-700) 0);
		background-position: 0 1em;
		background-repeat: no-repeat;
		border: none;
		transition: background-position 80ms ease-out;
	}

	:global(.infoOverlay a:hover) {
		background-position: 0 0;
	}
</style>
