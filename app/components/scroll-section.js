import InViewportMixin from 'ember-in-viewport';
import Ember from 'ember';
import v from 'npm:vudu';
import c, { vars } from 'site/lib/vudu';
//
// const {
//   get,
//   Component,
//   inject: { service },
// } = Ember;

// export default Component.extend(InViewportMixin, {
//   sanctu: service(),
//   viewportOptionsOverride: Ember.on('didInsertElement', function () {
//     console.log('start')
//     Ember.setProperties(this, {
//       viewportSpy: true,
//     });
//   }),
//
//   didEnterViewport() {
//     console.log('hit');
//     // this.sendAction('action');
//   },
//
//   didExitViewport() {
//     console.log('exit');
//   },
// });

export default Ember.Component.extend(InViewportMixin, {
  didEnterViewport() {
    console.log('entered');
  },

  didExitViewport() {
    console.log('exited');
  }
});
