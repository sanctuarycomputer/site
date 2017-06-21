import Ember from 'ember';
import StartAtTopMixin from 'site/mixins/start-at-top';
import { module, test } from 'qunit';

module('Unit | Mixin | start at top');

// Replace this with your real tests.
test('it works', function(assert) {
  let StartAtTopObject = Ember.Object.extend(StartAtTopMixin);
  let subject = StartAtTopObject.create();
  assert.ok(subject);
});
