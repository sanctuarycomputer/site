import Ember from 'ember';
import { TimelineLite, easing } from 'gsap';

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
  activeProject: null,
  isPreInteraction: true,

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
    let $labelParent = $mobileNav.find('.label-parent');

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
    tl.from($labelParent, 0.25, { opacity: 1, display: 'flex', ease: Cubic.easeInOut}, 'initial')
      .to($labelParent, 0.25, { opacity: 0, display: 'none', ease: Cubic.easeInOut}, 'initial');
    //Strike
    tl.from($strike, 0.25, { opacity: 1, display: 'block', css: { left: '50%' }, ease: Cubic.easeInOut }, 'initial')
      .to($strike, 0.25, { opacity: 0, display: 'none', css: { left: '200%' }, ease: Cubic.easeInOut }, 'initial');
    //Logo
    tl.from($logoMobile, 0.35, { opacity: 0, display: 'none', ease: Cubic.easeInOut }, 'initial+=0.25')
      .to($logoMobile, 0.35, { opacity: 1, display: 'block', ease: Cubic.easeInOut }, 'initial+=0.25');

    /* NAV CONTENT */
    // Nav content
    tl.from($mobileNavContent, 0.1, { css: { opacity: 0, zIndex: 1, pointerEvents: 'none' }, ease: Cubic.easeInOut }, 'initial')
      .to($mobileNavContent, 0.1, { css: { opacity: 1, zIndex: 3, pointerEvents: 'auto' }, ease: Cubic.easeInOut }, 'initial');

    //Nav links
    tl.staggerFromTo($mobileNavLinks, 0.25,
      { css: { opacity: 0, transform: 'translateY(-10px)'}, ease: easing.Expo.easeOut },
      { css: { opacity: 1, transform: 'translateY(0)'}, ease: easing.Expo.easeIn },
    0.1, 'initial')

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
    const ease = easing.Expo.easeInOut;
    /* At this point, the first render has happened. We can run the animation! */
    const initialHide      = Ember.$('.initial-hide, .liquid-container');
    let application        = Ember.$(`.${get(this, 'applicationRouteClass')}`);
    let mainContainer      = application.find('.liquid-container.main');
    let imageAnimation     = Ember.$('.GLOBAL--image-animation');
    let desktopNav         = Ember.$('.GLOBAL--nav-bar');
    let mobileNav          = Ember.$('.GLOBAL--mobile-nav-bar');
    let mobileNavContent   = Ember.$('.GLOBAL--mobile-nav-content');
    let desktopViewHeight  = Ember.$(window).height() - desktopNav.height();
    let mobileViewHeight   = Ember.$(window).height() - mobileNav.height();
    let navStartingFromTop = !!desktopNav.attr('data-top');
    let isRoot             = window.location.pathname === "/";
    Ember.$(initialHide).css('opacity', 1);

    let timeline = new TimelineLite().from(clouds, 1.5, { opacity: 0 });

    mainContainer.find('.initially-hidden').removeClass('initially-hidden');
    if (isRoot) {
      mobileNavContent.css({ 'height': '100%' });
      timeline
      .to(desktopNav, 0, { y: (mainContainer.outerHeight() / 2) - (desktopNav.height() / 2) }, 0)
      .to(mobileNavContent, 0, { y: 0 }, 0)

      .fromTo(imageAnimation, 2, { z: 800 }, { z: 0, ease: easing.Power4.easeOut }, 2)
      .fromTo(imageAnimation, 4, { opacity: 0 }, { opacity: 1, ease: easing.Power3.easeOut }, 2)

      .fromTo(desktopNav, 2, { z: -100 }, { z: 0, ease: easing.Power4.easeOut }, 2.75)
      .fromTo(desktopNav, 6, { opacity: 0 }, { opacity: 1, ease: easing.Power2.easeOut }, 2.75)

      .fromTo(mobileNavContent, 2, { z: -100 }, { z: 0, ease: easing.Power4.easeOut }, 2.75)
      .fromTo(mobileNavContent, 6, { opacity: 0 }, { opacity: 1, ease: easing.Power2.easeOut }, 2.75)
    }

    if (navStartingFromTop) {
      mobileNav.hide();
      let $scroll = mainContainer.find('.detectScroll');
      $scroll.scrollTop(0);
      mainContainer.hide();
      let preInteractionTimeline = new TimelineLite()
          .to(imageAnimation, 0.2, { opacity: 0, y: -10, ease: easing.Expo.easeIn })
          .pause()
      set(this, 'preInteractionTimeline', preInteractionTimeline);
    } else {
      set(this, 'isPreInteraction', false);
      imageAnimation.hide();
      let $scroll = mainContainer.find('.detectScroll');
      $scroll.scrollTop($scroll[0].scrollHeight);
      timeline
        .from(desktopNav, 0.8, { y: desktopViewHeight + desktopNav.height(), ease }, "entrance")
        .from(mainContainer, 1.2, { y: -mainContainer.outerHeight(), ease, delay: 0.2 }, "entrance")
      timeline.play();
    }
    timeline.eventCallback("onComplete", () => this.animationCompleted());
  },

  didInteract(navShouldBeTop = true) {

    const ease            = easing.Expo.easeInOut;
    const application     = Ember.$(`.${get(this, 'applicationRouteClass')}`);
    const mainContainer   = application.find('.liquid-container.main');
    const timeline        = get(this, 'preInteractionTimeline');
    let imageAnimation    = Ember.$('.GLOBAL--image-animation');
    let desktopNav        = Ember.$('.GLOBAL--nav-bar');
    let desktopViewHeight = Ember.$(window).height() - desktopNav.height();
    let mobileNav         = Ember.$('.GLOBAL--mobile-nav-bar');
    let mobileNavContent   = Ember.$('.GLOBAL--mobile-nav-content');

    setTimeout(() => { set(this, 'isPreInteraction', false); }, 200);
    if (navShouldBeTop) {
      timeline
        .to(desktopNav, 1.2, { y: 0, ease }, "entrance")
        .fromTo(mobileNav, 1.2, { y: -mobileNav.height() }, { y: 0, ease: easing.Expo.easeOut }, "entrance")
        .from(mainContainer, 1.2, { y: mainContainer.outerHeight(), ease, }, "entrance")
        .to(mobileNavContent, 0, { y: mobileNav.height() + 2 }, "entrance+=0.5")
    } else {
      let distance = mainContainer.outerHeight() - desktopNav.height();
      let mobileDistance = mainContainer.outerHeight() - mobileNav.height();
      // the darkest code i have ever written
      document.OPT_OUT_OF_FIRST_BOTTOM_TO_TOP_TRANSITION = true;
      desktopNav.css({
        'border-top-color': `black`,
        'border-bottom-color': `transparent`
      });
      mobileNav.css({
        'border-top-color': `black`,
        'border-bottom-color': `transparent`
      });
      $('.detectScroll').css({ bottom: 'auto' });
      $('.index-scroll-container-component').css({ opacity: 0 });
      timeline
        .to(desktopNav, 1.2, { y: distance, ease }, "entrance")
        .fromTo(mobileNav, 1.2, { y: mainContainer.height() }, { y: mobileDistance, ease: easing.Expo.easeOut }, "entrance")
        .from(mainContainer, 1.2, { y: -mainContainer.outerHeight(), ease, delay: 0.2 }, "entrance")
    }
    return new Ember.RSVP.Promise(resolve => {
      timeline.eventCallback("onComplete", () => {
        mobileNavContent.css({ 'height': '' });
        resolve();
      });
      mobileNav.show();
      mainContainer.show();
      timeline.play();
    });
  },

});
