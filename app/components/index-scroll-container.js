import Ember from 'ember';
import v from 'npm:vudu';
import c, { vars } from 'site/lib/vudu';

const {
  get,
  Component,
  inject: { service },
} = Ember;

const styles = v({
  indexScrollContainerComponent: {
    '@composes': [c.col11, c.mxAuto, c.bgLightGray],
  }
});

const INDEX_PAGE_ID = '#index-route-scroll-context';

export default Component.extend({
  classNames: [styles.indexScrollContainerComponent],
  styles,
  sanctu: service(),
  router: service('-routing'),

  didInsertElement() {
    this.scrollToIndexSubsection(get(this, 'indexSubSection'));
  },

  didReceiveAttrs() {
    if (get(this, 'sanctu.duringWaypointHit')) { return; }
    this.scrollToIndexSubsection(get(this, 'indexSubSection'));
  },

  scrollToIndexSubsection(section) {
    let $indexPage = Ember.$(INDEX_PAGE_ID);
    let $indexPageSubsection = Ember.$(INDEX_PAGE_ID + ' .index--' + (section || 'info'));
    if (($indexPage.length === 0) || ($indexPageSubsection.length === 0)) { return; }

    let scrollTop = $indexPage.scrollTop() + $indexPageSubsection.offset().top - vars.navBarHeight;
    $indexPage.stop().animate(
      { scrollTop },
      vars.pageTransitionDuration,
      'swing'
    );
  }
});
