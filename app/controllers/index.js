import Ember from 'ember';

const {
  get,
  set,
  inject: { service },
  computed: { alias },
  Controller
} = Ember;

export default Controller.extend({
  sanctu: service(),
  queryParams: ['s'],
  s: alias('sanctu.indexSubSection'),

  actions: {
    didHitWaypoint(section, prevSection, direction) {
      if (get(this, 'sanctu.duringAutoScroll')) { return; }

      set(this, 'sanctu.duringWaypointHit', true);
      if (direction === "down") {
        set(this, 'sanctu.indexSubSection', section);
      } else {
        set(this, 'sanctu.indexSubSection', prevSection);
      }
      get(this, 'sanctu').computeNavLabel();
      setTimeout(() => set(this, 'sanctu.duringWaypointHit', false), 1);
    }
  }
});
