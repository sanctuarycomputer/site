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
    '.pre-interaction-spacer': { display: 'none' },
    perspective: '1000px',
  },
  link: {
    '@composes': [c.black, c.navLink, c.pointer],
    textDecoration: 'none',
    backfaceVisibility: 'hidden',
  },
  preInteraction: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent !important',
    pointerEvents: 'auto',
    opacity: 1,
    'a': { color: 'white' },
    '.pre-interaction-spacer': { height: '100px', display: 'block' }
  }
});

export default Component.extend({
  classNames: [styles.mobileNavContentComponent, 'GLOBAL--mobile-nav-content'],
  classNameBindings: [`isPreInteraction:${styles.preInteraction}`],
  styles,
  sanctu: service(),
  isPreInteraction: Ember.computed.alias('sanctu.isPreInteraction'),
  router: service('-routing'),

  didInsertElement() {
    if (window.location.pathname === "/") {
      this.$().css({ 'transform': `translateY(${vars.navBarHeight}px)` });
    }
  },

  actions: {
    animateThenGoTo(routeName, isSubSection) {
      if (get(this, 'isPreInteraction')) {
        return get(this, 'sanctu').didInteract(!!isSubSection).then(() => {
          if (isSubSection) return get(this, 'clickedIndexSubsection')(...arguments);
          get(this, 'router').transitionTo(routeName)
        });
      }
      if(isSubSection) {
        return get(this, 'sanctu').toggleMobileNav(() => get(this, 'clickedIndexSubsection')(routeName));
      }
      return get(this, 'sanctu').toggleMobileNav(() => get(this, 'router').transitionTo(routeName));
    },
  }
});
