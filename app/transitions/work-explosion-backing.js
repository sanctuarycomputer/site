import Ember from 'ember';
import { Promise } from "liquid-fire";
import { TimelineLite, easing } from 'gsap';
import c, { vars } from 'site/lib/vudu';

export default function(opts = {}) {
  this.oldElement.find('div[data-project-id]:not(.explode) .project-block').fadeOut();
  this.newElement.css({ visibility: 'visible' });
  return new Promise(resolve => {
    resolve();
  });
}
