import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  Component,
} = Ember;

const styles = v({
  initial: {
    opacity: 0,
    transform: 'translateY(10px)',
  },
  fadeIn: {
    transition: '600ms ease-in-out',
    transform: 'translateY(0)',
    opacity: 1,
  },
});

export default Component.extend({
  classNames: [styles.initial],
  styles,
  didInsertElement() {
    Ember.run.next(this, () => {
      this.$().addClass(styles.fadeIn);
    });
  },
  didUpdateAttrs() {
    let innerScrollingContainerClass = v(c).liquidInner;
    let $scrollContainer = $(`.${innerScrollingContainerClass}`);
    this.$().removeClass(styles.fadeIn);
    Ember.run.next(this, () => {
      $scrollContainer.scrollTop(0,0)
      this.$().addClass(styles.fadeIn);
    });
  }
});
