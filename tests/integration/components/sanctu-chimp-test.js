import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sanctu-chimp', 'Integration | Component | sanctu chimp', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{sanctu-chimp}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#sanctu-chimp}}
      template block text
    {{/sanctu-chimp}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
