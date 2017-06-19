import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  get,
  set,
  Route,
  computed,
} = Ember;

const styles = v({
  workRoute: {
    top: 0
  },
});

export default Route.extend({
  model() {
    return this.store.findAll('project')
  },

  setupController(controller) {
    this._super(...arguments);
    set(controller, 'styles', styles);
    set(controller, 'v', v(c));
  },
});
