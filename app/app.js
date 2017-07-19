import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,
  ready: function() {
    document.addEventListener('touchmove', (event) => {
      event = event.originalEvent || event;
      if (event.scale > 1) event.preventDefault();
    }, false);
  }
});

loadInitializers(App, config.modulePrefix);

export default App;
