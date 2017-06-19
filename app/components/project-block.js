import Ember from 'ember';
import v from 'npm:vudu';
import c, { breakpoints } from 'site/lib/vudu';

const {
  inject: { service },
} = Ember;

const HEIGHT = 12;
const WIDTH = 18;

const styles = v({
  workItem: {
    '@composes': [c.my6],
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
      ':hover': {
        '.work .work-title': {
          opacity: 0
        },
        '.work img': {
          opacity: 0
        },
        '.work video': {
          opacity: 1
        },
        '.play .play-secondary': {
          opacity: 0
        }
      },
      '.work': {
        position: 'absolute',
        backgroundColor: c.black.color,
        zIndex: 2,
        overflow: 'hidden',
        '.work-title': {
          display: 'none',
          [breakpoints.lg]: {
            display: 'block',
            '@composes': [c.title, c.z3, c.absolute],
            color: c.white.color,
            left: '50%',
            top:'50%',
            transform: 'translate(-50%)',
          }
        },
        'img': {
          transition: 'opacity 350ms ease-in-out',
          position: 'absolute',
          left: '50%',
          top: '0%',
          width: '100%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          opacity: 1
        },
        'video': {
          transition: 'opacity 350ms ease-in-out',
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
        backgroundColor: c.black.color,
        position: 'absolute',
        zIndex: 1,
        '.play-secondary': {
          transition: 'opacity 350ms ease-in-out',
          backgroundColor: c.black.color,
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      },
      // Variants
      '.work-0': {
        bottom: 0,
        left: 0,
        width: `${100 - ((3 / WIDTH) * 100)}%`,
        height: `${100 - ((3 / HEIGHT) * 100)}%`,
      },
      '.play-0': {
        top: 0,
        right: 0,
        width: `${100 - ((6 / WIDTH) * 100)}%`,
        height: '80%',
      },
      '.work-1': {
        left: 0,
        top: '20%',
        width: `${100 - ((3 / WIDTH) * 100)}%`,
        height: `${100 - ((3 / HEIGHT) * 100)}%`,
      },
      '.play-1': {
        right: '12%',
        width: `${100 - ((10 / WIDTH) * 100)}%`,
        height: '100%',
      },
      '.work-2': {
        right: 0,
        top: '10%',
        width: `${100 - ((3 / WIDTH) * 100)}%`,
        height: `${100 - ((3 / HEIGHT) * 100)}%`,
      },
      '.play-2': {
        left: 0,
        width: `${100 - ((10 / WIDTH) * 100)}%`,
        height: '100%',
      },
      '.work-3': {
        left: '10%',
        top: '20%',
        width: `${100 - ((3 / WIDTH) * 100)}%`,
        height: `${100 - ((3 / HEIGHT) * 100)}%`,
      },
      '.play-3': {
        left: '30%',
        width: `${100 - ((10 / WIDTH) * 100)}%`,
        height: '100%',
      },
      '.work-4': {
        left: '0',
        top: '0',
        width: `${100 - ((3 / WIDTH) * 100)}%`,
        height: `${100 - ((3 / HEIGHT) * 100)}%`,
      },
      '.play-4': {
        right: '10%',
        top: '5%',
        width: `${100 - ((10 / WIDTH) * 100)}%`,
        height: '95%',
      },
      '.work-5': {
        right: '0',
        bottom: '0',
        width: `${100 - ((3 / WIDTH) * 100)}%`,
        height: `${100 - ((3 / HEIGHT) * 100)}%`,
      },
      '.play-5': {
        right: '5%',
        bottom: '0%',
        width: `${100 - ((6 / WIDTH) * 100)}%`,
        height: '100%',
      },
    },
    '.work-title-block': {
      '@composes': [c.center, c.absolute, c.col12, c.py4],
      [breakpoints.lg]: {
        display: 'none',
      },
      'h1': {
        '@composes': [c.title, c.black, c.serifLight],
      }
    },
  }
});


export default Ember.Component.extend({
  classNames: [styles.workItem],
  styles,
  sanctu: service(),
});
