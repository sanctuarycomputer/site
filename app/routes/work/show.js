import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';
const { get, set, Route, inject: { service } } = Ember;

const styles = v({
  workShowWrapper: {
    minHeight: '100vh'
  },
});

export default Route.extend({
  sanctu: service(),

  model(params) {
    return this.store.queryRecord('project', {
      'fields.slug': params.slug
    });
  },

  setupController(controller, model) {
    this._super(...arguments);
    set(controller, 'styles', styles);
  },

  serialize(model) {
    return { slug: get(model, 'slug') };
  },
});
