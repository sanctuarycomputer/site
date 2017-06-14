import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  set,
  Route
} = Ember;

const styles = v({
  shopRoute: {
    top: 0
  },
});

export default Route.extend({
  model() {
    return this.store.findAll('product')
  },

  setupController(controller) {
    this._super(...arguments);
    set(controller, 'styles', styles);
    set(controller, 'v', v(c));
  }
});
