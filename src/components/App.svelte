<script>
	import { getContext, onMount } from "svelte";
	import Header from "$components/Header.svelte";
	import Slider from "$components/helpers/slider.svelte";
	import Slide from "$components/helpers/Slider.Slide.svelte";
	import ShoeShapes from "$components/ShoeShapes.svelte";
	import Details from "$components/Details.svelte";
	import { currShoeSTORE, prevShoeSTORE } from "$stores/misc.js"
	import { get } from "svelte/store";
	// import Footer from "$components/Footer.svelte";

	const copy = getContext("copy");
	let copyShift = copy.shoes.slice(1);
	console.log(copyShift);
	let sliderEl;
	let moving;
	let left = 100;

	onMount(() => {
		sliderEl.next(); // navigation call
    });

	function onMouseDown() { moving = true;
	console.log("check") }

	function onMouseMove(e) {
		if (moving) {
			left += e.movementX;
		}
	}

	function onMouseUp() {	moving = false;
		console.log("check") }
</script>

<Header />
<Slider bind:this={sliderEl} class="draggable">
	{#each copyShift as shoe}
	<Slide>
		<div class="navWrapper">
			<img src="assets/images/thumbnails/shoe{shoe.shoeID}_thumbnail.png"
				alt="illustration of {shoe.shoePlayer} {shoe.shoeName} shoe"
				class="navShoe">
			<p>{shoe.shoeName}</p>
		</div>
	</Slide>
	{/each}
</Slider>

<ShoeShapes />
<Details />
<!-- <Demo /> -->
<!-- <Footer /> -->

<style>
	.draggable {
		user-select: none;
		cursor: move;
	}

	.navWrapper {
		max-width: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.navWrapper p {
		font-family: var(--sans);
		text-align: center;
		width: 100%;
		font-size: var(--14px);
		color: var(--color-white);
	}
	.navShoe {
		width: 75%;
	}
</style>