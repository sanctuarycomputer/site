import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  set,
  Route
} = Ember;

const styles = v({
  indexRoute: {
    '@composes': [c.liquidInner],
    bottom: 0,
    backgroundColor: c.lightGray.color,
  },
  triangleContainer: {
    width: '100%',
    'img': {
      width: '100%',
    }
  }

});

export default Route.extend({
  model() {
    return [
      {
        category: null,
        copy: 'hello'
      },
    ]
  },

  setupController(controller) {
    set(controller, 'styles', styles);
  }
});
