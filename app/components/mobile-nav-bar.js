import Ember from 'ember';
import v from 'npm:vudu';
import c, { vars } from 'site/lib/vudu';
console.log(c);

const {
  get,
  inject: { service },
  Component
} = Ember;

const styles = v({
  mobileNavBarComponent: {
    height: `${vars.navBarHeight}px`,
    width: '100%',
    position: 'fixed',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
  },
  navLabel: {
    fontSize: '48px',
    lineHeight: '66px',
    textAlign: 'center',
    '.liquid-outlet': {
      display: 'inline-block',
      verticalAlign: 'top'
    },
    '.liquid-child': {
      width: '5em'
    }
  }
});

export default Component.extend({
  classNames: ['GLOBAL--mobile-nav-bar', styles.mobileNavBarComponent],
  styles,
  sanctu: service(),

  didInsertElement() {
    if (window.location.pathname !== "/") {
      let viewHeight = Ember.$(window).height() - this.$().height();
      this.$().css({ 'transform': `translateY(${viewHeight}px)` });
    }
  },

  actions: {
    toggleNav() {
      get(this, 'sanctu').toggleProperty('mobileNavShowing');
    }
  }
});
