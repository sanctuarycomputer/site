import Ember from 'ember';

export function mediumItemForSlug(params/*, hash*/) {
  return params[0].find(item => item.link.includes(params[1]));
}

export default Ember.Helper.helper(mediumItemForSlug);
