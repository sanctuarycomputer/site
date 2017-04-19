import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.queryRecord('product', {
      'fields.slug': params.slug
    });
  },
  serialize(model) {
    return { slug: get(model, 'slug') };
  }
});
