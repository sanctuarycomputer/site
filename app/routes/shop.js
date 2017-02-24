import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  set,
  Route
} = Ember;

const styles = v({
  feedRoute: {
    '@composes': [c.liquidInner],
    top: 0
  }
});

export default Route.extend({
  setupController(controller) {
    set(controller, 'styles', styles);
  }
});
