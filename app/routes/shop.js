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
  }
});

export default Route.extend({

  model() {
    return [
      {
        id: 1,
        item_url: 'http://www.alienware.com/mobile/img/aw_15_thumbnail.png',
        title: 'Computer Sanctuary',
        description: 'A few short sentences describing the product and potential offers. A few short sentences describing the product and potential offers.',
        sub_description: '100% badboy',
        instructions: 'Dryclean only',
        sizes: {
          xs: false,
          s:  false,
          md: false,
          l: true,
          xl: false,
        },
        price: '99.99',
      },
      {
        id: 1,
        item_url: 'http://www.alienware.com/mobile/img/aw_15_thumbnail.png',
        title: 'Computer Sanctuary',
        description: 'A few short sentences describing the product and potential offers. A few short sentences describing the product and potential offers.',
        sub_description: '100% badboy',
        instructions: 'Dryclean only',
        sizes: {
          xs: false,
          s:  false,
          md: false,
          l: true,
          xl: false,
        },
        price: '99.99',
      },
      {
        id: 1,
        item_url: 'http://www.alienware.com/mobile/img/aw_15_thumbnail.png',
        title: 'Computer Sanctuary',
        description: 'A few short sentences describing the product and potential offers. A few short sentences describing the product and potential offers.',
        sub_description: '100% badboy',
        instructions: 'Dryclean only',
        sizes: {
          xs: false,
          s:  false,
          md: false,
          l: true,
          xl: false,
        },
        price: '99.99',
      },
    ]
  },

  setupController(controller) {
    this._super(...arguments);
    set(controller, 'styles', styles);
    set(controller, 'v', v(c));
  }
});
