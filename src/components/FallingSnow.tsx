import { useEffect } from 'react';
import { ChronoUnit, Duration, LocalDate } from '@js-joda/core';

const isBrowser = typeof window !== "undefined"

function getBrowserHeight() {
  if (!isBrowser) {
    return 0;
  }

  return window.innerHeight;
}

const MAX_SPEED = 10;
const MIN_SPEED = 5;

// amplitude
const MAX_PATH_WIDTH = 30;
const MIN_PATH_WIDTH = 20;

// period
const MAX_PATH_HEIGHT = getBrowserHeight();
const MIN_PATH_HEIGHT = 300;

// Max and min size of snowflake
const MAX_WIDTH = 16;
const MIN_WIDTH = 8;

const NUMBER_OF_SNOW_FLAKES = 30;

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
    this.imageElement.style.position = 'fixed';
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

    const size = random(MIN_WIDTH, MAX_WIDTH);
    this.imageElement.style.width = `${size}px`;
    this.imageElement.style.height = 'auto';
  }
}

// A LocalDate represents a date with no time and no time zone in the ISO-8601 calendar system, such as 2007-12-24.
// obtain the current date in the system default time zone, e.g. 2016-02-23
const today = LocalDate.now();
// const today = LocalDate.parse('2022-01-10'); // for debugging
const showFallingSnowBeforeAfterInDays = 15;

const currentChristmasDay = LocalDate.of(today.year(), 12, 25);
const lastChristmasDay = LocalDate.of(today.year() - 1, 12, 25);
const shouldShowFallingShow =
  getDistanceInDays(today, lastChristmasDay) <= showFallingSnowBeforeAfterInDays ||
  getDistanceInDays(today, currentChristmasDay) <= showFallingSnowBeforeAfterInDays;

export default function FallingSnow() {

  useEffect(() => {
    if (!shouldShowFallingShow) {
      return;
    }

    // Create some snow flakes.
    const snowFlakes = [...Array(NUMBER_OF_SNOW_FLAKES).keys()].map(() => {
      const imageElement = document.createElement('img');
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

function getDistanceInDays(date1: LocalDate, date2: LocalDate) {
  return Math.abs(date1.until(date2, ChronoUnit.DAYS));
}
