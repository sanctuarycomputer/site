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
    'border-top-color': `transparent`,
    'border-bottom-color': `${c.black.color}`
  });

  mobileNavBar.css({
    'border-top-color': `transparent`,
    'border-bottom-color': `${c.black.color}`
  });

  return Promise.all([
    animate(navBar, { translateY: [0, distance] }, opts),
    animate(mobileNavBar, { translateY: [0, distance] }, opts),
    animate(mobileNavContent, { translateY: [vars.navBarHeight, 0] }, opts),
    animate(this.newElement, { translateY: [0, distance] }, opts),
    animate(this.oldElement, { translateY: [-distance, 0] }, opts)
  ]);
}
