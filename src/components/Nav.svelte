<script>
    import { onMount, tick } from "svelte";
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
            //d3.selectAll(".navBlock").style("pointer-events", "auto");
            //d3.selectAll("nav").style("pointer-events", "auto");
        }
    }

    function updateParticles(w) {
        particleNum = Math.ceil(w/shoeW);
    }

    async function updateNavPos($currentShoe, particleNum) {
        await tick();
        if (particleNum) {
                const page = Math.floor(($currentShoe-1)/particleNum)
                if (page >= 0) {
                    carousel.goTo(page, { animated: true })  
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

    $: disabled = $currentShoe == 0 ? "disabled" : "";
</script>

<svelte:window bind:innerWidth={w}/>
{#key particleNum}
    <nav on:click={handleShoeClick} class="{disabled}">
        <svelte:component 
            this={Carousel}
            bind:this={carousel}
            particlesToShow={particleNum}
            particlesToScroll={particleNum}
            arrows={false}
            dots={false}>
            {#each copyShift as shoe}
            <div class="navBlock {disabled}" id="nav_{shoe.shoeID}">
                <img src="assets/images/thumbnails/shoe{shoe.shoeID}_thumbnailX.png"
                alt="illustration of {shoe.shoePlayer} {shoe.shoeName} shoe"
                class="navShoe"
                id="shoe{shoe.shoeID}_img">
                <p>{shoe.shoeName}</p>
            </div>
            {/each}
        </svelte:component>
    </nav>
{/key}


<style>
    nav {
        display: flex;
        flex-direction: row;
        overflow-x: hidden;
        background-color: #2906fc;
        min-height: 8rem;
        pointer-events: auto;
        cursor: pointer;
        padding: 0.5rem 0;
    }

    .navBlock {
        display: flex;
        flex-direction: column;
        align-items: center;
        opacity: 0.5;
        transform: scale(1);
		transition: all 300ms;
        pointer-events: auto;
        cursor: pointer;
    }

    nav.disabled, .navBlock.disabled {
        pointer-events: none;
    }

    .navShoe {
        width: 80%;
        margin: 0 auto;
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
		width: 80%;
		font-size: var(--12px);
		color: var(--color-white);
        margin: 0.5rem auto 1rem auto;
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
        transform: scale(1.2) !important;
        transition: all 300ms;
    }

    @media (hover: hover) {
        .navBlock:hover {
            transform: scale(1);
        }
    }
</style>