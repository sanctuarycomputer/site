import Ember from 'ember';
export default Ember.Component.extend({
  attributeBindings: ['width', 'height', 'viewBox', 'version'],
  tagName: 'svg',
  width: '724px',
  height: '482px',
  viewBox: '0 0 724 482',
  version: '1.1'
});
