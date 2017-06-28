import Ember from 'ember';
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
  isLoaded: {
    opacity: 1,
  },
});

export default Component.extend({
  classNameBindings: [`isLoaded:${styles.isLoaded}`],
  classNames: [styles.fadeInImage],
  imageSrc: null,
  isLoaded: false,
  styles,

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
