import Ember from 'ember';
import vudu from 'npm:vudu';
import c, { breakpoints, vars, } from 'site/lib/vudu';
import { types, technologies } from 'site/lib/constants';

const {
  Component,
  computed,
} = Ember;

const v = vudu(c);

const styles = vudu({
  workFilter: {
    '@composes': [
      c.col12,
      c.borderTopThin,
      c.py1,
      c.sansLight,
    ],
    display: 'none',
    [breakpoints.md]: {
      display: 'flex',
      position: 'fixed',
      left: 0,
      right: 0,
      backgroundColor: c.lightGray.color,
      bottom: `${vars.navBarHeight}px`,
    }
  },
  filterBlock: {
    '@composes': [
      c.flex,
      c.alignCenter,
      c.justifyCenter,
      c.py1,
    ],
    flex: 1,
    borderRight: `solid 1px ${c.black.color}`,
  },
  projectType: {
    '@compose': [c.py1],
    flex: 2,
    borderRight: `solid 1px ${c.black.color}`,
  },
  techStack: {
    '@compose': [c.py1],
    flex: 4,
  }
});

export default Component.extend({
  classNames: [styles.workFilter],
  v: v,
  styles,
  types,
  technologies,
  isFiltered: computed.or('typeFilter', 'techFilter'),

  actions: {
    clearFilters() {
      return this.attrs.clearFilters();
    },
  }
});
