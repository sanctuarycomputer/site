import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  Route,
  get,
  set,
  inject: { service },
} = Ember;

const styles = v({
  articleWrapper: {
    p: { '@composes': [c.p, c.spacer] },
    figure: {
      margin: '2rem 0',
      img: {
        width: '100%;'
      }
    },
    iframe: {
      width: '100%',
      maxWidth: '450px',
      display: 'block',
      margin: '0 auto',
      'body[style]': { backgroundColor: 'red !important'}
    },
    h1: { '@composes': [c.p]},
    h2: { '@composes': [c.p]},
    h3: { '@composes': [c.p]},
    h4: { '@composes': [c.p]},
    h5: { '@composes': [c.p]},
    h6: { '@composes': [c.p]},
    li: { '@composes': [c.p, c.sansLight, c.my4]},
    ul: { '@composes': [c.my4, c.pl2]},
    blockquote: { '@composes': [c.my4]}
  }
});

export default Route.extend({
  sanctu: service(),
  model(params) {
    return params.id;
  },

  setupController(controller, slug) {
    set(controller, 'slug', slug);
    set(controller, 'sanctu', get(this, 'sanctu'));
    set(controller, 'styles', styles);
    set(controller, 'v', v(c));
  }
});
