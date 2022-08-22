<script>
    import { getContext } from "svelte";
    import { fly } from 'svelte/transition';
    import { currShoeSTORE, prevShoeSTORE } from "$stores/misc.js"
	import { get } from "svelte/store";

    const copy = getContext("copy");
</script>

{#each copy.shoes as shoe}
    {@const currShoe = get(currShoeSTORE)}
    {@const visible=currShoe==+shoe.shoeID}
    {#if visible}
        <div class="detailsWrapper" id="details_shoe{shoe.shoeID}" transition:fly="{{ y: 50, duration: 250, delay: 500 }}">
            <div class="detailsLeft">
                <div>
                    <p class="detailsCategory">Player</p>
                    <p>{shoe.shoePlayer}</p>
                </div>
                <div>
                    <p class="detailsCategory">Brand</p>
                    <p>{shoe.shoeBrand}</p>
                </div>
                <div>
                    <p class="detailsCategory">Release Date</p>
                    <p>{shoe.shoeDate}</p>
                </div>
            </div>
            <div class="detailsRight">
                <p class="detailsName">{shoe.shoeName}</p>
                <p>{@html shoe.shoeDesc}</p>
            </div>
        </div>
    {/if}
{/each}

<style>
    .detailsWrapper {
        width: 100%;
        max-width: 960px;
        margin: 2rem auto;
        font-family: var(--sans);
        display: flex;
        flex-direction: row;
        color: var(--color-white);
    }

    :global(.detailsWrapper a) {
        background-repeat: no-repeat;
        background-image: linear-gradient(180deg,transparent 0,#1d03bc 0);
        background-position: 0 1em;
        transition: background-position 80ms ease-out;
        border: none;
        color: var(--color-white);
    }

    :global(.detailsWrapper a:hover) {
        background-position: 0 0;
    }

    .detailsLeft {
        width: 25%;
        display: flex;
        flex-direction: column;
        padding: 0 2rem 0 0;
    }

    .detailsLeft div {
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #1d03bc;
    }

    .detailsLeft p {
        margin: 0;
        padding: 0.5rem 0;
        font-size: var(--18px);
    }

    .detailsCategory {
        text-transform: uppercase;
        font-family: var(--sans-display);
        margin: 0 0.5rem 0 0 !important;
        letter-spacing: 0.05em;
    }

    .detailsRight {
        width: 75%;
        border-left: 1px solid #1d03bc;
        padding: 0 0 0 2rem;
    }

    .detailsRight p {
        margin: 0;
        padding: 0;
        font-size: var(--18px);
        line-height: 2;
    }

    .detailsName {
        font-family: var(--sans-display);
        font-size: var(--36px) !important;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
</style>