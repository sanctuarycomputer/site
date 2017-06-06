import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('work', function() {
    this.route('show', { path: ':slug'});
  });
  this.route('feed', function() {
    this.route('show', { path: ':id' });
  });
  this.route('shop', function() {
    this.route('show', { path: ':slug' });
  });
});

export default Router;
