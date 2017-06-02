import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  set,
  inject: { service },
  Route
} = Ember;

const styles = v({
  workWrapper: {
    '@composes': [c.px6]
  },
});

export default Route.extend({
  sanctu: service(),

  setupController(controller) {
    this._super(...arguments);
    set(controller, 'styles', styles);
    set(controller, 'v', v(c));
  }
});