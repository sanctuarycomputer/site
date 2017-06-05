import Ember from 'ember';
import v from 'npm:vudu';
import c, { breakpoints } from 'site/lib/vudu';

const {
  inject: { service },
  $,
} =  Ember;

const styles = v({
  upArrowPosition: {
    width: '50px',
    '@composes': [c.absolute],
    left: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    [breakpoints.md]: {
      width: '100px',
    }
  },
  downArrowPosition: {
    display: 'none',
    visibility: 'hidden',
    [breakpoints.md]: {
      display: 'block',
      visibility: 'visible',
      width: '100px',
      '@composes': [c.absolute],
      top: '50%',
      right: '20px',
      transform: 'translateY(-50%)',
    }
  }
});

export default Ember.Component.extend({
  styles,
  sanctu: service(),

  click(e) {
    let direction = $(e.target).attr("class");
    let innerScrollingContainerClass = v(c).liquidInner;
    let $scrollContainer = $(`.${innerScrollingContainerClass}`);
    let bottom = $scrollContainer.prop('scrollHeight');

    if (direction === 'up') {
      $scrollContainer.animate({ scrollTop: 0 }, 1000);
    } else if (direction === 'down') {
      $scrollContainer.animate({ scrollTop: bottom }, 1000);
    }
  }
});
