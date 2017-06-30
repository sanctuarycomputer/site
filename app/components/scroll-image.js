import InViewportMixin from 'ember-in-viewport';
import Ember from 'ember';
import vudu from 'npm:vudu';
import c, { breakpoints, colors, vars } from 'site/lib/vudu';

const {
  Component,
  inject: { service },
  $,
} = Ember;

const MAX_TOLERANCE = (vars.navBarHeight * 5);
const IMAGE_PERCENT = 20;

const v = vudu(c);

const styles = vudu({
  scrollImage: {
    position: 'fixed',
    width: `${IMAGE_PERCENT}%`,
    top: 0,
    left: 0,
    ':hover': {
      opacity: 0.8,
    }
  }
});

export default Component.extend(InViewportMixin, {
  styles,
  v: v,
  classNames: [v.absolute, v.t0],
  sanctu: service(),
  init() {
   this._super(...arguments);
   this.active = false,
   this.iW = $(window).width(),
   this.iH = $(window).height(),
   this.imageFactor = (100 / IMAGE_PERCENT),
   this.max = (this.imageFactor - 1) * 100,
   this.tolerance = 50,
   this.rX = Math.floor(Math.random() * this.max),
   this.rY = Math.floor(Math.random() * ((this.iH - MAX_TOLERANCE) - vars.navBarHeight) + vars.navBarHeight),
   this.randomX = `${this.rX}%`,
   this.randomY = `${this.rY}px`
 },

  viewportOptionsOverride: Ember.on('didInsertElement', function () {
    Ember.setProperties(this, {
      viewportSpy: true,
      viewportTolerance: {
        top: this.tolerance,
        bottom: this.tolerance,
        left: 0,
        right: 0,
      },
    });
  }),

  didEnterViewport() {
    this.$().parent().css({
      color: `${colors.electricBlue}`,
      transition: '500ms ease-in-out',
    });
    this.set('active', true);
  },

  didExitViewport() {
    this.$().parent().css({
      color: `${colors.black}`,
      transition: '',
    });
    this.set('active', false);
  },
});
