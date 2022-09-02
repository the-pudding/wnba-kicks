<script>
    import shoeSvg from "$svg/wnba_kicks_2022.svg";
    import { getContext, onMount } from "svelte";
    import * as d3 from "d3";
    import * as flubber from 'flubber';
    import data from "$data/coordinates.json";
    import Icon from "$components/helpers/Icon.svelte";
    import { currentShoe, nextShoe, playing } from "$stores/misc.js";
    import animateAll from "$utils/animateAll.js";

    const copy = getContext("copy");
    const TIMEOUT_DURATION = 5000;
    let timerLocal = null;
    let introText;
    let loadingText;
    let shoeWrapper;
    let playBtn;
    let w;
    let h;

    function pathsToJSON() {
        const output = [];
        d3.selectAll(".shoeWrapper svg > g").each(function() {
            output.push(getPaths(this));
        });
        window.output = JSON.stringify(output);
    }

    function getPaths(g) {
        const group = d3.select(g);
        const shoeID = group.attr("id");

        const output = [];
        group.selectAll("path")
            .each((d, i, n) => {
                const path = d3.select(n[i]);
                const coordinates = path.attr("d");
                const color = path.attr("class");
                output.push({shoeID, coordinates, color});
            })
        return output;
    }

    function advanceShoe() {
        animateAll(data, { prev: $currentShoe, next: $nextShoe });
        updateText( $currentShoe )
        advanceNav( $currentShoe )
        timerLocal = d3.timeout(advanceShoe, TIMEOUT_DURATION);
    }

    function updateText(prev) {
        if (prev > 0) {
            introText.transition()
                .duration(350)
                .style("opacity", 0);  
            loadingText.transition()
                .duration(350)
                .style("opacity", 0);
            playBtn.transition()
                .duration(350)
                .style("opacity", 1)
                .style("pointer-events", "auto")
        }
    }

    function advanceNav(prev) {
        const navBlocks = d3.selectAll(".navBlock").classed("is-active", false);
        const item = d3.selectAll(`#nav_${prev}`).classed("is-active", true);
    }

    function playPause() {
        playing.set(!$playing)
        if ($playing) {
            advanceShoe()
        } else if (!$playing && timerLocal) {
            timerLocal.stop();
		    timerLocal = null;
        }
    }

    onMount(() => {
		pathsToJSON();
        introText = d3.select(".intro-text");
        loadingText = d3.select(".loading-text");
        shoeWrapper = d3.select(".shoeWrapper");
        playBtn = d3.select(".autoplayBtn");
        timerLocal = d3.timeout(advanceShoe, TIMEOUT_DURATION);

        shoeWrapper.style("height", `${w/1.4}`) 
    });
</script>
<div class="fullScreen">
    <button class="autoplayBtn" on:click="{playPause}">
        {#if $playing}
            <Icon name="pause" width="1.5rem" height="1.5rem" fill="#4729fc" stroke="none"/>
        {:else}
            <Icon name="play" width="1.5rem" height="1.5rem" fill="#4729fc" stroke="none" marginLeft="0.25rem"/>
        {/if}
    </button>
    <div class="shoeWrapper" bind:offsetWidth={w}>
        <div class='intro-text'><p>A visual history of</p></div>
        <div class='loading-text'><p>Loading shoes <span>.</span><span>.</span><span>.</span></p></div>
        {@html shoeSvg}
        <div class="imgOverlays">
            {#each copy.shoes as shoe}
                <img src="assets/images/details/shoe{shoe.shoeID}_detail.png"
                    id="overlay_shoe{shoe.shoeID}"
                    alt="shoe details like stitches, logos, and writing for the {shoe.shoeName}">
            {/each}
        </div>
    </div>
</div>

<style>
    .fullScreen {
        width: 100%;
    }
    .autoplayBtn {
        position: absolute;
        left: 1rem;
        top: 1rem;
        background-color: var(--color-white);
        width: 3rem;
        height: 3rem;
        border-radius: 1.5rem;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        pointer-events: none;
    }

    .intro-text {
        font-family: var(--sans-display);
        color: var(--color-white);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-size: var(--48px);
        text-align: center;
        position: absolute;
        left: 50%;
        top: 10%;
        transform: translateX(-50%);
    }

    .loading-text {
        font-family: var(--sans);
        color: var(--color-white);
        font-size: var(--18px);
        text-align: center;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 10%;
    }

    .loading-text span {
        animation-name: blink;
        animation-duration: 1.4s;
        animation-iteration-count: infinite;
        animation-fill-mode: both;
    }

    .loading-text span:nth-child(2) {
        animation-delay: .2s;
    }

    .loading-text span:nth-child(3) {
        animation-delay: .4s;
    }

    .shoeWrapper {
        max-width: 960px;
        width: 100%;
        margin: 0 auto;
        position: relative;
        height: 660px;
    }

    :global(.shoeWrapper svg) {
        position: absolute;
        width: 100%;
    }

    .imgOverlays {
        position: relative;
    }

    .imgOverlays img {
        position: absolute;
        opacity: 0;
    }

    #overlay_shoe0 {
        opacity: 1;
    }

    :global(#shoe0 text) {
        font-family: var(--sans-display);
        font-size: 50px;
    }

    @keyframes blink {
        0% {
            opacity: .2;
        }
        20% {
            opacity: 1;
        }
        100% {
            opacity: .2;
        }
    }
</style>