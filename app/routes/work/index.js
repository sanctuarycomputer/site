import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

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
    toggleTypeFilter(type) {
      let allProjects      = get(this, 'controller.allProjects');
      let activeTypeFilter = get(this, 'controller.typeFilter');
      let activeTechFilter = get(this, 'controller.techFilter');

      if (activeTechFilter) {
        if (activeTypeFilter && activeTypeFilter === type) {
          let filtered = filteredByType.filter((pj) => {
            if (pj.get('technology')) {
              return pj.get('technology').includes(activeTechFilter);
            }
          });
          set(this, 'controller.typeFilter', null);
          return set(this, 'controller.model', filtered);
        }
        let filteredByTech = allProjects.filter((pj) => {
          if (pj.get('technology')) {
            return pj.get('technology').includes(activeTechFilter);
          }
        });
        let filtered = filteredByTech.filterBy('projectType', type);
        set(this, 'controller.typeFilter', type);
        return set(this, 'controller.model', filtered);
      }
      if (activeTypeFilter && activeTypeFilter === type) {
        set(this, 'controller.typeFilter', null);
        return set(this, 'controller.model', allProjects)
      }
      let filtered = allProjects.filterBy('projectType', type);
      set(this, 'controller.typeFilter', type);
      return set(this, 'controller.model', filtered);
    },
    toggleTechFilter(tech) {
      let allProjects      = get(this, 'controller.allProjects');
      let activeTechFilter = get(this, 'controller.techFilter');
      let activeTypeFilter = get(this, 'controller.typeFilter');

      //If projects are filtered by type
      if (activeTypeFilter) {
        //Toggle active tech filter off
        //filter projects by just type
        if (activeTechFilter && activeTechFilter === tech) {
          let filtered = allProjects.filterBy('projectType', activeTypeFilter);
          set(this, 'controller.techFilter', null);

          return set(this, 'controller.model', filtered);
        }
        //Filter by active type filter &&
        //active tech filter
        let filteredByType = allProjects.filterBy('projectType', activeTypeFilter);
        let filtered = filteredByType.filter((pj) => {
          if (pj.get('technology')) {
            return pj.get('technology').includes(tech);
          }
        });

        set(this, 'controller.techFilter', tech);
        return set(this, 'controller.model', filtered);
      }

      if (activeTechFilter && activeTechFilter === tech) {
        set(this, 'controller.techFilter', null);

        return set(this, 'controller.model', allProjects);
      }
      //Filter projects by active tech filter
      let filtered = allProjects.filter((pj) => {
        if (pj.get('technology')) {
          return pj.get('technology').includes(tech);
        }
      });

      set(this, 'controller.techFilter', tech);
      return set(this, 'controller.model', filtered);
    },
    clearFilters() {
      set(this, 'controller.techFilter', null);
      set(this, 'controller.typeFilter', null);

      return set(this, 'controller.model', get(this, 'controller.allProjects'));
    },
  }
});
