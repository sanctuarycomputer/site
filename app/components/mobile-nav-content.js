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
    height: `calc(100% - ${vars.navBarHeight - vars.navBarFudge}px)`,
    width: '100%',
    zIndex: 1,
    opacity: 0,
    pointerEvents: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  link: {
    '@composes': [c.black, c.navLink],
    textDecoration: 'none',
  },
});

export default Component.extend({
  classNames: [styles.mobileNavContentComponent, 'GLOBAL--mobile-nav-content'],
  styles,
  sanctu: service(),
  router: service('-routing'),

  didInsertElement() {
    if (window.location.pathname === "/") {
      this.$().css({ 'transform': `translateY(${vars.navBarHeight}px)` });
    }
  },

  actions: {
    animateThenGoTo(routeName, isSubSection) {
      if(isSubSection) {
        return get(this, 'sanctu').toggleMobileNav(() => get(this, 'clickedIndexSubsection')(routeName));
      }
      return get(this, 'sanctu').toggleMobileNav(() => get(this, 'router').transitionTo(routeName));
    },
  }
});
