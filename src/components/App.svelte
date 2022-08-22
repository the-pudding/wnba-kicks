<script>
	import { getContext, onMount } from "svelte";
	import Slider from "$components/helpers/slider.svelte";
	import Slide from "$components/helpers/Slider.Slide.svelte";
import { schemeOrRd } from "d3";
	// import Footer from "$components/Footer.svelte";

	const copy = getContext("copy");
	console.log(copy)

	let sliderEl; // component binding
	

	onMount(() => {
		sliderEl.next(); // navigation call
    });
</script>

<Slider bind:this={sliderEl}>
	{#each copy.shoes as shoe}
	<Slide>
		<div class="navWrapper">
			<img src="assets/images/thumbnails/{shoe.shoeID}_thumbnail.png"
				alt="illustration of {shoe.shoePlayer} {shoe.shoeName} shoe"
				class="navShoe">
			<p>{shoe.shoeName}</p>
		</div>
	</Slide>
	{/each}
</Slider>
<!-- <Demo /> -->
<!-- <Footer /> -->

<style>
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
		font-size: var(--14px)
	}
	.navShoe {
		width: 75%;
	}
</style>