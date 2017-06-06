import InViewportMixin from 'ember-in-viewport';
import Ember from 'ember';

const {
  Component,
  inject: { service },
} = Ember;

export default Component.extend(InViewportMixin, {
  sanctu: service(),
  viewportOptionsOverride: Ember.on('didInsertElement', function () {
    Ember.setProperties(this, {
      viewportSpy: true,
      viewportTolerance: {
        top: 200,
        bottom: 0,
        left: 0,
        right: 0,
      },
    });
  }),

  didEnterViewport() {
    this.sendAction('action');
  },
});
