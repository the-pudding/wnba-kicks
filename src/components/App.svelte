<script>
	import { getContext, onMount } from "svelte";
	import Header from "$components/Header.svelte";
	import Nav from "$components/Nav.svelte";
	import ShoeShapes from "$components/ShoeShapes.svelte";
	import Details from "$components/Details.svelte";
	import { currShoeSTORE, prevShoeSTORE } from "$stores/misc.js"
	import { get } from "svelte/store";
	// import Footer from "$components/Footer.svelte";

	const copy = getContext("copy");
	let copyShift = copy.shoes.slice(1);
	let currentShoe = +0;
    let nextShoe = currentShoe + 1;

	onMount(() => {
		//sliderEl.next();
	})
</script>

<Header />
<Nav copyShift={copyShift} currentShoe={currentShoe} nextShoe={nextShoe} />
<ShoeShapes currentShoe={currentShoe} nextShoe={nextShoe} />
<Details />
<!-- <Demo /> -->
<!-- <Footer /> -->

<style>

</style>