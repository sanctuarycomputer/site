import Ember from 'ember';
import { Promise } from "liquid-fire";
import { TimelineLite, easing } from 'gsap';
import c, { vars } from 'site/lib/vudu';

export default function(opts = {}) {
  const ease = easing.Expo.easeOut;
  this.newElement.css({ visibility: '' });
  this.newElement.find('.initially-hidden').removeClass('initially-hidden');
  let $scroll = this.newElement.find('.detectScroll');
  $scroll.scrollTop($scroll[0].scrollHeight);
  const duration = opts.duration * 0.001 || 2;
  return new Promise((resolve) => {
    const tl = new TimelineLite({ onComplete: resolve })
    .fromTo(this.oldElement, duration, { x: 0 }, { x: window.innerWidth, ease }, 0)
    .fromTo(this.newElement, duration, { x: -window.innerWidth, ease }, { x: 0, ease }, 0);
  });
}
