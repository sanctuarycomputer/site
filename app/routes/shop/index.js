import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  set,
  Route
} = Ember;

export default Route.extend({

  setupController(controller) {
    this._super(...arguments);
    set(controller, 'v', v(c));
  }
});
