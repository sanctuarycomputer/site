import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  set,
  Route
} = Ember;

const styles = v({
  feedRoute: {
    top: 0
  },
  feedWrapper: {
    '@composes': [c.px5]
  },
  feedItem: {
    borderBottom: `1px solid ${c.black.color}`,
    display: 'flex'
  }
});

export default Route.extend({
  model() {
    return [
      {
        id: 1,
        title: 'Kalabasis',
        date: '10.11.17'
      },
      {
        id: 2,
        title: 'Kalabasis',
        date: '10.11.17'
      },
      {
        id: 3,
        title: 'Kalabasis',
        date: '10.11.17'
      }
    ]
  },

  setupController(controller) {
    this._super(...arguments);
    set(controller, 'styles', styles);
    set(controller, 'v', v(c));
  }
});
