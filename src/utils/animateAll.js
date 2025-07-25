import { currentShoe, nextShoe } from "$stores/misc.js";
import * as flubber from 'flubber';
import * as d3 from "d3";

const fallbackColor ="#000000";
const fillMatches = {
    st0: "#FFFFFF",
    st1: "#f9f9f9",
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
    st45: "url(#stewartNeonBlack)",
    st47: "#47d3f4",
    st48: "url(#sabrina3)",
    st49: "#f7dba9",
    st66: "url(#gradientWhite)",
    st67: "url(#wilsonPink)",
    st71: "#04cbfe",
    st74: "#f7a68f",
    st76: "#6b6bc6",
    st82: "#efd09e",
    st83: "#1b91e3",
    st86: "#fcebbe",
    st88: "#f49676",
    st98: "#d9fcfa",
    st100: "#e03b80",
    st102: "url(#wilsonPink2)",
    st135: "#F2F2ED",
    st142: "#EDEDE2",
    st151: "url(#stewartRuby)",
    st152: "#A01529",
    st153: "#8C0C24",
    st155: "#BC1727",
    st163: "#231C28",
	st164: "#423549",
	st165: "#6F5D77",
	st166: "#7A6C84",
	st167: "#5E4A68",
	st168: "#BC91A0",
    st169: "#F4887F",
    st170: "#FFA197",
    st171: "url(#stewart3blue)",
    st172: "#E8BC05",
    st173: "url(#stewart3peach)",
    st174: "url(#sabrina2radial)",
    st175: "#1d1d44",
    st176: "#baa4f7",
    st177: "url(#sabrina2purple)",
    st178: "#6c3bd6",
    st179: "#bab9fd",
    st180: "#fbb6b9",
    st181: "#e22469",
    st182: "#fed5d5",
    st183: "#ad0250",
    st184: "#c11058",
    st185: "#fc97b5",
    st186: "#fd4b92",
    st187:"url(#wilsonPink3)",
    st188:"url(#wilsonPink4)",
    st189:"url(#wilsonPink5)",
    st191:"url(#aja4)",
    st200:"url(#angel)",
    st201:"url(#angel2)",
    st209: "#f9e5a7",
    st211: "#06bdfc"
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