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
      transition: '1s ease-in-out',
      height: 'auto',
      animationName: 'fadeIn',
      animationDuration: '1s',
      animationTimingFunction: 'ease-in-out',
    },
    '@keyframes fadeIn': {
      '1%': {
        display: 'block',
        opacity: 0,
      },
      '100%': {
        display: 'block',
        opacity: 1,
      }
    },
  },
  hide: {
    '.filter-block': {
      display: 'none',
      height: 0,
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
      let innerScrollingContainerClass = vudu(c).liquidInner;
      let $scrollContainer = $(`.${innerScrollingContainerClass}`);
      let bottom = $scrollContainer.prop('scrollHeight');

      if (get(this, 'showFilterBlock')) {
        if (get(this, 'isFiltered')) {
          this.attrs.clearFilters();
          $scrollContainer.animate({ scrollTop: bottom });
          return set(this, 'showFilterBlock', false);
        }
        $scrollContainer.animate({ scrollTop: bottom });
        return set(this, 'showFilterBlock', false);
      }
      $scrollContainer.animate({ scrollTop: bottom });
      return set(this, 'showFilterBlock', true);
    },
  }
});
