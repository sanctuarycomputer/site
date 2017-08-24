import Ember from 'ember';
import { Promise } from "liquid-fire";
import { TimelineLite, easing } from 'gsap';

export default function(opts = {}) {
  const ease = easing.Expo.easeInOut;
  const { newElement, oldElement } = this;

  const newScrollPosition= $('.GLOBAL--cloud-window').height();
  const currentScrollPosition = Ember.$('.detectScroll').scrollTop();
  const willChangeScrollBy = currentScrollPosition - newScrollPosition;

  // TODD: Animate this lil transition
  Ember.$('.detectScroll').scrollTop(newScrollPosition);
  oldElement.css({ transform: `translateY(-${willChangeScrollBy}px)` })

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
      y: -(oldElement.offset().top - newElement.offset().top + (willChangeScrollBy)),
      ease
    });
  });
}
