import Ember from 'ember';
import { Promise } from "liquid-fire";
import { TimelineLite, easing } from 'gsap';
import c, { vars } from 'site/lib/vudu';

export default function(opts = {}) {
  this.newElement.css({ visibility: '' });
  const duration = opts.duration * 0.001 || 2;
  return new Promise((resolve) => {
    const tl = new TimelineLite({ onComplete: resolve })
    .fromTo(this.oldElement, duration, { x: 0 }, { x: -window.innerWidth }, 0)
    .fromTo(this.newElement, duration, { x: window.innerWidth }, { x: 0 }, 0);
  });
}
