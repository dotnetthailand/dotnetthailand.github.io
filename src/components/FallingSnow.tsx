import React, { useEffect, useRef } from 'react';
import { css } from '@emotion/core';

const isBrowser = typeof window !== "undefined"

function getBrowserHeight() {
    if (!isBrowser) {
        return 0;
    }

    return window.innerHeight;
}

const MAX_SPEED = 10;
const MIN_SPEED = 5;

const MAX_PATH_WIDTH = 50;
const MIN_PATH_WIDTH = 20;

const MAX_PATH_HEIGHT = getBrowserHeight();
const MIN_PATH_HEIGHT = 100;

// Max and min size of snow
const MAX_SIZE = 32;
const MIN_SIZE = 15;

const NUMBER_OF_SNOW_FLAKES = 50;

/**
 * Create a new snow flake object in the specified starting position
 * @param Image imageObj The image object to be used as a snow flake
 */
class SnowFlake {
    private interval: NodeJS.Timer = null;

    private x: number;

    private y: number;

    private startX: number;

    private speed: number;

    private pathWidth: number;

    private pathHeight: number;

    constructor(public imageElement: HTMLImageElement) {
        this.imageElement.style.position = 'absolute';
        this.imageElement.style.zIndex = '1000';
        this.imageElement.src = '/assets/snowflake.png';
        this.reset();
    }

    /**
     * Starts the animation for this object. To stop the animation call stopAnimation.
     */
    startAnimation() {
        this.interval = setInterval(() => this.animation(sinGraph), 100);
    }

    /**
     * Stops the animation for this object. To start the animation again call startAnimation.
     */
    stopAnimation() {
        clearInterval(this.interval);
    }

    // Starts an infinite animation loop using the given function to move
    // and change the size of the given object.
    private animation(sinGraph: (yValue: number, adjustedWaveHeight: number, adjustedWaveLength: number) => number) {
        this.y += this.speed; // Keep increasing y value with small amount or big amount of speed value.

        if (this.pathWidth !== 0 && this.pathHeight !== 0) {
            this.x = sinGraph(this.y, this.pathWidth, this.pathHeight) + this.startX; // shift on x axis with startX value
        }

        // Check if snow flake y value is out of the frame
        if (this.y >= MAX_PATH_HEIGHT) {
            this.reset();
        } else {
            this.imageElement.style.top = `${this.y}px`;
        }

        if (this.x <= window.innerWidth) {
            this.imageElement.style.left = `${this.x}px`;
        }
    }

    /**
     * Resets teh status of the object with new random values
     */
    private reset() {

        this.startX = random(0, window.innerWidth);
        // * -1 To start above browser window, top with negative value.
        const startY = random(0, MAX_PATH_HEIGHT) * -1;
        this.x = this.startX;
        this.y = startY;

        this.speed = random(MIN_SPEED, MAX_SPEED);
        this.pathWidth = random(MIN_PATH_WIDTH, MAX_PATH_WIDTH);
        this.pathHeight = random(MIN_PATH_HEIGHT, MAX_PATH_HEIGHT);

        const size = random(MIN_SIZE, MAX_SIZE);
        this.imageElement.style.width = `${size}px`;
        this.imageElement.style.height = `${size}px`;
    }
}

/**
 * Returns a random number between min and max.
 * @param number min The lower bound of the range.
 * @param number max The upper bound of the range.
 * @return random number between min (included) and max (not included):
 */
function random(min: number, max: number) {
    // https://stackoverflow.com/a/24152886/1872200
    return Math.random() * (max - min) + min;
}

// Equation x = h * sin((2PI/w)y)
// Input y value and return x value
function sinGraph(yValue: number, adjustedWaveHeight: number, adjustedWaveLength: number) {
    return adjustedWaveHeight * Math.sin(((2 * Math.PI) / adjustedWaveLength) * yValue);
}

export default function FallingSnow() {
    const elementRef = useRef<HTMLDivElement>();

    useEffect(() => {

        // Create some snow flakes.
        const snowFlakes = [...Array(NUMBER_OF_SNOW_FLAKES).keys()].map(() => {
            const imageElement = document.createElement('img') as HTMLImageElement;
            return new SnowFlake(imageElement);
        });

        const bodyElement = document.getElementsByTagName('body')[0];

        snowFlakes.forEach((snowFlake) => {
            bodyElement.appendChild(snowFlake.imageElement);
            snowFlake.startAnimation();
        });
    }, []);

    // https://stackoverflow.com/a/22105413/1872200
    return null;
}