import Ember from 'ember';

const {
  Route,
  set,
} = Ember;


export default Route.extend({
  model(params) {
    return this.store.queryRecord('product', {
      'fields.slug': params.slug
    });
  },

  serialize(model) {
    return { slug: get(model, 'slug') };
  },
});
