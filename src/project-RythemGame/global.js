const canvas = document.getElementById("canvas");

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

const backgroundCanvas = document.getElementById("backgroundCanvas");
const backgroundCtx = backgroundCanvas.getContext("2d");

const width = (canvas.width = backgroundCanvas.width = window.innerWidth);
const height = (canvas.height = backgroundCanvas.height = window.innerHeight);

const centerX = width / 2;
const centerY = height / 2;

let blue = "rgb(20, 50, 200)";

const mouse = {
    x: 0,
    y: 0,
    down: false,
};
    