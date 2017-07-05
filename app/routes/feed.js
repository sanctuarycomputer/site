import Ember from 'ember';
import v from 'npm:vudu';
import c, { vars } from 'site/lib/vudu';
import moment from 'moment';

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
    '@composes': [c.col12, c.lgCol10, c.mxAuto, c.pt5, c.flex, c.flexColumn, c.justifyEnd],
    minHeight: `calc(100vh - ${vars.navBarHeight}px)`,
  },
});

export default Route.extend({
  ajax: service(),
  sanctu: service(),

  setupController(controller) {
    if (!get(this, 'sanctu.feedData')) {
      get(this, 'ajax').request('https://sanctucompu-medium.herokuapp.com/').then(data => {
        const sortedByDate = data.rss.channel.item.sort((a, b) => {
          return moment(a.pubDate).format('x') - moment(b.pubDate).format('x');
        });
        set(this, 'sanctu.feedData', sortedByDate);
      });
    }

    set(controller, 'sanctu', get(this, 'sanctu'));
    set(controller, 'styles', styles);
    set(controller, 'v', v(c));
  }
});
