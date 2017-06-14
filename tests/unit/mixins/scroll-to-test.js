import Ember from 'ember';
import ScrollToBottomMixin from 'site/mixins/scroll-to-bottom';
import { module, test } from 'qunit';

module('Unit | Mixin | scroll to bottom');

// Replace this with your real tests.
test('it works', function(assert) {
  let ScrollToBottomObject = Ember.Object.extend(ScrollToBottomMixin);
  let subject = ScrollToBottomObject.create();
  assert.ok(subject);
});
