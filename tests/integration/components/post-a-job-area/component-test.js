import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'ember-test-selectors';

moduleForComponent('post-a-job-area', 'Integration | Component | post a job area', {
  integration: true
});

// NAME
test('displays name input with text Peter', function(assert) {
  const name = {
    value: 'Peter',
    errors: []
  };
  const updateName = () => {};
  this.set('name', name);
  this.set('updateName', updateName);
  this.render(hbs`{{post-a-job-area name=name updateName=updateName}}`);
  const nameInput = this.$('#name-input').val();
  assert.equal(nameInput, name.value, 'Name value is Peter');
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
  const nameInputLabel = this.$(testSelector('name-input-label')).text();
  assert.equal(nameInputLabel, 'Name', 'Label value is Name');
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

// EMAIL
test('displays email input with text the@fronthat.com', function(assert) {
  const email = {
    value: 'the@fronthat.com',
    errors: []
  };
  const updateEmail = () => {};
  this.set('email', email);
  this.set('updateEmail', updateEmail);
  this.render(hbs`{{post-a-job-area email=email updateEmail=updateEmail}}`);
  const emailInputValue = this.$('#email-input').val();
  assert.equal(emailInputValue, email.value, 'Email value is the@fronthat.com');
});

test('displays label for email input', function(assert) {
  const email = {
    value: '',
    errors: []
  };
  const updateEmail = () => {};
  this.set('email', email);
  this.set('updateEmail', updateEmail);
  this.render(hbs`{{post-a-job-area email=email updateEmail=updateEmail}}`);
  const emailInputLabel = this.$(testSelector('email-input-label')).text();
  assert.equal(emailInputLabel, 'Email', 'Label value is Email');
});

test('does not display email input errors by default', function(assert) {
  const email = {
    value: '',
    errors: []
  };
  const updateEmail = () => {};
  this.set('email', email);
  this.set('updateEmail', updateEmail);
  this.render(hbs`{{post-a-job-area email=email updateEmail=updateEmail}}`);
  const emailInputErrors = this.$(testSelector('email-input-errors'));
  assert.equal(emailInputErrors.length, 0, 'Does not show email input errors');
});

test('does display email invalid error', function(assert) {
  const errorText = 'Please enter a valid email.';
  const email = {
    value: '',
    errors: [errorText]
  };
  const updateEmail = () => {};
  this.set('email', email);
  this.set('updateEmail', updateEmail);
  this.render(hbs`{{post-a-job-area email=email updateEmail=updateEmail}}`);
  const emailInputErrors = this.$(testSelector('email-input-errors')).text().trim();
  assert.equal(emailInputErrors, errorText, 'Does display email invalid error');
});
