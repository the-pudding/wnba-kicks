<script>
    import shoeSvg from "$svg/wnba_kicks_2022.svg";
    import { getContext, onMount } from "svelte";
    import { select, selectAll } from "d3-selection"

    const copy = getContext("copy");

    function pathsToJSON() {
        const output = [];
        selectAll(".shoeWrapper svg > g").each(function() {
            output.push(getPaths(this));
        });
        window.output = JSON.stringify(output);
    }

    function getPaths(g) {
        const group = select(g);
        const shoeID = group.attr("id");

        const output = [];
        group.selectAll("path")
            .each((d, i, n) => {
                const path = select(n[i]);
                const coordinates = path.attr("d");
                const color = path.attr("class");
                output.push({shoeID, coordinates, color});
            })
        return output;
    }

    onMount(() => {
		pathsToJSON();
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
    }
</style>