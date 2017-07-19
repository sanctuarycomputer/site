import Ember from 'ember';
import { Promise } from "liquid-fire";
import { TimelineLite, easing } from 'gsap';
import c, { vars } from 'site/lib/vudu';

export default function(opts = {}) {
  this.newElement.css({ visibility: '' });
  let tl = null;
  const navBar = Ember.$('.GLOBAL--nav-bar');
  const mobileNavBar = Ember.$('.GLOBAL--mobile-nav-bar');
  const mobileNavContent = Ember.$('.GLOBAL--mobile-nav-content');
  const viewHeight = Ember.$(window).height();
  const distance = (viewHeight - navBar.height());
  const routeWrapper = Ember.$(this.newElement.children()[0]);
  let routeWrapperChildrenHeight = 0;
  routeWrapper.children().each(function() {
    routeWrapperChildrenHeight = routeWrapperChildrenHeight + Ember.$(this).outerHeight();
  });
  let scrollTop = routeWrapperChildrenHeight - routeWrapper.height();
  routeWrapper.stop().animate(
    { scrollTop },
    vars.pageTransitionDuration,
    'swing'
  );

  navBar.css({
    'border-top-color': `${c.black.color}`,
    'border-bottom-color': `transparent`
  });

  mobileNavBar.css({
    'border-top-color': `${c.black.color}`,
    'border-bottom-color': `transparent`
  });

  const ease = easing.Expo.easeOut;
  const duration = opts.duration * 0.001 || 2;

  return new Promise((resolve) => {
    tl = new TimelineLite({ onComplete: resolve });
    tl.fromTo([navBar, mobileNavBar], duration,
      { y: 0, ease },
      { y: distance, ease },
    0)
    tl.fromTo(mobileNavContent, duration,
      { y: vars.navBarHeight, ease },
      { y: 0, ease },
    0)
    tl.fromTo(this.newElement, duration,
      { y: -distance, ease },
      { y: 0, ease },
    0)
    tl.fromTo(this.oldElement, duration,
      { y: 0, ease },
      { y: distance, ease },
    0)
  });
}
