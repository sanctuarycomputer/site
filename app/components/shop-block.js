import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  Component,
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
    },
    '.shop': {
      position: 'absolute',
      backgroundColor: c.white.color,
      zIndex: 2,
      overflow: 'hidden',
    },
    '.shop-0': {
      width: '88%',
      top: 0,
      left: '10%',
      right: 0,
      bottom: '20%',
    },
    '.shop-1': {
      width: '50%',
      top: 0,
      left: 0,
      right: '50%',
      bottom: '50%',
    },
    '.shop-2': {
      width: '100%',
      top: '10%',
      left: 0,
      right: '50%',
      bottom: '50%',
    },
    '.shop-3': {
      width: '48%',
      top: '10%',
      left: '50%',
      bottom: '45%',
    },
    '.shop-4': {
      width: '100%',
      top: '-10%',
      left: '0',
      bottom: '10%',
      right: '0',
    },
    '.shop-5': {
      width: '90%',
      top: '0',
      left: '10%',
      bottom: '40%',
      right: '0',
    },
  },
  overlay: {
    transition: 'opacity 350ms ease-in-out',
    position: 'absolute',
    left: '50%',
    top: '0%',
    width: '100%',
    transform: 'translateX(-50%)',
    zIndex: 3,
    opacity: 1,
  },
  image: {
    transition: 'opacity 350ms ease-in-out',
    position: 'absolute',
    opacity: 0,
    left: '50%',
    top: '0%',
    width: '100%',
    transform: 'translateX(-50%)',
    zIndex: 2,
  },
  linkWrapper: {
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
    ':hover': {
      color: c.black.color,
      '.overlay': {
        opacity: 0,
      },
      '.image': {
        opacity: 1,
      },
    },
  },
});

export default Component.extend({
  classNames: [styles.shopBlock],
  styles,
});
