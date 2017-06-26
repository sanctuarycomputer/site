import Ember from 'ember';
import v from 'npm:vudu';
import c, { breakpoints } from 'site/lib/vudu';

const {
  set,
  run: { later},
  inject: { service },
  RSVP: { Promise },
} = Ember;

const BASE_DELAY = 500;
const DURATION = 350;
const HEIGHT = 12;
const WIDTH = 18;

const styles = v({
  workItem: {
    '@composes': [c.my5],
    opacity: 0,
    position: 'relative',
    ':before': {
      display: 'block',
      content: `""`,
      width: '100%',
      paddingTop: `${(HEIGHT / WIDTH) * 100}%`,
    },
    '> .content': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      cursor: 'pointer',
    },
    '.work': {
      opacity: 0,
      position: 'absolute',
      backgroundColor: c.black.color,
      zIndex: 2,
      overflow: 'hidden',
      transition: `opacity ${DURATION}ms ease-in-out ${BASE_DELAY}ms`,
      'img': {
        transition: `opacity ${DURATION}ms ease-in-out`,
        position: 'absolute',
        left: '50%',
        top: '0%',
        width: '100%',
        transform: 'translateX(-50%)',
        zIndex: 3,
        opacity: 0
      },
      'video': {
        transition: `opacity ${DURATION}ms ease-in-out ${BASE_DELAY + 200}ms`,
        position: 'absolute',
        opacity: 0,
        left: '50%',
        top: '0%',
        width: '100%',
        transform: 'translateX(-50%)',
        zIndex: 2
      }
    },
    '.play': {
      transition: `opacity ${DURATION}ms ease-in-out`,
      backgroundColor: c.black.color,
      position: 'absolute',
      zIndex: 1,
      opacity: 0,
      '.play-secondary': {
        opacity: 0,
        transition: `opacity ${DURATION}ms ease-in-out`,
        backgroundColor: c.sanctuBlue.color,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },
    // Variants
    '.work-0': {
      right: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: `${100 - ((3 / WIDTH) * 100)}%`,
      height: `${100 - ((3 / HEIGHT) * 100)}%`,
    },
    '.play-0': {
      left: 0,
      width: `${100 - ((10 / WIDTH) * 100)}%`,
      height: '100%',
    },
    '.work-1': {
      bottom: 0,
      left: 0,
      width: `${100 - ((3 / WIDTH) * 100)}%`,
      height: `${100 - ((3 / HEIGHT) * 100)}%`,
    },
    '.play-1': {
      top: 0,
      right: 0,
      width: `${100 - ((6 / WIDTH) * 100)}%`,
      height: '80%',
    },
    '.work-2': {
      bottom: 0,
      left: 0,
      width: `${100 - ((3 / WIDTH) * 100)}%`,
      height: `${100 - ((3 / HEIGHT) * 100)}%`,
    },
    '.play-2': {
      top: 0,
      right: 0,
      width: `${100 - ((4 / WIDTH) * 100)}%`,
      height: '80%',
    },
    '.work-3': {
      left: 0,
      top: 0,
      width: `${100 - ((3 / WIDTH) * 100)}%`,
      height: `${100 - ((3 / HEIGHT) * 100)}%`,
    },
    '.play-3': {
      right: 0,
      bottom: 0,
      width: `${100 - ((5 / WIDTH) * 100)}%`,
      height: '100%',
    },
    '.work-4': {
      bottom: 0,
      right: 0,
      width: `${100 - ((3 / WIDTH) * 100)}%`,
      height: `${100 - ((3 / HEIGHT) * 100)}%`,
    },
    '.play-4': {
      left: 0,
      top: 0,
      width: `${100 - ((8 / WIDTH) * 100)}%`,
      height: '75%',
    },
    '.work-5': {
      right: 0,
      top: '10%',
      width: `${100 - ((3 / WIDTH) * 100)}%`,
      height: `${100 - ((3 / HEIGHT) * 100)}%`,
    },
    '.play-5': {
      left: 0,
      width: `${100 - ((10 / WIDTH) * 100)}%`,
      height: '100%',
    },
    '.work-6': {
      left: 0,
      bottom: 0,
      width: `${100 - ((3 / WIDTH) * 100)}%`,
      height: `${100 - ((3 / HEIGHT) * 100)}%`,
    },
    '.play-6': {
      top: 0,
      right: 0,
      width: `${100 - ((3 / WIDTH) * 100)}%`,
      height: '70%',
    },
    '.work-7': {
      left: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: `${100 - ((3 / WIDTH) * 100)}%`,
      height: `${100 - ((3 / HEIGHT) * 100)}%`,
    },
    '.play-7': {
      top: 0,
      right: 0,
      width: `${100 - ((5 / WIDTH) * 100)}%`,
      height: '100%',
    },
    '.work-title-block': {
      '@composes': [c.center, c.absolute, c.col12, c.py4],
      [breakpoints.lg]: {
        '@composes': [
          c.absolute,
          c.flex,
          c.alignCenter,
          c.justifyCenter,
          c.t0,
          c.l0,
          c.r0,
          c.b0,
          c.pointerNone
        ]
      },
      '.project-title': {
        opacity: 0,
        transition: `${DURATION + 100}ms ease-in-out ${BASE_DELAY + 200}ms`,
        transform: 'translateY(20px)',
        '@composes': [c.title, c.black, c.serifLight],
        [breakpoints.lg]: {
          '@composes': [c.white, c.z2],
        }
      }
    },
    [breakpoints.lg]: {
      ':hover': {
        '.work-title-block': {
          cursor: 'pointer',
          opacity: 0,
        }
      }
    }
  },
  inserted: {
    opacity: 1,
    '.play': {
      opacity: 1,
    },
    '.play .play-secondary': {
      opacity: '1',
    },
  },
  loaded: {
    '.work': {
      opacity: 1,
      'img': { opacity: 1 },
      'video': { opacity: 1 },
    },
    '> .content': {
      ':hover': {
        '.work img': {
          opacity: 0
        },
        '.work video': {
          opacity: 1
        },
        '.play': {
          opacity: 1,
        },
        '.play .play-secondary': {
          opacity: 0
        },
      },
    },
    '.work-title-block': {
      '.project-title': {
        transform: 'translateY(0)',
        opacity: 1,
      }
    }
  }
});

const loadVideoFromURL = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = resolve;
    xhr.onerror = reject;
    xhr.send();
  });
};

const randomize = (min, max) => (Math.floor(Math.random() * max) + min);

export default Ember.Component.extend({
  classNames: [styles.workItem],
  classNameBindings: [`inserted:${styles.inserted}`, `loaded:${styles.loaded}`],
  styles,
  sanctu: service(),
  inserted: false,
  loaded: false,
  didInsertElement() {
    later(this, () => {
      set(this, 'inserted', true);
    }, randomize(50, 250));

    let img = this.$('img');
    let imgLoader = new Image();
    let vid = this.$('video');
    let loadCounter = 0;

    let assetDidLoad = (function() {
      loadCounter++;
      if (loadCounter === 2) {
        set(this, 'loaded', true);
      }
    }).bind(this)

    imgLoader.onload = assetDidLoad;
    imgLoader.src = img.get(0).src;

    loadVideoFromURL(vid.get(0).src).then(() => assetDidLoad());
  }
});
