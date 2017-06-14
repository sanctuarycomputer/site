import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  get,
  set,
  Route,
  inject: { service }
} = Ember;

const styles = v({
  feedItem: {
    '@composes': [c.borderBottomThin],
    display: 'flex'
  }
});

export default Route.extend({
  sanctu: service(),

  setupController(controller) {
    set(controller, 'sanctu', get(this, 'sanctu'));
    set(controller, 'styles', styles);
    set(controller, 'v', v(c));
  }
});
