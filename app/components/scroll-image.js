import InViewportMixin from 'ember-in-viewport';
import Ember from 'ember';
import vudu from 'npm:vudu';
import c, { breakpoints } from 'site/lib/vudu';

const {
  Component,
  inject: { service },
  $,
} = Ember;

const v = vudu(c);

const styles = vudu({
  scrollImageSize: {
    '@composes': [c.maxWidth100, c.maxHeight100],
    [breakpoints.md] : {
      '@composes': [c.maxWidth400, c.maxHeight400],
    },
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
   this.max = this.iW - 200,
   this.tolerance = 50,
   this.randomN = Math.floor(Math.random() * this.max),
   this.random = `${this.randomN}px`,
   this.handleResize = Ember.run.bind(this, () => {
     let nW = $(window).width();
     let nH = $(window).height();
     let wDif = nW - this.iW;
     if (this.iW !== nW) this.set('random', `${this.randomN + wDif}px`);
     if (this.iH !== nH) this.set('tolerance', nH * -0.25);
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
    this.$().parent().css({color: 'red'});
    this.set('active', true);
  },

  didExitViewport() {
    this.$().parent().css({color: 'black'});
    this.set('active', false);
  },
});
