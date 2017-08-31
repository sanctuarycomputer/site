import Ember from 'ember';
import vudu from 'npm:vudu';
import c, { breakpoints } from 'site/lib/vudu';
import { TimelineLite, easing } from 'gsap';
const v = vudu(c);
const ease = easing.Expo.easeOut;

const DURATION = 240;

function random(min, max) {
  if (min < 0) {
    return min + Math.random() * (Math.abs(min)+max);
  }else {
    return min + Math.random() * max;
  }
}

const FADE_DURATION = 0.2;

const aspectRatio = (width, height, position='relative') => {
  return styles => {
    let before = {
      display: 'block',
      content: '""',
      width: '100%',
      paddingTop: `${(height / width) * 100}%`
    }
    return Object.assign(styles, {
      position,
      ':before': before,
      '.content': {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }
    });
  }
}

const styles = vudu({
  projectBlock: aspectRatio(4, 3)({
    cursor: 'pointer',
    width: '100%',
    ':hover': {
      '.project-background-image': { opacity: 1 },
      'video': { opacity: 1 },
      '.white': { opacity: 1}
    },
    '.fill-me': { transition: `opacity ${DURATION}ms ease-in-out` }
  }),
  active: {
    '.project-background': { opacity: 0 },
    'video': { opacity: 1 },
    '.white': { opacity: 1}
  },
  projectBackground: aspectRatio(16, 9, 'absolute')({
    width: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'black',
  }),
  projectBackgroundImage: {
    opacity: 0,
    backgroundSize: 'cover',
    transition: `opacity ${DURATION}ms ease-in-out`,
  },
  projectAsset: {
    height: '100%',
    zIndex: 1,
    position: 'relative',
    display: 'inline-block',
    backgroundSize: 'contain',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat'
  },
  projectFrame: {
    height: '100%',
    zIndex: 2,
    position: 'relative',
    maxWidth: '100%'
  },
  projectFrameWhite: {
    zIndex: 3,
    position: 'absolute',
    height: '100%',
    left: 0,
    top: 0,
    opacity: 0,
    transition: `opacity ${DURATION}ms ease-in-out`,
    maxWidth: '100%'
  },
  projectVid: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 1,
    opacity: 0,
    transition: `opacity ${DURATION}ms ease-in-out`,
  },
  iosVariant: {
    textAlign: 'right',
    '.frame': {
      marginRight: '10px',
      'video': {
        width: `${(206/236) * 100}%`,
        left: `${(14/236) * 100}%`,
        top: `${(59/481) * 100}%`,
      }
    }
  },
  browserVariant: {
    textAlign: 'center',
    '.frame': {
      width: '90%',
      'video': {
        width: `${(672/724) * 100}%`,
        left: `${(25/724) * 100}%`,
        top: `${(52/482) * 100}%`,
      }
    }
  }
})

const Variants = {
  IOS: styles.iosVariant,
  Browser: styles.browserVariant
}

const {
  Component,
  computed,
  get,
  inject: { service },
} = Ember;

/*
 * ios.svg - 236w 481h, 208w 363h, 14L 59T
 * browser.svg - 724w, 482h, 672w, 420h, 25L 52T
 */

export default Component.extend({
  classNames: [styles.projectBlock, 'project-block'],
  classNameBindings: ['projectIsActive:explode', `projectIsActive:${styles.active}`],
  sanctu: service(),
  styles,
  v,

  projectIsActive: Ember.computed('sanctu.activeProject', 'project', function() {
    return get(this, 'sanctu.activeProject') === get(this, 'project');
  }),
  variant: computed('project.displayVariant', function() {
    switch(get(this, 'project.displayVariant')) {
      case 'ios': return Variants.IOS;
      case 'browser': return Variants.Browser;
    }
  }),
  framePath: computed('project.displayVariant', function() {
    switch(get(this, 'project.displayVariant')) {
      case 'ios': return 'ios';
      case 'browser':
      default:
        return 'browser';
    }
  }),
  featuredOverlayStyle: computed('project.featuredOverlay.file.url', function() {
    return Ember.String.htmlSafe(`background-image: url(${get(this, 'project.featuredOverlay.file.url')})`);
  }),
  artBackgroundStyle: computed('project.artBackground.file.url', function() {
    return Ember.String.htmlSafe(`background-image: url(${get(this, 'project.artBackground.file.url')})`);
  })
})
