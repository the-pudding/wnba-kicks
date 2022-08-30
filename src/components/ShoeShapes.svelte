<script>
    import shoeSvg from "$svg/wnba_kicks_2022.svg";
    import { getContext, onMount } from "svelte";
    import * as d3 from "d3";
    import * as flubber from 'flubber';
    import data from "$data/coordinates.json";
    import Icon from "$components/helpers/Icon.svelte";

    const copy = getContext("copy");
    const TIMEOUT_DURATION = 5000;
    let timerLocal = null;
    let playing = true;
    let introText;
    let loadingText;

    export let currentShoe;
    export let nextShoe;

    const fallbackColor ="#000000";
    const fillMatches = {
        st0: "#FFFFFF",
        st3: "#FF8A3A",
        st4: "#262626",
        st5: "#4BDEE2",
        st6: "#E8CFCF",
        st7: "#E3F71E",
        st8: "#F15E17",
        st9: "#030C28",
        st10: "#071344",
        //st11: "url(#gradientWhite)",
        st11: "#FFFFFF",
        st12: "#BC1727",
        st13: "#D81F28",
        st14: "#1D4C96",
        st15: "#EFEFEF",
        st16: "#0F346B",
        st17: "#2B61AF",
        st18: "url(#gradientWhite)",
        st19: "#C7E6E6",
        st20: "#191919",
        st21: "#F7F7F7",
        st22: "#DFDFDF",
        st23: "#878787",
        st24: "#CACACA",
        st25: "#6D6D6D",
        st26: "#FFDD17",
        st27: "#382E88",
        st28: "#F7CE06",
        st29: "#4A46A5",
        st30: "#F9E26E",
        st31: "url(#parkerBluePurple)",
        st32: "url(#parkerYellowOrange)",
        st33: "url(#parkerYellowOrange)",
        st34: "url(#parkerBluePurple)",
        st35: "#F9A513",
        st36: "url(#parkerYellowOrange)",
        st37: "url(#eddPurpleYellow)",
        st38: "#A8A8A8",
        st39: "url(#eddRedPurple)",
        st40: "#0087CD",
        st41: "#28285E",
        st42: "#6B6BC6",
        st43: "url(#stewartNeonBlack)",
        st45: "url(#stewartNeonBlack)"
    }

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

    function hideImage(prev) {
        const currentImg = `#overlay_shoe${prev}`;
        d3.selectAll(currentImg)
            .transition()
            .duration(0)
            .style('opacity', '0');
    }

    function revealImage(next) {
        const currentImg = `#overlay_shoe${next}`;
        d3.selectAll(currentImg)
            .transition()
            .duration(1500)
            .delay(1000)
            .style('opacity', '1');
    }

    function animateAll({prev, next}) {
        const shoe1 = data[prev].map(d => d.coordinates).reverse();
        const shoe2 = data[next].map(d => d.coordinates).reverse();
        const shoe2colors = data[next].map(d => d.color).reverse();

        let interpolateMatch = null;
        const interpolateLeftover = null;

        const smallestLength = Math.min(shoe1.length, shoe2.length);
        const shoe1Match = shoe1.slice(0, smallestLength)
        const shoe2Match = shoe2.slice(0, smallestLength)

        interpolateMatch = flubber.interpolateAll(shoe1Match, shoe2Match, {
            match: true,
            single: false
        });

        const combinedShoes = shoe2colors.map((color, i) => ({
            color,
            interpolatorFunc: i < smallestLength ? interpolateMatch[i] : null,
            coordinates: shoe2[i]
        }));

        const path = d3.select("#shoe0")
            .selectAll("path")
            .data(combinedShoes)
        
        path
            .transition()
            .duration(1000)
            .style('fill', d => fillMatches[d.color] || fallbackColor)
		    .style('stroke', d => fillMatches[d.color] || fallbackColor)
            .attrTween('d', d => d.interpolatorFunc);

        path
            .join("path")
            .attr('d', d => d.coordinates)
            .style('fill', d => fillMatches[d.color] || fallbackColor)
		    .style('stroke', d => fillMatches[d.color] || fallbackColor);
        
        path.exit().remove();

        currentShoe = next;

        currentShoe == 22 ? nextShoe = 1 : nextShoe = currentShoe + 1;

        hideImage(prev);
	    revealImage(next);
        updateText(prev);
    }

    function advanceShoe() {
        animateAll({ prev: currentShoe, next: nextShoe });
        timerLocal = d3.timeout(advanceShoe, TIMEOUT_DURATION);
    }

    function updateText(prev) {
        if (prev == 0) {
            console.log(prev)
            introText.transition()
                .duration(350)
                .style("opacity", 0);  
            loadingText.transition()
                .duration(350)
                .style("opacity", 0);  
        }
    }

    function playPause() {
        playing = !playing
        if (playing) {
            advanceShoe()
        } else if (!playing && timerLocal) {
            timerLocal.stop();
		    timerLocal = null;
        }
    }

    onMount(() => {
		//pathsToJSON();
        introText = d3.select(".intro-text");
        loadingText = d3.select(".loading-text");
        timerLocal = d3.timeout(advanceShoe, TIMEOUT_DURATION);
    });
</script>
<div class="fullScreen">
    <button class="autoplayBtn" on:click="{playPause}">
        {#if playing}
            <Icon name="pause" width="1.5rem" height="1.5rem" fill="#4729fc" stroke="none"/>
        {:else}
            <Icon name="play" width="1.5rem" height="1.5rem" fill="#4729fc" stroke="none" marginLeft="0.25rem"/>
        {/if}
    </button>
    <div class="shoeWrapper">
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

    :global(#gradientWhite) {
        --color-stop-1: #FFFFFF,
        --color-stop-2: #FCFCFC,
        --color-stop-3: #F4F4F4,
        --color-stop-4: #E6E6E6,
        --color-stop-5: #E6E6E6
    }

    :global(#parkerBluePurple) {
        --color-stop-1: #C7E6E6,
        --color-stop-2: #4A46A5,
    }

    :global(#parkerYellowOrange) {
        --color-stop-1: #F9E26E,
        --color-stop-2: #FF8A3A,
    }

    :global(#eddPurpleYellow) {
        --color-stop-1: #382E88,
        --color-stop-2: #574A76,
        --color-stop-3: #9F884E,
        --color-stop-4: #D3B630,
        --color-stop-5: #F3D21E,
        --color-stop-6: #FFDD17  
    }

    :global(#eddRedPurple) {
        --color-stop-1: #D81F28,
        --color-stop-2: #AA2C51,
        --color-stop-3: #763A7E,
        --color-stop-4: #56439A,
        --color-stop-5: #4A46A5,
    }

    :global(#stewartNeonBlack) {
        --color-stop-1: #EEF91C,
        --color-stop-2: #ECF91C,
        --color-stop-3: #E5F71E,
        --color-stop-4: #E3F71E,
        --color-stop-5: #E1F51E,
        --color-stop-6: #DBEE1D,
        --color-stop-7: #D0E21B,
        --color-stop-8: #C0D119,
        --color-stop-9: #ACBB17,
        --color-stop-10: #93A013,
        --color-stop-11: #757F0F,
        --color-stop-12: #52590B,
        --color-stop-13: #2B2F06,
        --color-stop-14: #000000,
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