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
  ajax: service(),
  sanctu: service(),

  setupController(controller) {
    if (!get(this, 'sanctu.feedData')) {
      get(this, 'ajax').request('https://sanctucompu-medium.herokuapp.com/').then(data => {
        set(this, 'sanctu.feedData', data.rss.channel.item);
        console.log(data)
      });
    }

    set(controller, 'sanctu', get(this, 'sanctu'));
    set(controller, 'styles', styles);
    set(controller, 'v', v(c));
  }
});
