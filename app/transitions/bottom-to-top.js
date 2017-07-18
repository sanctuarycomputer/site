import Ember from 'ember';
import { animate, Promise } from "liquid-fire";
import { TimelineLite, TweenLite } from 'gsap';
import c, { vars } from 'site/lib/vudu';

const gs = () => {
  let tl = null;
  const navBar = Ember.$('.GLOBAL--nav-bar');
  const mobileNavBar = Ember.$('.GLOBAL--mobile-nav-bar');
  const mobileNavContent = Ember.$('.GLOBAL--mobile-nav-content');
  const viewHeight = Ember.$(window).height();
  const distance = (viewHeight - navBar.height());
  const routeWrapper = Ember.$(this.newElement.children()[0]);
  let routeWrapperChildrenHeight = 0;
  // routeWrapper.children().each(() => {
  //   routeWrapperChildrenHeight = routeWrapperChildrenHeight + Ember.$(this).outerHeight();
  // });
  // const scrollTop = routeWrapperChildrenHeight - routeWrapper.height();

  const promise = new Promise((resolve) => {
    tl = new TimelineLite({ onComplete: resolve });
    tl.add(TweenLite.to([navBar, mobileNavBar], 1, {
      borderTopColor: `${c.black.color}`,
      borderBottomColor: 'transparent',
    }))
    tl.play();
  });
  return {
    tl,
    promise,
  };
}

const velocity = (opts = {}) => {
  if (!this.newElement) {
    return Promise.resolve();
  } else if (!this.oldElement) {
    this.newElement.css({ visibility: '' });
    return Promise.resolve();
  }

  let navBar = Ember.$('.GLOBAL--nav-bar');
  let mobileNavBar = Ember.$('.GLOBAL--mobile-nav-bar');
  let mobileNavContent = Ember.$('.GLOBAL--mobile-nav-content');

  let viewHeight = Ember.$(window).height();
  let distance = (viewHeight - navBar.height());

  navBar.css({
    'border-top-color': `${c.black.color}`,
    'border-bottom-color': `transparent`
  });

  mobileNavBar.css({
    'border-top-color': `${c.black.color}`,
    'border-bottom-color': `transparent`
  });

  let routeWrapper = Ember.$(this.newElement.children()[0]);
  let routeWrapperChildrenHeight = 0;
  routeWrapper.children().each(function(){
    routeWrapperChildrenHeight = routeWrapperChildrenHeight + Ember.$(this).outerHeight();
  });
  let scrollTop = routeWrapperChildrenHeight - routeWrapper.height();
  routeWrapper.stop().animate(
    { scrollTop },
    vars.pageTransitionDuration,
    'swing'
  );

  return Promise.all([
    animate(navBar, { translateY: [distance, 0] }, opts),
    animate(mobileNavBar, { translateY: [distance, 0] }, opts),
    animate(mobileNavContent, { translateY: [0, vars.navBarHeight] }, opts),
    animate(this.newElement, { translateY: [0, -distance] }, opts),
    animate(this.oldElement, { translateY: [distance, 0] }, opts)
  ]);
}

export default gs;
