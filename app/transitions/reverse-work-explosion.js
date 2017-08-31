import Ember from 'ember';
import { Promise } from "liquid-fire";
import { TimelineLite, easing } from 'gsap';

export default function(opts = {}) {
  const ease = easing.Expo.easeInOut;
  const { newElement, oldElement } = this;
  let requiredX = oldElement.offset().left - newElement.offset().left;
  return new Promise(resolve => {
    const tl = new TimelineLite({ onComplete: resolve });
    tl.to(Ember.$('.detectScroll').get(0), 0.3, { scrollTo: newElement.get(0), ease });
    if (requiredX) {
      tl.to(oldElement.get(0), 0.55, { x: -requiredX, ease: easing.Expo.easeOut });
    }
    tl.to(oldElement.get(0), 0.55, { y: -(oldElement.offset().top - newElement.offset().top), ease: easing.Expo.easeInOut});
  });
}
