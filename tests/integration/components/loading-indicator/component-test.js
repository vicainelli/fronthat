import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('loading-indicator', 'Integration | Component | loading indicator', {
  integration: true
});

test('it displays loading text', function(assert) {

  const text = 'Please wait...';
  this.set('loadingText', text);
  this.render(hbs`{{loading-indicator loadingText=loadingText}}`);

  assert.equal(this.$().text().trim(), text);
});
