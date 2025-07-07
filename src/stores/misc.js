import { writable, derived } from "svelte/store";

export const currentShoe = writable(0);
export const nextShoe = derived(currentShoe, ($currentShoe, set) => {
    if ($currentShoe == 32) set(1);
    else set($currentShoe + 1);
});
export const playing = writable(true);