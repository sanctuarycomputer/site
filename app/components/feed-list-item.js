import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  Component,
} = Ember;

const styles = v({
  feedItem: {
    '@composes': [c.col12, c.flex, c.justifyCenter, c.pt4],
    borderBottom: `1px solid ${c.black.color}`,
  }
});

export default Component.extend({
  classNames: [styles.feedItem],
  styles,
});
