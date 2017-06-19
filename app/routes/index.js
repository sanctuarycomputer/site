/* jshint multistr: true */

import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  set,
  inject: { service },
  Route,
} = Ember;

const styles = v({
  indexRoute: {
    //'@composes': [c.bgLightGray],
    bottom: 0,
    '.section': {
      '@composes': [c.py4, c.mb6],
    },
    '.sub-section': {
      '@composes': [c.mb5],
    },
    '.block': {
      display: 'block',
    },
  },
  triangleContainer: {
    width: '100%',
    img: {
      width: '100%',
    },
  },
});

export default Route.extend({
  sanctu: service(),
  v: v(c),

  model() {
    return this.store
      .findAll('copy')
      .then(copies => [
        copies.findBy('title', 'info'),
        copies.findBy('title', 'jobs'),
        copies.findBy('title', 'contact'),
      ]);
  },

  setupController(controller) {
    this._super(...arguments);
    set(controller, 'styles', styles);
    set(controller, 'v', v(c));
  },
});
