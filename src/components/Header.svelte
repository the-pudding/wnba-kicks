<script>
	import { getContext } from "svelte";
	import wordmark from "$svg/wordmark_script_stacked_plain.svg";
	import { onMount } from 'svelte';
	import { select } from "d3";
	import Icon from "$components/helpers/Icon.svelte";
	import { cubicInOut } from "svelte/easing";

	let copy = getContext("copy");
	let infoOverlay;
	let body;
	let infoVisible = false;

	function flyPercent(node, { duration = 600 }) {
        return {
            duration,
            easing: cubicInOut,
            css: (t) => `transform: translateX(${(1 - t) * 100}%);`
        };
    }

    function showInfo() {
        infoVisible = !infoVisible;
        if (typeof document !== 'undefined') {
            document.body.style.overflowY = infoVisible ? "hidden" : "auto";
        }
    }
</script>

<header>
	<div class="wordmark">
		<a href="https://pudding.cool" aria-label="The Pudding">{@html wordmark}</a>
	</div>
	<div class="right-wrapper">
		<p>A Visual History of WNBA Kicks</p>
		<button aria-label="info" class="infoBtn" on:click="{showInfo}">
		{#if infoVisible}
			<Icon name="x-circle" width="1.5rem" height="1.5rem" stroke="#ffffff"/>
		{:else}
			<Icon name="info" width="1.5rem" height="1.5rem" stroke="#262626"/>
		{/if}
	</button>
	</div>
	{#if infoVisible}
        <div 
            class="infoOverlay" 
            transition:flyPercent
        >
            <div>
                <h5>About this project</h5>
                {#each copy.info as { value }}
                    <p>{@html value}</p>
                {/each}
                <p class="byline">By <a href="https://pudding.cool/author/jan-diehm/">Jan Diehm</a></p>
            </div>
        </div>
    {/if}
</header>

<style>
	header {
		background-color: var(--color-white);
		height: 4rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0 0.5rem;
		overflow-x: hidden;
	}
	.wordmark {
		max-width: 7.5em;
	}

	.wordmark a {
		border: none;
		display: block;
		color: var(--color-fg);
	}

	.wordmark a:hover {
		background-color: transparent;
	}

	.right-wrapper {
		z-index: 1000;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.25rem;
		font-family: var(--sans);
		color: #191919;
	}

	.right-wrapper p {
		padding: 0;
		margin: 0;
		font-family: var(--sans);
		color: #191919;
	}

	.infoBtn {
		background-color: transparent;
		z-index: 1000;
		padding: 0;
		display: flex;
		align-items: center;
	}

	.infoOverlay {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(25, 25, 25, 0.98);
		z-index: 999;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 2rem;
		font-family: var(--sans);
		color: var(--color-white);
		z-index: 999;
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
