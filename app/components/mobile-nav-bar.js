import Ember from 'ember';
import v from 'npm:vudu';
import c, { vars } from 'site/lib/vudu';
import { TimelineLite, TweenLite } from 'gsap';

const {
  get,
  computed: { alias },
  inject: { service },
  Component,
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
    position: 'absolute',
    left: 0,
    width: '100%',
    pointerEvents: 'none',
    display: 'flex',
    justifyContent: 'center',
    '.liquid-outlet': {
      display: 'inline-block',
      verticalAlign: 'top'
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
  pastLabel: null,
  labelEl: null,
  strikeEl: null,

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
    this.setupDOM();
    Ember.$(window).on('resize', () => this.setupDOM());
    this.setProperties({ strikeEl: Ember.$('.strike'), labelEl: Ember.$('.mobile-nav-label') });
    new TimelineLite().to(this.strikeEl, 0.5, { width: `${this.labelEl[0].offsetWidth + 40}px` });
  },
  didReceiveAttrs() {
    if (this.pastLabel !== this.label) {
      if (!this.pastLabel) Ember.set(this, 'pastLabel', this.label);
      else {
        let tl = new TimelineLite();
        tl
        .to(this.labelEl, 0.5, { opacity: 0 })
        .to(this.labelEl, 0.5, { opacity: 1 })
        .add(() => {
          Ember.set(this, 'pastLabel', this.label);
          Ember.run.next(this, () => {
            TweenLite.to(this.strikeEl, 0.5, { width: `${this.labelEl[0].offsetWidth + 40}px` });
          });
        } , tl.duration() / 2 );
      }
    }
  },
  actions: {
    toggleNav() {
      get(this, 'sanctu').toggleMobileNav();
    }
  }
});
