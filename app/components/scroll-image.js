import InViewportMixin from 'ember-in-viewport';
import Ember from 'ember';
import v from 'npm:vudu';
import c, { breakpoints, colors, vars } from 'site/lib/vudu';

const classes = v(c);

const {
  Component,
  inject: { service },
  $,
} = Ember;

const styles = v({
  scrollImage: {
    width: '25vw',
    position: 'fixed',
    transform: 'translate3d(0,0,0)',
    opacity: '.5',
  },
  active: {
    opacity: 1,
    pointerEvents: 'auto',
  },
  inactive: {
    opacity: 0,
    pointerEvents: 'none',
  },
});

export default Component.extend(InViewportMixin, {
  classNames: [classes.absolute, classes.t0],
  styles: styles,
  sanctu: service(),
  init() {
   this._super(...arguments);
   this.active = false,
   this.iW = $(window).width(),
   this.iH = $(window).height(),
   this.maxW = this.iW * .75,
   this.maxH = this.iH * .5,
   this.tolerance = this.iH * -.25,
   this.rX = Math.floor(Math.random() * this.maxW),
   this.rY = Math.floor(Math.random() * (this.maxH - vars.navBarHeight + 1)) + vars.navBarHeight;
   this.sX = `${this.rX}px`;
   this.sY = `${this.rY}px`;
   this.handleResize = Ember.run.bind(this, () => {
     let nW = $(window).width();
     let nH = $(window).height();
     let wDif = nW - this.iW;
     let hDif = nH - this.iH;
     this.setProperties({
       iH: nH,
       iW: nW,
       tolerance: nH * -.25,
       rX: this.rX + wDif,
       rY: this.rY + hDif,
       sX: `${this.rX + wDif}px`,
       sY: `${this.rY + hDif}px`,
     });
   });
   Ember.run.next(this, this.handleResize);
   $(window).on('resize', this.handleResize);
  },

  willDestroyElement() {
    $(window).off('resize', this.handleResize);
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
      transition: 'color 500ms ease-in-out',
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
