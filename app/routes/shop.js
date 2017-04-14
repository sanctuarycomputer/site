import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

const {
  set,
  Route
} = Ember;

const styles = v({
  shopRoute: {
    '@composes': [c.liquidInner],
    top: 0
  },
  itemContainer: {
    '@composes': [c.white],
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
    minHeight: '400px',
    'h3': {
      '@composes': [c.white],
      fontWeight: 300,
      textAlign: 'center',
      fontSize: '2rem',
      textDecoration: 'none',
      ':first-of-type': {
        marginTop: '20%',
      }
    }
  },
  linkWrapper: {
    width: '100%',
    height: '100%',
    display: 'inline-block',
  },
});

export default Route.extend({

  model() {
    return this.store.findAll('product')
  },

  setupController(controller) {
    this._super(...arguments);
    console.log(c)
    set(controller, 'styles', styles);
    set(controller, 'v', v(c));
  }
});
