import Ember from 'ember';
import v from 'npm:vudu';
import c, { vars, breakpoints } from 'site/lib/vudu';

const {
  Route,
  get,
  set,
  $,
} = Ember;

const styles = v({
  shopShow: {
    display: 'block',
    [breakpoints.md]: {
      '@composes': [c.p2],
      display: 'flex',
      height: `calc(100vh - ${vars.navBarHeight}px)`,
      '.slick-slider': {
        '@composes': [c.fullWidth, c.fullHeight],
      },
      '.slick-slider .slick-list': {
        height: '100% !important',
      },
      '.slick-slider .slick-track': {
        '@composes': [c.fullWidth, c.fullHeight],
      },
      '.slick-slider .slick-next': {
        position: 'absolute',
        left: 0,
        top: '50%',
        right: 0,
        bottom: 0,
        height: '100%',
        width: '100%',
        opacity: 0,
        zIndex: 1,
      },
      '.slick-slider .slick-prev': {
        display: 'none',
      },
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
