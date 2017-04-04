import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('about-area', 'Integration | Component | about area', {
  integration: true
});

test('it has 7 question containers', function(assert) {
  this.render(hbs`{{about-area}}`);

  assert.equal(this.$('.question-container').length, 7);
});
