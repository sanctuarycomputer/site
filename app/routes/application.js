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
    height: '100%',
  },
  mobileNavContent: {
    width: '100%',
    height: '100%'
  },
  imageAnimation: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    zIndex: 1,
    opacity: 1,
    pointerEvents: 'none'
  },
  imageAnimationLogo: {
    maxWidth: '300px',
    position: 'relative',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }
});

export default Route.extend({
  sanctu: service(),

  setupController(controller) {
    this._super(...arguments);
    set(controller, 'sanctu', get(this, 'sanctu'));
    set(controller, 'sanctu.applicationRouteClass', styles.applicationRoute);
    set(controller, 'styles', styles);
    set(controller, 'v', v(c));
    console.log(v(c));
  },

  actions: {
    clickedIndexSubsection(section) {
      if (get(this, 'router.currentRouteName') === "index") {
        return set(this, 'sanctu.indexSubSection', section);
      }
      return this.transitionTo('index', { queryParams: { s: section }});
    }
  },
});
