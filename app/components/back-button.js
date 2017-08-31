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
    transition: '120ms ease-out',
    ':hover': {
      transform: 'translateX(-20px)',
    }
  },
});

export default Component.extend({
  classNames: [styles.backButton],
  click() { history.back(); }
});
