import Ember from 'ember';
import { Promise } from "liquid-fire";
import { TimelineLite, easing } from 'gsap';
import c, { vars } from 'site/lib/vudu';

export default function(opts = {}) {
  this.newElement.css({ visibility: '' });
  this.newElement.find('.initially-hidden').removeClass('initially-hidden');

  // #good living
  if (document.OPT_OUT_OF_FIRST_BOTTOM_TO_TOP_TRANSITION) {
    let $scroll = this.newElement.find('.detectScroll');
    $scroll.scrollTop($scroll[0].scrollHeight);
    document.OPT_OUT_OF_FIRST_BOTTOM_TO_TOP_TRANSITION = false
    return Promise.resolve();
  }

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

  let scrollTop = routeWrapperChildrenHeight - routeWrapper.height();
  routeWrapper.stop().animate(
    { scrollTop },
    duration,
    'swing'
  );

  return new Promise((resolve) => {
    tl = new TimelineLite({
      onComplete: () => {
        this.newElement.find('.show-after-animation').removeClass('hidden');
        resolve();
      }
    })
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
