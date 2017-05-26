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

// TITLE
test('displays title input with text Random Title', function(assert) {
  const title = {
    value: 'Random Title',
    errors: []
  };
  const updateTitle = () => {};
  this.set('title', title);
  this.set('updateTitle', updateTitle);
  this.render(hbs`{{post-a-job-area title=title updateTitle=updateTitle}}`);
  const titleInputValue = this.$('#title-input').val();
  assert.equal(titleInputValue, title.value, 'Title value is Random Title');
});

test('displays label for title input', function(assert) {
  const title = {
    value: '',
    errors: []
  };
  const updateTitle = () => {};
  this.set('title', title);
  this.set('updateTitle', updateTitle);
  this.render(hbs`{{post-a-job-area title=title updateTitle=updateTitle}}`);
  const titleInputLabel = this.$(testSelector('title-input-label')).text();
  assert.equal(titleInputLabel, 'Title', 'Label value is Title');
});

test('does not display title input errors by default', function(assert) {
  const title = {
    value: '',
    errors: []
  };
  const updateTitle = () => {};
  this.set('title', title);
  this.set('updateTitle', updateTitle);
  this.render(hbs`{{post-a-job-area title=title updateTitle=updateTitle}}`);
  const titleInputErrors = this.$(testSelector('title-input-errors'));
  assert.equal(titleInputErrors.length, 0, 'Does not show title input errors');
});

test('does display title invalid error', function(assert) {
  const errorText = 'Please enter a valid title.';
  const title = {
    value: '',
    errors: [errorText]
  };
  const updateTitle = () => {};
  this.set('title', title);
  this.set('updateTitle', updateTitle);
  this.render(hbs`{{post-a-job-area title=title updateTitle=updateTitle}}`);
  const titleInputErrors = this.$(testSelector('title-input-errors')).text().trim();
  assert.equal(titleInputErrors, errorText, 'Does display title invalid error');
});

// URL
test('displays url input with text https://google.com', function(assert) {
  const url = {
    value: 'https://google.com',
    errors: []
  };
  const updateURL = () => {};
  this.set('url', url);
  this.set('updateURL', updateURL);
  this.render(hbs`{{post-a-job-area url=url updateURL=updateURL}}`);
  const urlInputValue = this.$('#url-input').val();
  assert.equal(urlInputValue, url.value, 'URL value is https://google.com');
});

test('displays label for URL input', function(assert) {
  const url = {
    value: '',
    errors: []
  };
  const updateURL = () => {};
  this.set('url', url);
  this.set('updateURL', updateURL);
  this.render(hbs`{{post-a-job-area url=url updateURL=updateURL}}`);
  const urlInputLabel = this.$(testSelector('url-input-label')).text();
  assert.equal(urlInputLabel, 'URL', 'Label value is URL');
});

test('does not display URL input errors by default', function(assert) {
  const url = {
    value: '',
    errors: []
  };
  const updateURL = () => {};
  this.set('url', url);
  this.set('updateURL', updateURL);
  this.render(hbs`{{post-a-job-area url=url updateURL=updateURL}}`);
  const urlInputErrors = this.$(testSelector('url-input-errors'));
  assert.equal(urlInputErrors.length, 0, 'Does not show URL input errors');
});

test('does display URL invalid error', function(assert) {
  const errorText = 'Please enter a correct URL.';
  const url = {
    value: '',
    errors: [errorText]
  };
  const updateURL = () => {};
  this.set('url', url);
  this.set('updateURL', updateURL);
  this.render(hbs`{{post-a-job-area url=url updateURL=updateURL}}`);
  const urlInputErrors = this.$(testSelector('url-input-errors')).text().trim();
  assert.equal(urlInputErrors, errorText, 'Does display URL invalid error');
});

// Description
test('displays description input with text description-is', function(assert) {
  const description = {
    value: 'description-is',
    errors: []
  };
  const updateDescription = () => {};
  this.set('description', description);
  this.set('updateDescription', updateDescription);
  this.render(hbs`{{post-a-job-area description=description updateDescription=updateDescription}}`);
  const descriptionInputValue = this.$('#description-input').val();
  assert.equal(descriptionInputValue, description.value, 'Description value is description-is');
});

test('displays label for description input', function(assert) {
  const description = {
    value: '',
    errors: []
  };
  const updateDescription = () => {};
  this.set('description', description);
  this.set('updateDescription', updateDescription);
  this.render(hbs`{{post-a-job-area description=description updateDescription=updateDescription}}`);
  const descriptionInputLabel = this.$(testSelector('description-input-label')).text();
  assert.equal(descriptionInputLabel, 'Description', 'Label value is Description');
});

test('does not display description input errors by default', function(assert) {
  const description = {
    value: '',
    errors: []
  };
  const updateDescription = () => {};
  this.set('description', description);
  this.set('updateDescription', updateDescription);
  this.render(hbs`{{post-a-job-area description=description updateDescription=updateDescription}}`);
  const descriptionInputErrors = this.$(testSelector('description-input-errors'));
  assert.equal(descriptionInputErrors.length, 0, 'Does not show description input errors');
});

test('does display description invalid error', function(assert) {
  const errorText = 'Invalid description.';
  const description = {
    value: '',
    errors: [errorText]
  };
  const updateDescription = () => {};
  this.set('description', description);
  this.set('updateDescription', updateDescription);
  this.render(hbs`{{post-a-job-area description=description updateDescription=updateDescription}}`);
  const descriptionInputErrors = this.$(testSelector('description-input-errors')).text().trim();
  assert.equal(descriptionInputErrors, errorText, 'Does display description invalid error');
});

// SUBMIT
test('displays an active submit button', function(assert) {
  this.render(hbs`{{post-a-job-area}}`);
  const submitButton = this.$(testSelector('submit-button'));
  assert.equal(submitButton.length, 1, 'Does display submit button');
});

test('displays a disabled submit button', function(assert) {
  this.set('disabled', true);
  this.render(hbs`{{post-a-job-area disabled=disabled}}`);
  const submitButton = this.$(testSelector('submit-button-disabled'));
  assert.equal(submitButton.length, 1, 'Does display submit button');
});
