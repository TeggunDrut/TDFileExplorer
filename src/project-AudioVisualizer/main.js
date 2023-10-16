const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let width, height;
width = canvas.width = window.innerWidth;
height = canvas.height = window.innerHeight;

const start = () => {
    const audio = new Audio();
    audio.src = 'Justin Bieber - Despacito (Lyrics _ Letra) ft. Luis Fonsi .mp3';
    if(audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }

    let c = new AudioContext();

    const analyser = c.createAnalyser();
    const source = c.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(c.destination);
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const barWidth = width / bufferLength;
    let barHeight;
    let x = 0;
    const renderFrame = () => {
        requestAnimationFrame(renderFrame);
        x = 0;
        analyser.getByteFrequencyData(dataArray);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, width, height);
        for(let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * 1.5;
            // const r = barHeight + (25 * (i/bufferLength));
            // const g = 250 * (i/bufferLength);
            // const b = 50;

            ctx.fillStyle = `hsl(${i}, 100%, 50%)`;
            ctx.fillRect(x, height - barHeight, barWidth, barHeight);
            x += barWidth;
        }
    }
    renderFrame();

}
const init = () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
}
window.onload = init;
document.addEventListener('click', start);