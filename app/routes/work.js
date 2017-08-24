import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  get,
  set,
  Route,
  computed,
  inject: { service }
} = Ember;

const styles = v({
  workRoute: {
    top: 0,
    minHeight: '100vh'
  },
});

export default Route.extend({
  sanctu: service(),
  model() {
    return this.store.findAll('project')
  },

  setupController(controller) {
    this._super(...arguments);
    set(controller, 'styles', styles);
    set(controller, 'v', v(c));
    Ember.run.schedule('afterRender', this, function () {
      set(this, 'sanctu.cloudsWatch', 'work');
    });
  },
});
