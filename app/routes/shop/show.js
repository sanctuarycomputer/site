import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  Route,
  set,
} = Ember;

const styles = v({
  productContainer:{
    display: 'block',
  }
});

export default Route.extend({
  model(params) {
    return this.store.queryRecord('product', {
      'fields.slug': params.slug
    });
  },

  serialize(model) {
    return { slug: get(model, 'slug') };
  },

  setupController(controller) {
    this._super(...arguments);
    set(controller, 'styles', styles);
    set(controller, 'v', v(c));
  }
});
