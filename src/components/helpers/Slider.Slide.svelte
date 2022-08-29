<script>
	import { getContext } from "svelte";
	import canTab from "$actions/canTab.js";
	const { dir, cur, w, h, count } = getContext("Slider");

	export let index;

	$: width = $dir === "horizontal" ? `${100}px` : "100%";
	$: height = $dir === "vertical" ? `${$h}px` : "100%";
	$: visible = index === $cur;
	$: disable = !visible;


	let moving;
	let left = 100;
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

<div
	class="slide"
	class:visible
	style:width
	style:height
	role="group"
	aria-label="slide {index + 1} of {$count}"
	aria-current={visible}
	use:canTab={{ disable }}
	on:mousedown={onMouseDown}
>
	<slot />
</div>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>
	.slide {
		position: relative;
		width: 100%;
		height: 100%;
	}
</style>
