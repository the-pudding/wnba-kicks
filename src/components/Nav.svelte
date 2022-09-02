<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";
    import animateAll from "$utils/animateAll.js";
    import { currentShoe, nextShoe, playing } from "$stores/misc.js";
    import data from "$data/coordinates.json";
    import { timer, elapsed } from "$stores/timer.js";

    export let copyShift;

    let Carousel; // for saving Carousel component class
    let carousel; // for calling methods of the carousel instance
    let w;
    let shoeW = 140;
    let navBlocks;
    let particleNum;
    let carouselContainer;

    function updateParticles(w) {
        console.log("change")
        // if (w) { 
        //     particleNum = Math.round(w/shoeW); 
        //     console.log(particleNum);
        // } 
    }

    $: updateParticles(w)

    onMount(async () => {
        const module = await import('svelte-carousel');
        Carousel = module.default;
        particleNum = Math.round(w/shoeW);
    });

    function handleShoeClick() {
        const item = d3.select(this);
        const navBlocks = d3.selectAll(".navBlock").classed("is-active", false);
        item.classed("is-active", true);
        const next = +this.id.split("_")[1];
        playing.set(!$playing)
        timer.stop();
        if ($currentShoe !== next) {
            animateAll(data, { prev: $currentShoe, next: next })
            //carousel.goTo(1, { animated: true })
            //carouselContainer.style("transform", "translateX(100px)")
        }
    }
</script>

<svelte:window bind:outerWidth={w}/>
<nav>
    <svelte:component 
        this={Carousel}
        bind:this={carousel}
        particlesToShow={particleNum}
        particlesToScroll={particleNum/2}
        arrows={false}
        dots={false}>
        {#each copyShift as shoe}
        <div class="navBlock" id="nav_{shoe.shoeID}" on:click={handleShoeClick}>
            <img src="assets/images/thumbnails/shoe{shoe.shoeID}_thumbnail.png"
            alt="illustration of {shoe.shoePlayer} {shoe.shoeName} shoe"
            class="navShoe"
            id="shoe{shoe.shoeID}_img">
            <p>{shoe.shoeName}</p>
        </div>
        {/each}
    </svelte:component>
</nav>

<style>
    nav {
        display: flex;
        flex-direction: row;
        overflow-x: hidden;
        background-color: #2906fc;
    }

    .navBlock {
        display: flex;
        flex-direction: column;
        align-items: center;
        opacity: 0.5;
        transform: scale(0.75);
		transition: all 300ms;
    }

    .navBlock:hover {
        transform: scale(1);
    }

    .navShoe {
        width: 100%;
        user-select: none;
        user-drag: none;
        -webkit-user-drag: none;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }

    .navBlock p {
		font-family: var(--sans);
		text-align: center;
		width: 100%;
		font-size: var(--14px);
		color: var(--color-white);
        margin: 0.5rem 0 1rem 0;
        line-height: 1.25;
        user-select: none;
        user-drag: none;
        -webkit-user-drag: none;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        margin: 0.5rem 0;
	}

    :global(.is-active) {
        opacity: 1 !important;
        transform: scale(1) !important;
        transition: all 300ms;
    }
</style>