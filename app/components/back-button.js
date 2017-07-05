import Ember from 'ember';
import vudu from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  Component,
} = Ember;

const styles = vudu({
  backButton: {
    display: 'inline-block',
    cursor: 'pointer',
    ':hover': {
      transition: '350ms ease-in-out',
      transform: 'translateX(-10px)',
    }
  },
});

export default Component.extend({
  classNames: [styles.backButton],
  click() { history.back(); }
});
