import Ember from 'ember';
import vudu from 'npm:vudu';
import c, { vars } from 'site/lib/vudu';

const {
  Component,
  get,
  computed,
  inject: { service },
  computed: {
    alias,
    equal,
  },
} = Ember;

const v = vudu(c);

const styles = vudu({
  cloudOverlay: {
    pointerEvents: 'none',
    display: 'none',
    height: `calc(100% - (${vars.navBarHeight}px + 14vw))`,
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
  },
  positionBottom: {
    top: '20%',
    bottom: 0,
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
