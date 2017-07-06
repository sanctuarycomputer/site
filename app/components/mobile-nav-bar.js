import Ember from 'ember';
import v from 'npm:vudu';
import c, { vars } from 'site/lib/vudu';

const {
  get,
  computed: { alias },
  inject: { service },
  Component,
  $,
  set,
} = Ember;

const styles = v({
  mobileNavBarComponent: {
    '@composes': [c.px2, c.bgLightGray],
    height: `${vars.navBarHeight}px`,
    width: '100%',
    position: 'fixed',
    zIndex: 3,
    display: 'flex',
    alignItems: 'center',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'transparent',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'transparent',
    transition: `border-top-color ${vars.pageTransitionDuration}ms, border-bottom-color ${vars.pageTransitionDuration}ms`
  },
  navLabel: {
    '@composes': [c.navLink],
    position: 'relative',
    textAlign: 'center',
    width: '80%',
    '.liquid-outlet': {
      display: 'inline-block',
      verticalAlign: 'top'
    },
    '.liquid-child': {
      width: '100%',
      margin: '0 auto'
    },
    '.logo-mobile': {
      opacity: 0,
      display: 'none',
    },
  },
  strikeThrough: {
    '@composes': [c.bgBlack],
    position: 'absolute',
    height: '1px',
    width: '80%',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%)',
  },
  navIcons: {
    '.x-icon': {
      display: 'none',
      opacity: 0,
    }
  }
});

export default Component.extend({
  classNames: ['GLOBAL--mobile-nav-bar', styles.mobileNavBarComponent],
  styles,
  sanctu: service(),
  active: alias('sanctu.mobileNavShowing'),
  isAnimating: false,

  setupDOM() {
    if (window.location.pathname !== "/") {
      let viewHeight = Ember.$(window).height() - this.$().height();
      this.$().css({
        'transform': `translateY(${viewHeight}px)`,
        'border-top-color': `${c.black.color}`
      });
    } else {
      this.$().attr('data-top', true);
      this.$().css({
        'border-bottom-color': `${c.black.color}`
      });
    }
  },

  didInsertElement() {
    this.setupDOM()
    Ember.$(window).on('resize', () => this.setupDOM());
  },

  actions: {
    toggleNav() {
      let $logoMobile = $('.logo-mobile');
      let $xIcon = $('.x-icon');
      let $menuIcon = $('.menu-icon');
      let $strike = $('.strike');
      let $bind = $('.bind');

      if(!get(this, 'isAnimating')) {
        let tl = new TimelineLite();

        tl.fromTo($menuIcon, 0.25,{ opacity: 1, display: 'block'}, { opacity: 0, display: 'none'});
        tl.fromTo($xIcon, 0.25, { opacity: 0, display: 'none'}, { opacity: 1, display: 'block'});
        tl.fromTo($bind, 0.25,{ opacity: 1, display: 'block'}, { opacity: 0, display: 'none'});
        tl.fromTo($strike, 0.25,{ opacity: 1, display: 'block'}, { opacity: 0, display: 'none'});
        tl.fromTo($logoMobile, 0.25, { opacity: 0, display: 'none'}, { opacity: 1, display: 'initial'});
        tl.eventCallback("onStart", () => set(this, 'isAnimating', true));
        tl.eventCallback("onComplete", () => set(this, 'isAnimating', false));

        if(get(this, 'active')) {
          tl.reverse(0)
        } else {
          tl.play()
        }

        get(this, 'sanctu').toggleProperty('mobileNavShowing');
      
      }

    }
  }
});
