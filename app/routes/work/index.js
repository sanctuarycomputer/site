import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';
import { technologies } from 'site/lib/constants';

const {
  get,
  set,
  inject: { service },
  Route
} = Ember;

const styles = v({
  workWrapper: {
    '@composes': [c.mxAuto, c.col12, c.smCol11]
  },
});

export default Route.extend({
  sanctu: service(),
  model() {
    return this.modelFor('work');
  },

  setupController(controller, model) {
    this._super(...arguments);
    set(controller, 'allProjects', model);
    set(controller, 'typeFilter', null);
    set(controller, 'techFilter', null);
    set(controller, 'styles', styles);
    set(controller, 'v', v(c));
  },

  actions: {
    toggleFilter(filterName) {
      let type = technologies.includes(filterName) ? 'tech' : 'type';

      if (get(this, `controller.${type}Filter`) === filterName) {
        set(this, `controller.${type}Filter`, null);
      } else {
        set(this, `controller.${type}Filter`, filterName);
      }

      let activeTypeFilter = get(this, 'controller.typeFilter');
      let activeTechFilter = get(this, 'controller.techFilter');
      let allProjects      = get(this, 'controller.allProjects');
      let filtered         = Ember.A(allProjects);

      if (activeTechFilter) {
        filtered = filtered.filter(project => (get(project, 'technology') || []).includes(activeTechFilter));
      }
      if (activeTypeFilter) {
        filtered = filtered.filterBy('projectType', activeTypeFilter);
      }
      set(this, 'controller.model', filtered);
    },
    clearFilters() {
      set(this, 'controller.techFilter', null);
      set(this, 'controller.typeFilter', null);

      return set(this, 'controller.model', get(this, 'controller.allProjects'));
    },
  }
});
