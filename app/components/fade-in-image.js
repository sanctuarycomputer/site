import Ember from 'ember';
import InViewportMixin from 'ember-in-viewport';
import v from 'npm:vudu';
import c, { breakpoints } from 'site/lib/vudu';

const {
  Component,
  get,
  set,
  $,
} = Ember;

const styles = v({
  fadeInImage: {
    transition: '500ms ease-in-out',
    opacity: 0,
  },
  fadeIn: {
    opacity: 1,
  },
});

export default Component.extend(InViewportMixin, {
  classNameBindings: [`fadeIn:${styles.fadeIn}`],
  classNames: [styles.fadeInImage],
  imageSrc: null,
  fadeIn: Ember.computed.and('isInView', 'isLoaded'),
  isInView: false,
  isLoaded: false,
  styles,

  didEnterViewport() {
    set(this, 'isInView', true);
  },

  didInsertElement() {
    this._super(...arguments);
    this.setupImage();
  },

  setupImage() {
    let isBackgroundImage = get(this, 'tagName') === 'div';
    let imageSource = get(this, 'imageSource');
    let imageLoader = new Image();

    imageLoader.onload = set(this, 'isLoaded', true);

    if (isBackgroundImage) {
      this.$().css('background-image', `url(${imageSource})`);
    } else {
      this.$()[0].src = imageSource;
    }
  },

});
