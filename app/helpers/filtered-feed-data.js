import Ember from 'ember';

export function filteredFeedData(params/*, hash*/) {
  return params[0].filter((fd) => {
    let splat = fd.link.split('/');
    return splat[splat.length-1].split('?')[0] !==  params[1];
  });
}

export default Ember.Helper.helper(filteredFeedData);
