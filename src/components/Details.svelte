<script>
    import { getContext } from "svelte";
    import { fly, fade } from 'svelte/transition';
    import { currentShoe, nextShoe} from "$stores/misc.js"

    const copy = getContext("copy");
    let w;
</script>

{#each copy.shoes as shoe, i}
    {@const visible = i == $currentShoe}
    {#if visible && $currentShoe > 0}
    <div class="detailsWrapper" id="details_shoe{shoe.shoeID}" in:fly="{{ y: 200, duration: 1000, delay: 500 }}" out:fade bind:offsetWidth={w}>
        {#if w > 700}
            <div class="detailsLeft">
                <div class="catWrapper">
                    <p class="detailsCategory">Player</p>
                    <p>{shoe.shoePlayer}</p>
                </div>
                <div class="catWrapper">
                    <p class="detailsCategory">Brand</p>
                    <p>{shoe.shoeBrand}</p>
                </div>
                <div class="catWrapper">
                    <p class="detailsCategory">Release Date</p>
                    <p>{shoe.shoeDate}</p>
                </div>
            </div>
            <div class="detailsRight">
                <p class="detailsName">{shoe.shoeName}</p>
                <p>{@html shoe.shoeDesc}</p>
            </div>
        {:else}
            <p class="detailsName">{shoe.shoeName}</p>
            <div class="catWrapper">
                <p class="detailsCategory">Player</p>
                <p>{shoe.shoePlayer}</p>
            </div>
            <div class="catWrapper">
                <p class="detailsCategory">Brand</p>
                <p>{shoe.shoeBrand}</p>
            </div>
            <div class="catWrapper">
                <p class="detailsCategory">Release Date</p>
                <p>{shoe.shoeDate}</p>
            </div>
            <p>{@html shoe.shoeDesc}</p>
        {/if}
    </div>
    {/if}
{/each}

<style>
    .detailsWrapper {
        width: 100%;
        max-width: 960px;
        margin: 0 auto;
        font-family: var(--sans);
        display: flex;
        flex-direction: column;
        color: var(--color-white);
        padding: 0 2rem;
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

    .catWrapper {
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #1d03bc;
        align-items: center;
    }

    .catWrapper:last-of-type {
        margin: 0 0 1rem 0;
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

    @media only screen and (min-width: 700px) {
        .detailsWrapper {
            flex-direction: row;
        }

        .catWrapper {
            flex-direction: row;
            align-items: start;
        }
    }
</style>