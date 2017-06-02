import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  Route,
  set,
} = Ember;

const MINUS_HEIGHT = '450px';

const styles = v({
  productContainerHeight: {
    maxHeight: `calc(100vh - ${MINUS_HEIGHT})`,
  },

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
