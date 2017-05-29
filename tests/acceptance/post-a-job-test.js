import { test } from 'qunit';
import moduleForAcceptance from 'fronthat/tests/helpers/module-for-acceptance';
import testSelector from 'ember-test-selectors';

moduleForAcceptance('Acceptance | post a job');

const generateDescription = () => {
  let description = '';
  for (let i=0; i < 255; ++i) {
    description += 'A';
  }
  return description;
};

const assertFormValid = async (assert) => {
  const nameInputErrors = await find(testSelector('name-input-errors'));
  assert.equal(nameInputErrors.length, 0, 'It does not have name input errors');
  const emailInputErrors = await find(testSelector('email-input-errors'));
  assert.equal(emailInputErrors.length, 0, 'It does not have email input errors');
  const titleInputErrors = await find(testSelector('title-input-errors'));
  assert.equal(titleInputErrors.length, 0, 'It does not have title input errors');
  const urlInputErrors = await find(testSelector('url-input-errors'));
  assert.equal(urlInputErrors.length, 0, 'It does not have url input errors');
  const descriptionInputErrors = await find(testSelector('description-input-errors'));
  assert.equal(descriptionInputErrors.length, 0, 'It does not have description input errors');
};

const assertSubmitButtonEnabled = async (assert) => {
  const submitButton = await find(testSelector('submit-button'));
  assert.equal(submitButton.length, 1, 'Post a Job button is enabled');
  return submitButton;
};

const assertSubmitButtonDisabled = async (assert) => {
  const disabledSubmitButton = await find(testSelector('submit-button-disabled'));
  assert.equal(disabledSubmitButton.length, 1, 'Post a Job button is disabled');
  return disabledSubmitButton;
};

const fillInValidForm = async () => {
  localStorage.removeItem('reduxPersist:jobs')
  await visit('/post-a-job');
  await fillIn('#name-input', 'Russ Hanneman');
  await fillIn('#email-input', 'russ@siliconvalleyhbo.com');
  await fillIn('#title-input', 'This is some Title and More');
  await fillIn('#url-input', 'https://google.com');
  await fillIn('#description-input', generateDescription());
};

const fillInInvalidForm = async () => {
  localStorage.removeItem('reduxPersist:jobs')
  await visit('/post-a-job');
  await fillIn('#name-input', 'AS');
  await fillIn('#email-input', 'invalid.email');
  await fillIn('#title-input', 'AAA');
  await fillIn('#url-input', 'invalidurl');
  await fillIn('#description-input', 'Too short description');
};

const assertFormInvalid = async (assert) => {
  const nameInputErrors = await find(testSelector('name-input-errors'));
  assert.equal(nameInputErrors.length, 1, 'It does have name input errors');
  const emailInputErrors = await find(testSelector('email-input-errors'));
  assert.equal(emailInputErrors.length, 1, 'It does have email input errors');
  const titleInputErrors = await find(testSelector('title-input-errors'));
  assert.equal(titleInputErrors.length, 1, 'It does have title input errors');
  const urlInputErrors = await find(testSelector('url-input-errors'));
  assert.equal(urlInputErrors.length, 1, 'It does have url input errors');
  const descriptionInputErrors = await find(testSelector('description-input-errors'));
  assert.equal(descriptionInputErrors.length, 1, 'It does have description input errors');
};

test('filling in post a job form', async function(assert) {
  await fillInValidForm();
  await assertFormValid(assert);
  const submitButton = await assertSubmitButtonEnabled(assert);
  const API_DELAY = 400;
  server.timing = API_DELAY;
  await click(submitButton);
  const loadingSubmitButton = await find(testSelector('submit-button-loading'));
  assert.equal(loadingSubmitButton.length, 1, 'Post a Job button is loading');
  await waitFor(API_DELAY);
  assert.equal(currentURL(), '/post-a-job/success', 'It redirect to success route');
});

test('filling in post a job form fails', async function(assert) {
  await fillInValidForm();
  await assertFormValid(assert);
  const submitButton = await assertSubmitButtonEnabled(assert);
  server.post('/jobs', () => {
    return {};
  }, 500);
  await click(submitButton);
  assert.equal(currentURL(), '/post-a-job', 'It stays on the same route upon failure');
  const generalErrors = await find(testSelector('general-error'));
  assert.equal(generalErrors.length, 1, 'It has a general server error');
});

test('filling in post a job form with errors', async function(assert) {
  await fillInInvalidForm();
  await assertFormInvalid(assert);
  await assertSubmitButtonDisabled(assert);
});

test('does not display errors on initial load', async function(assert) {
  localStorage.removeItem('reduxPersist:jobs')
  await visit('/post-a-job');
  await assertFormValid(assert);
  await assertSubmitButtonDisabled(assert);
});
