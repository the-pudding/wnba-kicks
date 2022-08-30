<script>
	import { getContext, onMount } from "svelte";
	import Header from "$components/Header.svelte";
	import Nav from "$components/Nav.svelte";
	import ShoeShapes from "$components/ShoeShapes.svelte";
	import Details from "$components/Details.svelte";
	import { currShoeSTORE, prevShoeSTORE } from "$stores/misc.js"
	import { get } from "svelte/store";
	import { select } from "d3";
	// import Footer from "$components/Footer.svelte";

	const copy = getContext("copy");
	let copyShift = copy.shoes.slice(1);
	let currentShoe = +0;
    let nextShoe = currentShoe + 1;
	let bgYear;

	function updateYear(currentShoe) {
		console.log("running")
		//bgYear.text()
	}

	$: updateYear(currentShoe);

	onMount(() => {
		bgYear = select(".big-num")
		//sliderEl.next();
	})
</script>

<Header />
<Nav copyShift={copyShift} currentShoe={currentShoe} nextShoe={nextShoe} />

<div class="content-wrapper">
	<ShoeShapes currentShoe={currentShoe} nextShoe={nextShoe} />
	<Details />
</div>

<div class='content-bg'>
	<div class='skewed-bg'></div>
	<div class='number-bg'><p class='big-num'>1995</p></div>
</div>
<!-- <Demo /> -->
<!-- <Footer /> -->

<style>
	.content-wrapper {
		position: absolute;
		width: 100%;
		height: 100vh;
		z-index: 998;
	}
	.content-bg {
		position: absolute;
		width: 100%;
		height: 100vh;
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
		font-size: 20rem;
		user-select: none;
		margin: 0 0 0 10%;
		padding: 0;
		text-align: left;
		font-family: var(--sans-display);
		color: #2508f2;
	}
</style>