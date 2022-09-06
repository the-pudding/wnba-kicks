import { currentShoe, nextShoe } from "$stores/misc.js";
import * as flubber from 'flubber';
import * as d3 from "d3";

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
    st11: "url(#gradientWhite)",
    //st11: "#FFFFFF",
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

export default function animateAll(data, { prev, next }) {
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

    currentShoe.set(next);

    hideImage(prev);
	revealImage(next);
}