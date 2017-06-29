import Ember from 'ember';
import v from 'npm:vudu';
import c from 'site/lib/vudu';

export function vudu(params) {
  let [vuduParams, ...otherParams] = params;
  let vuduClasses = vuduParams.split(' ').map(className => {
    return v(c)[className];
  }).join(' ');
  vuduClasses += otherParams.join(' ');
  return vuduClasses;
}

export default Ember.Helper.helper(vudu);
