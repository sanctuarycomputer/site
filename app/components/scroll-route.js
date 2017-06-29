import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  Component,
  $,
} = Ember;

export default Component.extend({
  contentLoaded: false,

  didInsertElement() {
    this._super(...arguments);
    if (this.get('contentLoaded')) {
      Ember.run.next(() => this.scrollToBottom());
    }
  },

  didUpdateAttrs() {
    this._super(...arguments);
    if (this.get('contentLoaded')) {
      Ember.run.next(() => this.scrollToBottom());
    }
  },

  scrollToBottom() {
    let innerScrollingContainerClass = v(c).liquidInner;
    let $scrollContainer = $(`.${innerScrollingContainerClass}`);
    let bottom = $scrollContainer.prop('scrollHeight');
    return $scrollContainer.scrollTop(bottom);
  },
});
