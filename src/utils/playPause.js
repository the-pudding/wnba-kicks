let timerLocal = null;
let playing = true;

export default function playPause() {
    playing = !playing
    if (playing) {
        advanceShoe()
    } else if (!playing && timerLocal) {
        timerLocal.stop();
        timerLocal = null;
    }
}