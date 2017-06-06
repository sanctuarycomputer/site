import Ember from 'ember';
const { get, Route } = Ember;

export default Route.extend({
  model(params) {
    return this.store.queryRecord('project', {
      'fields.slug': params.slug
    });
  },

  serialize(model) {
    return { slug: get(model, 'slug') };
  },
});
