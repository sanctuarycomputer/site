import InViewportMixin from 'ember-in-viewport';
import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  Component,
  inject: { service },
} = Ember;

export default Component.extend(InViewportMixin, {
  v: v(c),
  classNames: ['absolute', 't0'],
  sanctu: service(),
  active: false,
  random: null,
  max: Ember.$(window).width() - 200,
  tolerance: Ember.$(window).height() * -0.25,

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
    if (!this.random) this.set('random', `${Math.floor(Math.random() * this.max)}px`);
    this.set('active', true);
  },

  didExitViewport() {
    this.set('active', false);
  },
});
