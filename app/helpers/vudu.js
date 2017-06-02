import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

export function vudu(params) {
  return params[0].split(' ').map(className => {
    return v(c)[className];
  }).join(' ');
}

export default Ember.Helper.helper(vudu);
