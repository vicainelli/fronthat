import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'ember-test-selectors';

moduleForComponent('post-a-job-area', 'Integration | Component | post a job area', {
  integration: true
});

test('displays name input with text Peter', function(assert) {
  const name = {
    value: 'Peter',
    errors: []
  };
  const updateName = () => {};
  this.set('name', name);
  this.set('updateName', updateName);
  this.render(hbs`{{post-a-job-area name=name updateName=updateName}}`);
  const nameInputContainer = this.$(testSelector('name-input-container'));
  const inputValue = this.$('input', nameInputContainer).val();
  assert.equal(inputValue, name.value, 'Name value is Peter');
});

test('displays label for name input', function(assert) {
  const name = {
    value: 'Peter',
    errors: []
  };
  const updateName = () => {};
  this.set('name', name);
  this.set('updateName', updateName);
  this.render(hbs`{{post-a-job-area name=name updateName=updateName}}`);
  const nameInputContainer = this.$(testSelector('name-input-container'));
  const labelValue = this.$('label', nameInputContainer).text();
  assert.equal(labelValue, 'Name', 'Label value is Name');
});

test('does not display name input errors by default', function(assert) {
  const name = {
    value: 'Peter',
    errors: []
  };
  const updateName = () => {};
  this.set('name', name);
  this.set('updateName', updateName);
  this.render(hbs`{{post-a-job-area name=name updateName=updateName}}`);
  const nameInputErrors = this.$(testSelector('name-input-errors'));
  assert.equal(nameInputErrors.length, 0, 'Does not show name input errors');
});

test('does display name is required error', function(assert) {
  const errorText = 'Name is required';
  const name = {
    value: 'Peter',
    errors: [errorText]
  };
  const updateName = () => {};
  this.set('name', name);
  this.set('updateName', updateName);
  this.render(hbs`{{post-a-job-area name=name updateName=updateName}}`);
  const nameInputErrors = this.$(testSelector('name-input-errors')).text().trim();
  assert.equal(nameInputErrors, errorText, 'Does display name is required error');
});
