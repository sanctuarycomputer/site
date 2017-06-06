import Ember from 'ember';
import v from 'npm:vudu';
import c, { breakpoints } from 'site/lib/vudu';

const {
  inject: { service },
  $,
  get,
  set,
  Component,
  computed,
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
    opacity: 0,
    [breakpoints.md]: {
      display: 'block',
      visibility: 'visible',
      opacity: 1,
      width: '100px',
      '@composes': [c.absolute],
      top: '50%',
      right: '20px',
      transform: 'translateY(-50%)',
    }
  },
  hide: {
    display: 'none',
    visibility: 'hidden',
    opacity: 0,
  },
  show: {
    display: 'block',
    visibility: 'visible',
    opacity: 1,
  }
});

export default Component.extend({
  classNameBindings: [`shouldShow:${styles.show}:${styles.hide}`],
  styles,
  sanctu: service(),

  didInsertElement() {
    this._super(...arguments);
    const resizeListener = () => this.checkScrollHeight();
    set(this, 'resizeListener', resizeListener);
    resizeListener();
    this.$(window).on('resize', resizeListener);
  },

  willDestroyElement() {
    this.$(window).off('resize', get(this, 'resizeListener'));
  },

  shouldShow: false,
  isUp: computed.equal('direction', 'up'),
  isDown: computed.equal('direction', 'down'),

  checkScrollHeight: function() {
    let innerScrollingContainerClass = v(c).liquidInner;
    let $scrollContainer = $(`.${innerScrollingContainerClass}`);
    let scrollHeight = $scrollContainer.prop('scrollHeight');
    if ($scrollContainer.height() < scrollHeight) {
      this.set('shouldShow', true)
    }
  },

  click(/*e*/) {
    let direction = get(this, 'direction');
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
