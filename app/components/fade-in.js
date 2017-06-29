import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  get,
  set,
  Component,
} = Ember;

const styles = v({
  initial: {
    opacity: 0,
    transform: 'translateY(10px)',
  },
  fadeIn: {
    transition: '600ms ease-in-out',
    transform: 'translateY(0)',
    opacity: 1,
  },
});

export default Component.extend({
  classNames: [styles.initial],
  styles,
  activeScrollContainer: null,

  didInsertElement() {
    let innerScrollingContainerClass = v(c).liquidInner;
    let $scrollContainer = $(`.${innerScrollingContainerClass}`);
    let offsetTop = this.getOffsetTop();
    set(this, 'activeScrollContainer', $scrollContainer);

    Ember.run.next(this, () => {
      get(this, 'activeScrollContainer').scrollTop(offsetTop, 0)
      this.$().addClass(styles.fadeIn);
    });
  },
  didUpdateAttrs() {
    let scrollContainer = get(this, 'activeScrollContainer');
    let offsetTop = this.getOffsetTop();

    this.$().removeClass(styles.fadeIn);
    Ember.run.next(this, () => {
      scrollContainer.scrollTop(offsetTop, 0)
      this.$().addClass(styles.fadeIn);
    });
  },

  getOffsetTop() {
    let topLevelContent = v(c).topLevelContent;
    let $topLevelContent = $(`.${topLevelContent}`);
    return $topLevelContent[0].offsetTop;
  },
});
