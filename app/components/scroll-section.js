import InViewportMixin from 'ember-in-viewport';
import Ember from 'ember';
import v from 'npm:vudu';
import c, { vars } from 'site/lib/vudu';
const getProperties = Ember.getProperties;
const bind = Ember.run.bind;
const on = Ember.on;
const isNone = Ember.isNone;

const {
  get,
  Component,
  inject: { service },
} = Ember;

export default Component.extend(InViewportMixin, {
  v: v(c),
  contextElement: null,
  offset: null,
  triggerOnce: null,
  continuous: null,
  horizontal: null,
  viewportOptionsOverride: Ember.on('didInsertElement', function () {
    Ember.setProperties(this, {
      viewportSpy: true,
    });
  }),

  waypoint() {
    if (typeof document === 'undefined') return;
    const element = this.$();
    if (!element.waypoint) return;
    element.waypoint(...arguments);
  },

  setupWaypoint: on('didInsertElement', function () {
    this.waypoint(this.buildOptions());
  }),

  teardownWaypoint: on('willDestroyElement', () => {
    // this.waypoint('destroy');
  }),

  buildOptions() {
    const options = getProperties(this, [
      'contextElementId',
      'offset',
      'triggerOnce',
      'continuous',
      'horizontal',
    ]);

    for (const option in options) {
      if (isNone(options[option])) delete options[option];
    }

    if (options.contextElementId) {
      options.context = document.getElementById(options.contextElementId);
      delete options.contextElementId;
    }

    console.log(options, 'o')

    return options;
  },

  // waypointTriggered: function(direction) {
  //   this.sendAction('on-' + direction, this);
  //   this.sendAction('action', direction, this);
  // }

  didEnterViewport(direction) {
    // this.set('active', true);
    this.sendAction(`on-${direction}`, this);
    this.sendAction('action', direction, this);
  },

  didExitViewport(direction) {
    this.sendAction(`off-${direction}`, this);
    this.sendAction('action', direction, this);
    // this.set('active', false);
  },
});
