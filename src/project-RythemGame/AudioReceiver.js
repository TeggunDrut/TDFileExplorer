let url = "pumped_up_kicks.m4a";
let audio = null;
let data = null;
let buf = null;
let x = 0;

const audioContext = new AudioContext();

const timeInput = document.querySelector("#audioInput");
timeInput.onchange = () => {
    audio.currentTime = timeInput.value;
};

function drawWaveform() {
    const step = Math.ceil(data.length / canvas.width);
    const amplitude = canvas.height / 2;

    backgroundCtx.beginPath();

    backgroundCtx.save();
    for (let i = 0; i < canvas.width; i++) {
        let min = 1.0;
        let max = -0.25;
        let sum = 0;

        for (let j = 0; j < step; j++) {
            const value = data[i * step + j];

            if (value < min) {
                min = value;
            }

            if (value > max) {
                max = value;
            }

            sum += value;
        }

        const average = sum / step;
        const centerY = amplitude + amplitude * average;
        const topY = amplitude + amplitude * max;
        const bottomY = amplitude + amplitude * min;

        backgroundCtx.moveTo(i, centerY);
        backgroundCtx.lineTo(i, topY);
        backgroundCtx.moveTo(i, centerY);
        backgroundCtx.lineTo(i, bottomY);
    }

    backgroundCtx.strokeStyle = "red";
    backgroundCtx.lineWidth = 1;
    backgroundCtx.stroke();

    backgroundCtx.scale(0.5, 0.5);
    backgroundCtx.restore();
}

async function loadAudio(url) {
    let buffer = null;
    await fetch(url)
        .then((response) => response.arrayBuffer())
        .then((buffer) => audioContext.decodeAudioData(buffer))
        .then((audioBuffer) => {
            buffer = audioBuffer;
            data = audioBuffer.getChannelData(0);
            drawWaveform();
        })
        .catch((error) => {
            console.error("Error loading audio:", error);
        });

    let audio = new Audio(url);
    return [audio, buffer];
}

async function init() {
    let e = await loadAudio(url);
    audio = e[0];
    buf = e[1];
    drawWaveform();
}
init();

function render() {
    requestAnimationFrame(render);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (audio != null) {
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
        x = width * (audio.currentTime / audio.duration);

        if (!audio.paused) {
            timeInput.value = audio.currentTime.toFixed(2);
        }
    }
    if (mouse.x) {
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.moveTo(mouse.x, 0);
        ctx.lineTo(mouse.x, canvas.height);
        ctx.stroke();

        if (mouse.x < width - 100 && audio) {
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.fillText(
                ((mouse.x / width) * audio.duration).toFixed(2),
                mouse.x,
                mouse.y
            );
        } else {
            if(audio) {
                ctx.fillStyle = "white";
                ctx.font = "20px Arial";
                ctx.fillText(
                    ((mouse.x / width) * audio.duration).toFixed(2),
                    mouse.x - 60,
                    mouse.y
                );
            }
        }
    }
    if (mouse.down) {
        audio.currentTime = (mouse.x / width) * audio.duration;
        timeInput.value = audio.currentTime.toFixed(2);
    }
}
render();
