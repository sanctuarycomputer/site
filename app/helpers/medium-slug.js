import Ember from 'ember';

export function mediumSlug(params/*, hash*/) {
  let splat = params[0].split('/');
  return splat[splat.length-1].split('?')[0];
}

export default Ember.Helper.helper(mediumSlug);
