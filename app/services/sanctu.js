import Ember from 'ember';

const {
  get,
  set,
  Service,
  inject: { service },
} = Ember;

export default Service.extend({
  navLabel: 'Info',
  indexSubSection: null,
  cloudOverlayIsShowing: false,

  router: service('-routing'),

  feedData: null,

  init() {
    this.computeNavLabel();
    get(this, 'router').addObserver('currentRouteName', this, 'computeNavLabel');
  },

  computeNavLabel() {
    set(this, 'mobileNavShowing', false);
    let navLabel;
    switch (get(this, 'router.currentRouteName')) {
      case 'index':
        switch (get(this, 'indexSubSection')) {
          case 'jobs':
            navLabel = 'Jobs';
            break;
          case 'contact':
            navLabel = 'Contact';
            break;
          default:
            navLabel = 'Info';
            break;
        }
        break;
      case 'feed.index':
      case 'feed.show':
        navLabel = 'Feed';
        break;
      case 'work.index':
      case 'work.show':
        navLabel = 'Work';
        break;
      case 'shop.index':
      case 'shop.show':
        navLabel = 'Shop';
        break;
    }
    set(this, 'navLabel', navLabel);
  },

  showCloudOverlay() {
    set(this, 'cloudOverlayIsShowing', true);
  },

  cloudsDidRender(clouds) {
    /* At this point, the first render has happened. We can run the animation! */
    let application        = Ember.$(`.${get(this, 'applicationRouteClass')}`);
    let mainContainer      = application.find('.liquid-container:last');
    let imageAnimation     = Ember.$('.GLOBAL--image-animation');
    let desktopNav         = Ember.$('.GLOBAL--nav-bar');
    let mobileNav          = Ember.$('.GLOBAL--mobile-nav-bar');
    let desktopViewHeight  = Ember.$(window).height() - desktopNav.height();
    let mobileViewHeight   = Ember.$(window).height() - mobileNav.height();
    let navStartingFromTop = !!desktopNav.attr('data-top');
    let isRoot             = window.location.pathname === "/";

    let timeline = new TimelineLite({ onComplete: () => { this.showCloudOverlay() }}).from(clouds, 1.5, { opacity: 0 });

    if (isRoot) {
      timeline
        .from(imageAnimation, 1.5, { opacity: 0, transform: "translateY(-20px)" }, "-=0.5")
        .to(imageAnimation, 1.5, { opacity: 0 }, "+=0.5")
    } else {
      imageAnimation.hide();
    }
    if (navStartingFromTop) {
      timeline
        .from(desktopNav, 1.2, { transform: `translateY(-${desktopNav.height()}px)` }, "entrance")
        .from(mobileNav, 1.2, { transform: `translateY(-${mobileNav.height()}px)` }, "entrance")
        .from(mainContainer, 1.2, { transform: `translateY(${mainContainer.outerHeight()}px)` }, "entrance")
    } else {
      timeline
        .from(desktopNav, 1.2, { transform: `translateY(${desktopViewHeight + desktopNav.height()}px)` }, "entrance")
        .from(mobileNav, 1.2, { transform: `translateY(${mobileViewHeight + mobileNav.height()}px)` }, "entrance")
        .from(mainContainer, 1.2, { transform: `translateY(${-mainContainer.outerHeight()}px)` }, "entrance")
    }
    timeline.play();
  }
});
