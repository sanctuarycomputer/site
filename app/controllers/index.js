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
    didHitWaypoint(section) {
      if (get(this, 'sanctu.isPreInteraction')) return;
      if (get(this, 'sanctu.duringAutoScroll')) { return; }
      set(this, 'sanctu.duringWaypointHit', true);
      set(this, 'sanctu.indexSubSection', section);
      get(this, 'sanctu').computeNavLabel();
      setTimeout(() => set(this, 'sanctu.duringWaypointHit', false), 1);
    }
  }
});
