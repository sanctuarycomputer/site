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
  animationComplete: false,
  didSubmitEmail: false,
  cloudsWatch: null,

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

  animationCompleted() {
    set(this, 'animationComplete', true)
    set(this, 'cloudOverlayIsShowing', true);
  },

  toggleMobileNav(reverseCallback) {
    if(get(this, 'mobileNavIsAnimating')) { return; }

    const didBecomeActive = get(this, 'mobileNavShowing');

    let $mobileNav = Ember.$('.GLOBAL--mobile-nav-bar');
    let $logoMobile = $mobileNav.find('.logo-mobile');
    let $xIcon = $mobileNav.find('.x-icon');
    let $menuIcon = $mobileNav.find('.menu-icon');
    let $strike = $mobileNav.find('.strike');
    let $bind = $mobileNav.find('.bind');

    let $mobileNavContent = Ember.$('.GLOBAL--mobile-nav-content');
    let $mobileNavLinks = $mobileNavContent.find('.mobile-nav-link');

    let tl = new TimelineLite();

    /* NAV BAR */
    //Menu icon
    tl.from($menuIcon, 0.25, { css: { transform: 'translateZ(0)', opacity: 1, display: 'initial' }, ease: Cubic.easeInOut }, 'initial')
      .to($menuIcon, 0.25, { css: { transform: 'translateZ(100px)', opacity: 0, display: 'none' }, ease: Cubic.easeInOut }, 'initial');
    //X icon
    tl.from($xIcon, 0.25, { css: { transform: 'translateZ(-100px)', opacity: 0, display: 'none' }, ease: Cubic.easeInOut }, 'initial')
      .to($xIcon, 0.25, { css: { transform: 'translateZ(0)', opacity: 1, display: 'initial' }, ease: Cubic.easeInOut }, 'initial');
    //Nav Bind
    tl.from($bind, 0.25, { opacity: 1, display: 'block', ease: Cubic.easeInOut}, 'initial')
      .to($bind, 0.25, { opacity: 0, display: 'none', ease: Cubic.easeInOut}, 'initial');
    //Strike
    tl.from($strike, 0.25, { opacity: 1, display: 'block', css: { left: '50%' }, ease: Cubic.easeInOut }, 'initial')
      .to($strike, 0.25, { opacity: 0, display: 'none', css: { left: '200%' }, ease: Cubic.easeInOut }, 'initial');
    //Logo
    tl.from($logoMobile, 0.35, { opacity: 0, display: 'none', ease: Cubic.easeInOut }, 'initial+=0.25')
      .to($logoMobile, 0.35, { opacity: 1, display: 'initial', ease: Cubic.easeInOut }, 'initial+=0.25');

    /* NAV CONTENT */
    //Nav content
    tl.from($mobileNavContent, 0.1, { css: { opacity: 0, zIndex: 1, pointerEvents: 'none' }, ease: Cubic.easeInOut }, 'initial')
      .to($mobileNavContent, 0.1, { css: { opacity: 1, zIndex: 3, pointerEvents: 'auto' }, ease: Cubic.easeInOut }, 'initial');

    //Nav links
    tl.staggerFrom($mobileNavLinks, 0.25, { css: { opacity: 0, transform: 'translateY(-10px)'}, ease: Cubic.easeInOut}, 0.1)
      .staggerTo($mobileNavLinks, 0.25, { css: { opacity: 1, transform: 'translateY(0)'}, ease: Cubic.easeInOut}, 0.1);

    tl.eventCallback("onStart", () => set(this, 'mobileNavIsAnimating', true));
    tl.eventCallback("onComplete", () => set(this, 'mobileNavIsAnimating', false));
    if (reverseCallback) {
      tl.eventCallback("onReverseComplete", () => reverseCallback());
    }

    if(didBecomeActive) {
      tl.reverse(0).timeScale(2);
    } else {
      tl.play();
    }
    this.toggleProperty('mobileNavShowing');
  },

  cloudsDidRender(clouds) {
    /* At this point, the first render has happened. We can run the animation! */
    let initialHide = Ember.$('.initial-hide');
    let application        = Ember.$(`.${get(this, 'applicationRouteClass')}`);
    let mainContainer      = application.find('.liquid-container:last');
    let imageAnimation     = Ember.$('.GLOBAL--image-animation');
    let desktopNav         = Ember.$('.GLOBAL--nav-bar');
    let mobileNav          = Ember.$('.GLOBAL--mobile-nav-bar');
    let desktopViewHeight  = Ember.$(window).height() - desktopNav.height();
    let mobileViewHeight   = Ember.$(window).height() - mobileNav.height();
    let navStartingFromTop = !!desktopNav.attr('data-top');
    let isRoot             = window.location.pathname === "/";

    Ember.$(initialHide).css('opacity', 1);
    Ember.$(mainContainer).css('opacity', 1);

    let timeline = new TimelineLite().from(clouds, 1.5, { opacity: 0 });

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
    timeline.eventCallback("onComplete", () => this.animationCompleted());
    timeline.play();
  }
});
