import InViewportMixin from 'ember-in-viewport';
import Ember from 'ember';
// import v from 'npm:vudu';
// import c, { vars } from 'site/lib/vudu';
//
const {
  Component,
  inject: { service },
} = Ember;

export default Component.extend(InViewportMixin, {
  sanctu: service(),
  active: false,
  viewportOptionsOverride: Ember.on('didInsertElement', function () {
    console.log('start')
    Ember.setProperties(this, {
      viewportSpy: true,
    });
  }),

  didEnterViewport() {
    console.log('hit');
    this.set('active', true);
    // this.sendAction('action');
  },

  didExitViewport() {
    console.log('exit');
    this.set('active', false);
  },
});
//
// export default Ember.Component.extend(InViewportMixin, {
//   didEnterViewport() {
//     console.log('entered');
//   },
//
//   didExitViewport() {
//     console.log('exited');
//   }
// });
