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
    let shoeW = 120;
    let shoeLength = copyShift.length
    let particleNum;
    let carouselContainer;

    function updateText($currentShoe) {
        if ($currentShoe > 0) {
            d3.selectAll(".navBlock").style("pointer-events", "auto");
        }
    }

    function updateParticles(w) {
        particleNum = Math.ceil(w/shoeW);
        return particleNum
    }

    function updateNavPos($currentShoe, particleNum) {
        if (particleNum) {
            const pages = Math.ceil(shoeLength/particleNum)
            if (pages) {
                const page = Math.floor(($currentShoe-1)/particleNum)
                if (page >= 0) {
                    console.log($currentShoe, particleNum, pages, page)
                    carousel.goTo(page*2, { animated: true })  
                }
            }
        }
    }

    $: updateParticles(w);
    $: updateText($currentShoe);
    $: updateNavPos($currentShoe, particleNum);

    onMount(async () => {
        const module = await import('svelte-carousel');
        Carousel = module.default;
    });

    function handleShoeClick(e) {
        const item = e.target.parentNode;
        const itemClass = e.target.parentNode.className;
        if (itemClass.includes("navBlock")) {
            const itemID = e.target.parentNode.id;
            const next = itemID.split("_")[1]
            const navBlocks = d3.selectAll(".navBlock").classed("is-active", false);
            const dupeBlocks = d3.selectAll(`#${itemID}`).classed("is-active", true);
            item.classList.add("is-active");
            playing.set(false);  
            timer.stop();
            if ($currentShoe !== next) {
                updateNavPos(+next, particleNum)
                animateAll(data, { prev: $currentShoe, next: +next })
            }
        }
    }
</script>

<svelte:window bind:innerWidth={w}/>
<nav on:click={handleShoeClick}>
    <svelte:component 
        this={Carousel}
        bind:this={carousel}
        particlesToShow={updateParticles(w)}
        particlesToScroll={particleNum/2}
        arrows={false}
        dots={false}>
        {#each copyShift as shoe}
        <div class="navBlock" id="nav_{shoe.shoeID}">
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
        min-height: 8rem;
    }

    .navBlock {
        display: flex;
        flex-direction: column;
        align-items: center;
        opacity: 0.5;
        transform: scale(0.75);
		transition: all 300ms;
        pointer-events: none;
        cursor: pointer;
    }

    .navShoe {
        width: 100%;
        user-select: none;
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

    @media (hover: hover) {
        .navBlock:hover {
            transform: scale(1);
        }
    }
</style>