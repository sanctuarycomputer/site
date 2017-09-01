import Ember from 'ember';
import { Promise } from "liquid-fire";
import { TimelineLite, easing } from 'gsap';

export default function(opts = {}) {
  const ease = easing.Expo.easeInOut;
  const { newElement, oldElement } = this;
  let requiredX = oldElement.offset().left - newElement.offset().left;
  return new Promise(resolve => {
    let tl = new TimelineLite({ onComplete: resolve });
    tl.to(Ember.$('.detectScroll').get(0), 0.2, { scrollTo: $('.GLOBAL--cloud-window').height(), ease });
    if (requiredX) {
      tl.to(oldElement.get(0), 0.55, { x: -requiredX, ease: easing.Expo.easeOut, delay: 0.3 });
    }
    tl.to(oldElement.get(0), 0.55, {
      y: -(oldElement.offset().top - newElement.offset().top),
      ease: easing.Expo.easeInOut,
      delay: (requiredX ? 0 : 0.3)
    });
  });
}
