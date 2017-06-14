import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  Mixin,
  $,
} = Ember;

export default Mixin.create({

  activate() {
  this._super(...arguments);
    Ember.run.next(() => this.scrollToPosition())
  },

  scrollToPosition() {
    let innerScrollingContainerClass = v(c).liquidInner;
    let $scrollContainer = $(`.${innerScrollingContainerClass}`);
    let bottom = $scrollContainer.prop('scrollHeight');
    return $scrollContainer.animate({ scrollTop: bottom }, 1000);
  },
 });
