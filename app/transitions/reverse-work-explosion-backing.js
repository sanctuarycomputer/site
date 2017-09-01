import Ember from 'ember';
import { Promise } from "liquid-fire";
import { TimelineLite, easing } from 'gsap';
import c, { vars } from 'site/lib/vudu';

function random(min, max) {
  if (min < 0) return min + Math.random() * (Math.abs(min)+max);
  return min + Math.random() * max;
}

const FADE_DURATION = 0.2;

export default function(opts = {}) {
  let nonTransitionBlocks = this.newElement.find('.project-block:not(.explode)');
  this.newElement.css({ visibility: '' });
  const ease = easing.Expo.easeOut;
  return new Promise(resolve => {
    let tl = new TimelineLite({ onComplete: resolve });
    nonTransitionBlocks.each((index, element) => {
      let frameEl = $(element).find('.frame').get(0);
      let projectBackgroundEl = $(element).find('.project-background').get(0);
      tl.from(frameEl, FADE_DURATION, { y: random(-50, 50), opacity: 0, ease, delay: random(1.25, 1.45) }, 'bang')
      tl.from(projectBackgroundEl, FADE_DURATION, { x: random(-50, 50), opacity: 0, ease, delay: random(1.25, 1.45) }, 'bang')
    });
  });
}
