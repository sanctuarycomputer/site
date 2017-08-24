import Ember from 'ember';
import { Promise } from "liquid-fire";
import { TimelineLite, easing } from 'gsap';

export default function(opts = {}) {
  const ease = easing.Expo.easeInOut;
  const { newElement, oldElement } = this;
  return new Promise(resolve => {
    new TimelineLite({ onComplete: resolve })
    .to(oldElement.get(0), 0.8, {
      width: newElement.width(),
      height: newElement.height(),
      x: -(oldElement.offset().left - newElement.offset().left),
      ease,
      delay: 0.3
    })
    .to(oldElement.get(0), 0.8, {
      y: -(oldElement.offset().top - newElement.offset().top),
      ease
    });
  });
}
