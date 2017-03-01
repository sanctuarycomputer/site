import Ember from 'ember';
import v from 'npm:vudu';
import c, { vars } from 'site/lib/vudu';

const {
  get,
  inject: { service },
  Component
} = Ember;

const styles = v({
  navBarComponent: {
    height: `${vars.navBarHeight}px`,
    width: '100%',
    position: 'fixed',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'transparent',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'transparent',
    transition: `border-top-color ${vars.pageTransitionDuration}ms, border-bottom-color ${vars.pageTransitionDuration}ms`
  },
  inner: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    margin: 'auto'
  },
  link: {
    flexGrow: 1,
    flexBasis: 0,
    textAlign: 'center',
    fontSize: '2.6rem',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  logo: {
    '@composes': [c.mx3]
  },
  stripe: {
    height: '1px',
    left: 0,
    position: 'absolute',
    backgroundColor: c.black.color,
    transition: `${vars.pageTransitionDuration}ms`
  }
});

export default Component.extend({
  classNames: ['GLOBAL--nav-bar', styles.navBarComponent],
  styles,

  sanctu: service(),

  positionStripe() {
    let $linkEl = this.$(`a:contains(${get(this, 'sanctu.navLabel')})`);
    let width = $linkEl.outerWidth();
    let left = $linkEl.offset().left;
    this.$('.GLOBAL--nav-bar--stripe').css({
      width: `${width}px`,
      transform: `translateX(${left}px)`
    });
  },

  didInsertElement() {
    if (window.location.pathname !== "/") {
      let viewHeight = Ember.$(window).height() - this.$().height();
      this.$().css({
        'transform': `translateY(${viewHeight}px)`,
        'border-top-color': `${c.black.color}`
      });
    } else {
      this.$().css({
        'border-bottom-color': `${c.black.color}`
      });
    }

    let logoLoader = new Image();
    logoLoader.onload = () => this.positionStripe();
    logoLoader.src = this.$('img').get(0).src;

    get(this, 'sanctu').addObserver('navLabel', this, 'positionStripe');
    this.$(window).resize(() => this.positionStripe());
  },

  actions: {
    clickedIndexSubsection() {
      get(this, 'clickedIndexSubsection')(...arguments);
    }
  }

});
