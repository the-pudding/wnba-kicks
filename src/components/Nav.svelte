<script>
    import { onMount } from "svelte";
    import { select, selectAll } from "d3";

    export let copyShift;
    export let currentShoe;
    export let nextShoe;

    let activeShoe;

    onMount(() => {
	})

    function handleDrag(event) {
        console.log("drag");

        const { x } = event;
    }

    function handleDragStart() {
        console.log("start")
    }

    function handleDragEnd() {
        console.log("end")
    }

    function handleShoeClick() {
        let shoeID = this.id;
        shoeID = shoeID.slice(4)
    }
</script>
<nav>
    {#each copyShift as shoe}
    <div class="navWrapper" 
        draggable=true 
        on:drag="{handleDrag}"
        on:dragstart="{handleDragStart}"
        on:dragend="{handleDragEnd}">
        <div on:click="{handleShoeClick}" id="shoe{shoe.shoeID}" class="navElement">
            <img src="assets/images/thumbnails/shoe{shoe.shoeID}_thumbnail.png"
            alt="illustration of {shoe.shoePlayer} {shoe.shoeName} shoe"
            class="navShoe"
            id="shoe{shoe.shoeID}_img">
            <p>{shoe.shoeName}</p>
        </div>
    </div>
    {/each}
</nav>

<style>
    nav {
        display: flex;
        flex-direction: row;
        overflow-x: hidden;
    }

    .navWrapper {
        min-width: 100px;
        width: 100px;
        display: flex;
		flex-direction: column;
		align-items: center;
    }

    .navWrapper div {
        width: 100%;
        display: flex;
		flex-direction: column;
		align-items: center;
    }

    .navShoe {
        width: 75%;
        pointer-events: none;
    }

    .navWrapper p {
		font-family: var(--sans);
		text-align: center;
		width: 100%;
		font-size: var(--14px);
		color: var(--color-white);
	}
</style>