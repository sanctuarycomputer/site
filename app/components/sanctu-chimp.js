import Ember from 'ember';

const {
  set,
  Component,
} = Ember;

export default Component.extend({
  didSubmitEmail: false,

  actions: {
    emberChimpDidSubmit(promise) {
      promise
      .then((res) => {
        if (res.result === 'success') {
          return set(this, 'didSubmitEmail', true);
        }
      });
    }
  },
});
