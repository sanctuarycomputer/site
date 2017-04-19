import Ember from 'ember';

const {
  get,
  set,
  Service,
  inject: { service }
} = Ember;

export default Service.extend({
  navLabel: 'Info',
  indexSubSection: null,

  router: service('-routing'),

  init() {
    this.computeNavLabel();
    get(this, 'router').addObserver('currentRouteName', this, 'computeNavLabel');
  },

  computeNavLabel() {
    set(this, 'mobileNavShowing', false);
    let navLabel;
    switch (get(this, 'router.currentRouteName')) {
      case "index":
        switch (get(this, 'indexSubSection')) {
          case "jobs":
            navLabel = "Jobs";
            break;
          case "contact":
            navLabel = "Contact";
            break;
          default:
            navLabel = "Info";
            break;
        }
        break;
      case "feed.index":
      case "feed.show":
        navLabel = "Feed";
        break;
      case "work.index":
        navLabel = "Work";
        break;
      case "shop.index":
      case "shop.show":
        navLabel = "Shop";
        break;
    }
    set(this, 'navLabel', navLabel);
  }
});
