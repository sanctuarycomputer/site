import Ember from 'ember';

const {
  Route,
  get,
  set,
  inject: { service }
} = Ember;

export default Route.extend({
  sanctu: service(),
  model(params) {
    return params.id;
  },
  setupController(controller, slug) {
    set(controller, 'slug', slug);
    set(controller, 'sanctu', get(this, 'sanctu'));
  }
});
