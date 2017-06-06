import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  set,
  inject: { service },
} = Ember;

const HEIGHT = 12;
const WIDTH = 18;

const styles = v({
  workItem: {
    '@composes': [c.mb6],
    ':last-child': { marginBottom: 0 },
    width: '100%',
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
        width: `${100 - ((3 / WIDTH) * 100)}%`,
        height: `${100 - ((3 / HEIGHT) * 100)}%`,
      },
      '.play-0': {
        top: 0,
        right: 0,
        width: `${100 - ((7 / WIDTH) * 100)}%`,
        height: '100%',
      },
      '.work-1': {
        width: `${100 - ((3 / WIDTH) * 100)}%`,
        height: `${100 - ((3 / HEIGHT) * 100)}%`,
      },
      '.play-1': {
        width: `${100 - ((7 / WIDTH) * 100)}%`,
        height: '100%',
      },
    }
  }
});


export default Ember.Component.extend({
  classNames: [styles.workItem],
  styles,

  sanctu: service(),
});
