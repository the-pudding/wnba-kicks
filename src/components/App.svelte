<script>
	import { getContext, onMount } from "svelte";
	import Header from "$components/Header.svelte";
	import Nav from "$components/Nav.svelte";
	import ShoeShapes from "$components/ShoeShapes.svelte";
	import Details from "$components/Details.svelte";
	import { currentShoe, nextShoe } from "$stores/misc.js"
	import { get } from "svelte/store";
	import Footer from "$components/Footer.svelte";

	const copy = getContext("copy");
	let copyShift = copy.shoes.slice(1);
	let h;

	// function updateHeight(h) {
    //     h = h
	// 	console.log(h)
    // }

	// $: updateHeight(h)

	onMount(() => {
        //console.log(h)
    });
</script>

<Header />
<Nav copyShift={copyShift} />

<div class="mega-wrapper" style="height:{h+100}px;">
	<h1 aria-label="A visual history to WNBA kicks">A visual history to WNBA kicks</h1>
	<div class="content-wrapper" bind:clientWidth={h}>
		<ShoeShapes />
		<Details />
	</div>
	
	<div class='content-bg'>
		<div class='skewed-bg'></div>
		{#if $currentShoe> 0}
			<div class='number-bg'><p class='big-num'>{copy.shoes[$currentShoe].shoeDate}</p></div>
		{/if}
	</div>
</div>
<!-- <Demo /> -->
<Footer />

<style>
	.mega-wrapper {
		position: relative;
		min-height: 100vh;
	}

	h1 {
		visibility: hidden;
		position: absolute;
	}

	.content-wrapper {
		position: absolute;
		width: 100%;
		z-index: 998;
	}
	.content-bg {
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 1;
		overflow: hidden;
	}

	.skewed-bg {
		background-color: #361cf2;
		transform: skew(0deg, -30deg);
		position: absolute;
		height: calc(100vh + 10rem);
		width: 100%;
		height: 100vh;
		z-index: 1;
	}

	.number-bg {
		position: absolute;
		width: 100%;
		z-index: 2;
	}

	.big-num {
		font-size: 7rem;
		user-select: none;
		margin: 0 0 0 10%;
		padding: 0;
		text-align: left;
		font-family: var(--sans-display);
		color: #2508f2;
	}

	@media only screen and (min-width: 400px) {
		.big-num {
			font-size: 10rem;
		}
	}

	@media only screen and (min-width: 600px) {
		.big-num {
			font-size: 15rem;
		}
	}

	@media only screen and (min-width: 800px) {
		.big-num {
			font-size: 20rem;
		}
	}
</style>