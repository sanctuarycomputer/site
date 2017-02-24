import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  set,
  get,
  inject: { service },
  Route
} = Ember;

const styles = v({
  applicationRoute: {
    height: '100%'
  },
  mobileNavContent: {
    width: '100%',
    height: '100%'
  }
});

export default Route.extend({
  sanctu: service(),

  setupController(controller) {
    this._super(...arguments);
    set(controller, 'sanctu', get(this, 'sanctu'));
    set(controller, 'styles', styles);
    set(controller, 'v', v(c));
  },

  actions: {
    clickedIndexSubsection(section) {
      if (get(this, 'router.currentRouteName') === "index") {
        return set(this, 'sanctu.indexSubSection', section);
      }
      return this.transitionTo('index', { queryParams: { s: section }});
    }
  }
});
