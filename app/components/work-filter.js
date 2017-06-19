import Ember from 'ember';
import vudu from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  Component,
  computed,
} = Ember;

const v = vudu(c);

const styles = vudu({
  workFilter: {
    '@composes': [
      c.flex,
      c.col12,
      c.borderTopThin,
      c.py1,
      c.sansLight,
    ],
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
  types: [
    'Client',
    'Open Source',
    'Product',
  ],
  technologies: [
    'C++',
    'Electron',
    'Ember',
    'Phoenix',
    'Rails',
    'React',
    'React Native',
    'Shopify',
  ],
  isFiltered: computed.or('typeFilter', 'techFilter'),

  actions: {
    clearFilters() {
      return this.attrs.clearFilters();
    },
  }
});