import Ember from 'ember';
import { Promise } from "liquid-fire";
import { TimelineLite, easing } from 'gsap';
import c, { vars } from 'site/lib/vudu';

export default function(opts = {}) {
  this.newElement.css({ visibility: '' });
  let tl = null;
  let navBar = Ember.$('.GLOBAL--nav-bar');
  let mobileNavBar = Ember.$('.GLOBAL--mobile-nav-bar');
  let mobileNavContent = Ember.$('.GLOBAL--mobile-nav-content');
  let viewHeight = Ember.$(window).height();
  let distance = (viewHeight - navBar.height());

  navBar.css({
    'border-top-color': `transparent`,
    'border-bottom-color': `${c.black.color}`
  });

  mobileNavBar.css({
    'border-top-color': `transparent`,
    'border-bottom-color': `${c.black.color}`
  });

  const ease = easing.Expo.easeOut;
  const duration = opts.duration * 0.001 || 2;

  return new Promise((resolve) => {
    tl = new TimelineLite({ onComplete: resolve });
    tl.fromTo([navBar, mobileNavBar], duration,
      { y: distance, ease },
      { y: 0, ease },
    0)
    tl.fromTo(mobileNavContent, duration,
      { y: 0, ease },
      { y: vars.navBarHeight, ease },
    0)
    tl.fromTo(this.newElement, duration,
      { y: distance, ease },
      { y: 0, ease },
    0)
    tl.fromTo(this.oldElement, duration,
      { y: 0, ease },
      { y: -distance, ease },
    0)
  });
}
