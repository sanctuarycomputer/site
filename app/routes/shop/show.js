import Ember from 'ember';
import v from 'npm:vudu';
import c, { vars, breakpoints } from 'site/lib/vudu';

const {
  Route,
  get,
  set,
} = Ember;

const styles = v({
  shopShow: {
    display: 'block',
    [breakpoints.md]: {
      '@composes': [c.p2],
      display: 'flex',
      height: `calc(100vh - ${vars.navBarHeight}px)`,
    }
  },
  productImage: {
    height: '400px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    [breakpoints.md]: {
      height: '100%',
    },
  },
  contentContainer: {
    '@composes': [c.col12, c.mdCol6, c.flex, c.flexColumn, c.px2, c.py4],
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
