import Ember from 'ember';
import v from 'npm:vudu';

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
    this.$().removeClass(styles.fadeIn);
    Ember.run.next(this, () => {
      this.$().addClass(styles.fadeIn);
    });
  }
});
