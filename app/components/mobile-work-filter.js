import Ember from 'ember';
import vudu from 'npm:vudu';
import c, { breakpoints, vars, colors, } from 'site/lib/vudu';
import { types, technologies } from 'site/lib/constants';

const {
  Component,
  computed,
  get,
  set,
  $,
} = Ember;

const v = vudu(c);

const styles = vudu({
  mobileWorkFilter: {
    '@composes': [c.col12, c.flex, c.flexColumn],
    position: 'fixed',
    bottom: `${vars.navBarHeight - vars.navBarFudge}px`,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    zIndex: 3,
    [breakpoints.md]: {
      display: 'none',
    },
    '.filter-block': {
      height: 0,
      opacity: 0,
    },
  },
});

export default Component.extend({
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
      let $mobileFilterBlock = $('.filter-block');
      let tl = new TimelineLite();
      tl.from($mobileFilterBlock, 0, { opacity: 0, height: 0, ease:Power2.easeInOut});
      tl.to($mobileFilterBlock, 0.25, { height: 'auto', ease:Power2.easeInOut});
      tl.to($mobileFilterBlock, 0.5, { opacity: 1, ease:Power2.easeInOut});

      if (get(this, 'showFilterBlock')) {
        if (get(this, 'isFiltered')) {
          this.attrs.clearFilters();
          tl.reverse()
          return set(this, 'showFilterBlock', false);
        }
        tl.reverse()
        return set(this, 'showFilterBlock', false);
      }
      tl.play()
      return set(this, 'showFilterBlock', true);
    },
  }
});
