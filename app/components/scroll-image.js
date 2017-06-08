import InViewportMixin from 'ember-in-viewport';
import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  Component,
  inject: { service },
  $,
} = Ember;

export default Component.extend(InViewportMixin, {
  v: v(c),
  classNames: ['absolute', 't0'],
  sanctu: service(),
  init() {
   this._super(...arguments);
   this.active = false,
   this.iW = $(window).width(),
   this.iH = $(window).height(),
   this.max = this.iW - 200,
   this.tolerance = this.iH * -0.25,
   this.randomN = Math.floor(Math.random() * this.max),
   this.random = `${this.randomN}px`,
   this.handleResize = () => {
     let nW = $(window).width();
     let nH = $(window).height();
     let wDif = nW - this.iW;
     this.set('random', `${this.randomN + wDif}px`);
     if (this.iH !== nH) this.set('tolerance', nH * -0.25);
    };
    Ember.run.next(this, this.handleResize);
    $(window).on('resize', Ember.run.bind(this, this.handleResize));
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
    this.set('active', true);
  },

  didExitViewport() {
    this.set('active', false);
  },
});
