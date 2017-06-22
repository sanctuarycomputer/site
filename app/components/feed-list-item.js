import Ember from 'ember';
import v from 'npm:vudu';
import c, { breakpoints } from 'site/lib/vudu';

const {
  Component,
} = Ember;

const styles = v({
  feedItem: {
    '@composes': [c.col12, c.flex, c.flexColumn, c.justifyCenter, c.pt4],
    borderBottom: `1px solid ${c.black.color}`,
    [breakpoints.md]: {
      '@composes': [c.justifyCenter, c.pt4, c.flexRow],
    }
  },
  columnLeft: {
    '@composes': [c.col12, c.mdCol10, c.flex, c.alignCenter, c.justifyStart],
  },
  columnRight: {
    '@composes': [c.col12, c.mdCol2, c.flex, c.alignCenter],
    [breakpoints.md]: {
      '@composes': [c.justifyEnd],
    }
  },
});

export default Component.extend({
  classNames: [styles.feedItem],
  styles,
});
