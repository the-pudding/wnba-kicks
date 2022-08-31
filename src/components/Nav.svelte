<script>
    import { onMount } from "svelte";
    import * as d3 from "d3";

    export let copyShift;

    let Carousel; // for saving Carousel component class
    let carousel; // for calling methods of the carousel instance
    let w;
    let shoeLength = copyShift.length;
    let active = false;

    onMount(async () => {
        const module = await import('svelte-carousel');
        Carousel = module.default;
        console.log(w, shoeLength)
    });

    function handleClick() {
        let shoeID = this.id;
        shoeID = shoeID.split("_")[1];
        
        
        active = !active
    }
</script>

<svelte:window bind:outerWidth={w}/>
<nav>
    <svelte:component 
        this={Carousel}
        bind:this={carousel}
        particlesToShow={10}
        particlesToScroll={1}
        arrows={false}
        dots={false}>
        {#each copyShift as shoe}
        <div class="navBlock" id="nav_{shoe.shoeID}" on:click={handleClick} class:active>
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
        padding: 0.5rem 0.25rem;
    }

    .navShoe {
        width: 60%;
        pointer-events: none;
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
        pointer-events: none;
        user-select: none;
        user-drag: none;
        -webkit-user-drag: none;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
	}
</style>