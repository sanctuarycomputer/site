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
    set(controller, 'filteredProjects', []);
    set(controller, 'typeFilter', null);
    set(controller, 'techFilters', []);
    set(controller, 'styles', styles);
    set(controller, 'v', v(c));
  },

  actions: {
    applyFilter(type, tech) {
      let filtered;
      if (type) {
        set(this, 'controller.typeFilter', type)
        filtered = get(this, 'controller.allProjects').filterBy('projectType', type);
      }
      if (tech) {
        let techArray = get(this, 'controller.techFilters');
        techArray.push(tech);
        filtered = get(this, 'controller.allProjects').filter((project) => {
          return project.get('technology').some(t =>  t === tech );
        })
      }
      return set(this, 'controller.model', filtered);
    },
    toggleTypeFilter(type) {
      let allProjects      = get(this, 'controller.allProjects');
      let filteredProjects = get(this, 'controller.filteredProjects');
      let activeTypeFilter = get(this, 'controller.typeFilter');

      if (filteredProjects) {
        if (activeTypeFilter && activeTypeFilter === type) {
          set(this, 'controller.typeFilter', null);
          set(this, 'controller.filteredProjects', []);
          return set(this, 'controller.model', allProjects);
        }
        let filtered = allProjects.filterBy('projectType', type);
        set(this, 'controller.typeFilter', type);
        set(this, 'controller.filteredProjects', filtered);
        return set(this, 'controller.model', filtered);
      }
      let filtered = allProjects.filterBy('projectType', type);
      set(this, 'controller.typeFilter', type);
      set(this, 'controller.filteredProjects', filtered);
      return set(this, 'controller.model', filtered);
    },
    toggleTechFilter(tech) {
      let allProjects           = get(this, 'controller.allProjects');
      let filteredProjects      = get(this, 'controller.filteredProjects');
      let activeTechFilterArray = get(this, 'controller.techFilters');

      if (filteredProjects.length) {
        if (activeTechFilterArray.some((t) => t === tech)) {
          let indexOfTechInArray = activeTechFilterArray.indexOf(tech);
          let newActiveTechFilterArray = activeTechFilterArray.splice(indexOfTechInArray, 1);
          debugger;
          set(this, 'controller.techFilters', newActiveTechFilterArray);
          let filtered = activeTechFilterArray.forEach((tf) => {
            return filteredProjects.filter((pj) => {
              return pj.get('technology').some((t) => { tf === t});
            });
          });
          set(this, 'controller.filteredProjects', filtered);
          return set(this, 'controller.model', filtered);
        }
        activeTechFilterArray.push(tech);
        set(this, 'controller.techFilters', activeTechFilterArray);
        let filtered = activeTechFilterArray.forEach((tf) => {
          return filteredProjects.filter((pj) => {
            return pj.get('technology').some(t => t === tf);
          });
        });
        set(this, 'controller.filteredProjects', filtered);
        return set(this, 'controller.model', filtered);
      };
      activeTechFilterArray.push(tech);
      set(this, 'controller.techFilters', activeTechFilterArray);
      let filtered = allProjects.filter((project) => {
        activeTechFilterArray.forEach((atf) => {
          return project.get('technology').some(t => t === atf)
        })
      });
      debugger;
      set(this, 'controller.filteredProjects', filtered);
      return set(this, 'controller.model', filtered);
    },
    clearFilters() {
      console.log('clear filters');
    },
  }
});

// clearFilters() {
//
// },
