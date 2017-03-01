import Ember from 'ember';
import { animate, Promise } from "liquid-fire";
import c, { vars } from 'site/lib/vudu';

export default function bottomToTop(opts={}) {
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

  let routeWrapper = $(this.newElement.children()[0]);
  let routeWrapperChildrenHeight = 0;
  routeWrapper.children().each(function(){
    routeWrapperChildrenHeight = routeWrapperChildrenHeight + $(this).outerHeight();
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
