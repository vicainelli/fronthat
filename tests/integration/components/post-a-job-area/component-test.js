import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('post-a-job-area', 'Integration | Component | post a job area', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{post-a-job-area}}`);
  assert.equal(this.$().text().trim(), '');
});
