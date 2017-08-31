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
    opacity: 1,
    height: `${vars.navBarHeight}px`,
    backgroundColor: `${c.white.color}`,
    width: '100%',
    position: 'fixed',
    zIndex: 3,
    display: 'flex',
    alignItems: 'center',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'transparent',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'transparent',
    transition: `background-color 1s ease-out, border-top-color ${vars.pageTransitionDuration}ms, border-bottom-color ${vars.pageTransitionDuration}ms`
  },
  inner: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    margin: 'auto'
  },
  link: {
    '@composes': [c.black, c.navLink],
    flexGrow: 1,
    flexBasis: 0,
    textAlign: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  logo: {
    '@composes': [c.mx3]
  },
  'span': {
    transition: `color ${vars.pageTransitionDuration}ms ease-out`
  },
  stripe: {
    height: '1px',
    left: 0,
    position: 'absolute',
    backgroundColor: c.black.color,
    transition: `300ms ease-out, opacity 1000ms ease-out 1000ms`,
    transform: 'translateY(-5px)',
  },
  stripeHidden: {
    opacity: 0
  },
  preInteraction: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent !important',
    'span': { color: 'white' },
    'img': { opacity: 0 }
  }
});

export default Component.extend({
  classNames: ['GLOBAL--nav-bar', styles.navBarComponent],
  classNameBindings: [`isPreInteraction:${styles.preInteraction}`],
  styles,

  sanctu: service(),
  isPreInteraction: Ember.computed.alias('sanctu.isPreInteraction'),

  positionStripe() {
    let $linkEl = this.$(`a:contains(${get(this, 'sanctu.navLabel')})`);
    let $textNode = $($linkEl.children()[0]);
    let width = $textNode.outerWidth() + 30;
    let left = $textNode.offset().left - 15;
    this.$('.GLOBAL--nav-bar--stripe').css({
      width: `${width}px`,
      transform: `translate(${left}px, 6px)`
    });
  },

  setupDOM() {
    if (window.location.pathname !== "/") {
      let viewHeight = Ember.$(window).height() - this.$().height();
      this.$().css({
        'transform': `translateY(${viewHeight}px)`,
        'border-top-color': `${c.black.color}`
      });
    } else {
      this.$().attr('data-top', true);
      this.$().css({
        'border-bottom-color': `${c.black.color}`
      });
    }
  },

  didInsertElement() {
    this.setupDOM()
    Ember.$(window).on('resize', () => this.setupDOM());

    let logoLoader = new Image();
    logoLoader.onload = () => this.positionStripe();
    logoLoader.src = this.$('img').get(0).src;

    get(this, 'sanctu').addObserver('navLabel', this, 'positionStripe');
    this.$(window).resize(() => this.positionStripe());
  },

  actions: {
    clickedIndexSubsection() {
      if (get(this, 'isPreInteraction')) {
        return get(this, 'sanctu').didInteract().then(() => {
          get(this, 'clickedIndexSubsection')(...arguments);
        });
      }
      get(this, 'clickedIndexSubsection')(...arguments);
    },
    clickedMainSection(section) {
      if (get(this, 'isPreInteraction')) {
        return get(this, 'sanctu').didInteract(false).then(() => {
          this.attrs.makeTransition(section);
        });
      }
      this.attrs.makeTransition(section);
    }
  }

});
