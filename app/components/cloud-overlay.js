import Ember from 'ember';
import vudu from 'npm:vudu';
import { vars } from 'site/lib/vudu';

const {
  Component,
  inject: { service },
  computed: {
    alias,
  },
} = Ember;

const styles = vudu({
  cloudOverlay: {
    pointerEvents: 'none',
    display: 'none',
    height: `calc(100% - (${vars.navBarHeight}px + 10vw))`,
    left: 0,
    right: 0,
    position: 'fixed',
    zIndex: 1,
  },
  active: {
    display: 'block',
  },
  positionTop: {
    top: 0,
    bottom: 'auto',
    '.arrow-wrapper': {
      bottom: '10%',
    }
  },
  positionBottom: {
    top: '20%',
    bottom: 0,
    '.arrow-wrapper': {
      top: '14%',
    }
  },
});

export default Component.extend({
  classNameBindings: [`active:${styles.active}`, `positionTop:${styles.positionTop}`, `positionBottom:${styles.positionBottom}`],
  classNames: [styles.cloudOverlay],
  styles,
  sanctu: service(),
  active: alias('sanctu.cloudOverlayIsShowing'),
  positionTop: false,
  positionBottom: false,
});
