import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  set,
  Route
} = Ember;

const WIDTH = 14;
const HEIGHT = 18;

const styles = v({
  shopBlock: {
    '@composes': [
      c.col12,
      c.mdCol4,
      c.relative
    ],
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
        '.shop .overlay': {
          opacity: 0,
        },
        '.shop .image': {
          opacity: 1,
        },
        '.shop .link-wrapper': {
          color: c.black.color,
        },
      },
    },
    '.shop': {
      position: 'absolute',
      backgroundColor: c.black.color,
      zIndex: 2,
      overflow: 'hidden',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: '100%',
      '.overlay': {
        transition: 'opacity 350ms ease-in-out',
        position: 'absolute',
        left: '50%',
        top: '0%',
        width: '100%',
        transform: 'translateX(-50%)',
        zIndex: 3,
        opacity: 1,
      },
      '.image': {
        transition: 'opacity 350ms ease-in-out',
        position: 'absolute',
        opacity: 0,
        left: '50%',
        top: '0%',
        width: '100%',
        transform: 'translateX(-50%)',
        zIndex: 2,
      },
      '.link-wrapper': {
        color: c.white.color,
        transition: '350ms ease-in-out',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }
    },


  }
});

export default Route.extend({

  setupController(controller) {
    this._super(...arguments);
    set(controller, 'styles', styles);
    set(controller, 'v', v(c));
  }
});
