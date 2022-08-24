<script>
    import shoeSvg from "$svg/wnba_kicks_2022_shoe1.svg";
    import { getContext, onMount } from "svelte";
    import * as d3 from "d3";
    import * as flubber from 'flubber';
    import data from "$data/coordinates.json";
    import { color } from "d3";
    console.log(data)

    const copy = getContext("copy");
    const TIMEOUT_DURATION = 5000;
    let timerLocal = null;

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

        const path = d3.select("#shoe1")
            .selectAll("path")
            .data(combinedShoes)
        
        path
            .transition()
            .duration(1000)
            // .style('fill', d => fillMatches[d.color] || fallbackColor)
		    // .style('stroke', d => fillMatches[d.color] || fallbackColor)
            .attrTween('d', d => d.interpolatorFunc);

        path
            .join("path")
            .attr('d', d => d.coordinates)
            // .style('fill', d => fillMatches[d.color] || fallbackColor)
		    // .style('stroke', d => fillMatches[d.color] || fallbackColor);
        
        path.exit().remove();
    }

    function advanceShoe() {
        animateAll({ prev: 1, next: 2 });
        //timerLocal = timeout(advanceShoe, TIMEOUT_DURATION);
    }

    onMount(() => {
		pathsToJSON();
        timerLocal = d3.timeout(advanceShoe, TIMEOUT_DURATION);
    });
</script>

<div class="shoeWrapper">
    {@html shoeSvg}
    <div class="imgOverlays">
        {#each copy.shoes as shoe}
            <img src="assets/images/details/shoe{shoe.shoeID}_detail.png"
                id="overlay_{shoe.shoeID}">
        {/each}
    </div>
</div>

<style>
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
        display: none;
    }
</style>