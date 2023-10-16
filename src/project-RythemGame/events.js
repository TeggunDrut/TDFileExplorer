window.addEventListener("load", () => {
    init();
});
document.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        console.log(audio.currentTime.toFixed(2));
    }
    if (e.key === " ") {
        if (audio.paused) {
            // con.start();
            audio.play();
        } else {
            // con.pause();
            audio.pause();
        }
    }
    if (e.key === "ArrowRight") {
        audio.currentTime += 0.1;
        timeInput.value = audio.currentTime.toFixed(2);
    }
    if (e.key === "ArrowLeft") {
        audio.currentTime -= 0.1;
        timeInput.value = audio.currentTime.toFixed(2);
    }
});
document.addEventListener("mousedown", (e) => {
    if (e.button === 0) mouse.down = true;
});
document.addEventListener("mouseup", (e) => {
    if (e.button === 0) mouse.down = false;
});
document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});
