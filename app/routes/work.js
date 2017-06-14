import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';
import ScrollToBottomMixin from 'site/mixins/scroll-to-bottom';

const {
  set,
  Route
} = Ember;

const styles = v({
  workRoute: {
    top: 0
  },
});

export default Route.extend(ScrollToBottomMixin, {
  model() {
    return this.store.findAll('project')
  },

  setupController(controller) {
    this._super(...arguments);
    set(controller, 'styles', styles);
    set(controller, 'v', v(c));
  }
});
