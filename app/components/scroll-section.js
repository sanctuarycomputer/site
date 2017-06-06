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
    });
  }),

  didEnterViewport() {
    this.sendAction('action');
  },
});
