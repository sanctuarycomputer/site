import Ember from 'ember';
import v from 'npm:vudu';
import c, { vars } from 'site/lib/vudu';

const {
  get,
  computed: { alias },
  inject: { service },
  Component
} = Ember;

const styles = v({
  mobileNavContentComponent: {
    '@composes': [c.bgWhite],
    position: 'fixed',
    height: `calc(100% - ${vars.navBarHeight}px)`,
    width: '100%',
    zIndex: 1,
    opacity: 0,
    pointerEvents: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  active: {
    pointerEvents: 'auto',
    opacity: 1,
    zIndex: 3
  },
  link: {
    '@composes': [c.black],
    fontSize: '3rem',
    textDecoration: 'none',
  }
});

export default Component.extend({
  classNames: [styles.mobileNavContentComponent, 'GLOBAL--mobile-nav-content'],
  styles,
  classNameBindings: [`active:${styles.active}`],
  sanctu: service(),
  active: alias('sanctu.mobileNavShowing'),

  didInsertElement() {
    if (window.location.pathname === "/") {
      this.$().css({ 'transform': `translateY(${vars.navBarHeight}px)` });
    }
  },

  actions: {
    clickedIndexSubsection() {
      get(this, 'clickedIndexSubsection')(...arguments);
    }
  }
});
