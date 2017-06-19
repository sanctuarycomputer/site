import Ember from 'ember';
import vudu from 'npm:vudu';
import c, { breakpoints } from 'site/lib/vudu';
import { types, technologies } from 'site/lib/constants';

const {
  Component,
  computed,
  get,
  set,
} = Ember;

const v = vudu(c);

const styles = vudu({
  mobileWorkFilter: {
    '@composes': [c.col12, c.flex, c.flexColumn],
    [breakpoints.md]: {
      display: 'none',
    }
  },
  show: {
    '.filter-block': {
      display: 'flex',
      flexDirection: 'column',
      opacity: 1,
    }
  },
  hide: {
    '.filter-block': {
      display: 'none',
      opacity: 0,
    }
  },
});

export default Component.extend({
  classNameBindings: [`showFilterBlock:${styles.show}:${styles.hide}`],
  classNames: [styles.mobileWorkFilter],
  types,
  technologies,
  showFilterBlock: false,
  isFiltered: computed.or('typeFilter', 'techFilter'),

  actions: {
    clearFilters() {
      return this.attrs.clearFilters();
    },
    toggleFilterBlock() {
      if (get(this, 'showFilterBlock')) {
        if (get(this, 'isFiltered')) {
          this.attrs.clearFilters();
          return set(this, 'showFilterBlock', false);
        }
        return set(this, 'showFilterBlock', false);
      }
      return set(this, 'showFilterBlock', true);
    },
  }
});
