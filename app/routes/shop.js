import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  set,
  Route,
  inject: { service }
} = Ember;

const styles = v({
  shopRoute: {
    top: 0
  },
});

export default Route.extend({
  sanctu: service(),
  model() {
    return this.store.findAll('product');
  },

  setupController(controller) {
    this._super(...arguments);
    set(controller, 'styles', styles);
    set(controller, 'v', v(c));
    Ember.run.schedule('afterRender', this, function () {
      set(this, 'sanctu.cloudsWatch', 'shop');
    });
  }
});
