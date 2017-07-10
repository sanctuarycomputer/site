import Ember from 'ember';
import v from 'npm:vudu';
import c, { breakpoints } from 'site/lib/vudu';

const {
  Route,
  get,
  set,
  inject: { service },
} = Ember;

const styles = v({
  articleWrapper: {
    '@composes': [c.p2, c.col10, c.lgCol12, c.mxAuto],
    [breakpoints.md]: { padding: 0 },
    '.content': {
      '> p:first-child': {
        '@composes': [c.serifLight, c.mb2],
        fontSize: '1em',
        padding: 0,
        [breakpoints.md]: {
          fontSize: '2.75em',
        }
      },
      p: {
        '@composes': [c.pLarge, c.serifLight, c.py2],
        [breakpoints.md]: {
          '@composes': [c.py4],
        }
      },
    },
    figure: {
      margin: '2rem 0',
      img: {
        width: '100%;'
      }
    },
    iframe: {
      width: '100%',
      maxWidth: '450px',
      display: 'block',
      margin: '0 auto',
      backgroundColor: `${c.lightGray.color} !important`,
      html: {
        '> body': {
          backgroundColor: `${c.lightGray.color} !important`,
        }
      }
    },
    h1: { '@composes': [c.pLarge, c.serifRegular, c.mt4]},
    h2: { '@composes': [c.pLarge, c.serifRegular, c.mt4]},
    h3: { '@composes': [c.pLarge, c.serifRegular, c.mt4]},
    h4: { '@composes': [c.pLarge, c.serifRegular, c.mt4]},
    h5: { '@composes': [c.pLarge, c.serifRegular, c.mt4]},
    h6: { '@composes': [c.pLarge, c.serifRegular, c.mt4]},
    blockquote: {
      '@composes': [c.my4, c.ml2, c.pl3, c.pLarge],
      borderLeft: `solid 2px ${c.black.color}`,
      fontStyle: 'italic',
      [breakpoints.md]: {
        '@composes': [c.ml6, c.pl5],
      }
    },
    ul: {
      '@composes': [c.pl2, c.py3],
      [breakpoints.md]: {
        '@composes': [c.pl6],
      },
      li: {
        '@composes': [c.pLarge, c.pl2, c.py2],
        backgroundImage: 'url(images/dot.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0 50%',
        backgroundSize: '1%',
        [breakpoints.md]: {
          '@composes': [c.pl5],
        }
      }
    },
    a: { color: c.electricBlue.color },
  }
});

export default Route.extend({
  sanctu: service(),
  model(params) {
    return params.id;
  },

  setupController(controller, slug) {
    set(controller, 'slug', slug);
    set(controller, 'sanctu', get(this, 'sanctu'));
    set(controller, 'styles', styles);
    set(controller, 'v', v(c));
  }
});
