import Ember from 'ember';
export default Ember.Component.extend({
  attributeBindings: ['width', 'height', 'viewBox'],
  tagName: 'svg',
  width: '237px',
  height: '481px',
  viewBox: '0 0 237 481'
});
