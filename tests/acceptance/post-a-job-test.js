import { test } from 'qunit';
import moduleForAcceptance from 'fronthat/tests/helpers/module-for-acceptance';
import testSelector from 'ember-test-selectors';

moduleForAcceptance('Acceptance | post a job');

test('filling in post a job form', async function(assert) {
  localStorage.removeItem('reduxPersist:jobs')
  await visit('/post-a-job');
  await fillIn('#name-input', 'Russ Hanneman');
  await fillIn('#email-input', 'russ@siliconvalleyhbo.com');
  await fillIn('#title-input', 'This is some Title and More');
  await fillIn('#url-input', 'https://google.com');
  const generateDescription = () => {
    let description = '';
    for (let i=0; i < 255; ++i) {
      description += 'A';
    }
    return description;
  };
  await fillIn('#description-input', generateDescription());
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
  const submitButton = await find(testSelector('submit-button'));
  assert.equal(submitButton.length, 1, 'Post a Job button is enabled');
  await click(submitButton);
  // const loadingSubmitButton = await find(testSelector('submit-button-loading'));
  // assert.equal(loadingSubmitButton.length, 1, 'Post a Job button is loading');
  assert.equal(currentURL(), 'post-a-job/success');
});

test('filling in post a job form with errors', async function(assert) {
  localStorage.removeItem('reduxPersist:jobs')
  await visit('/post-a-job');
  await fillIn('#name-input', 'AS');
  await fillIn('#email-input', 'invalid.email');
  await fillIn('#title-input', 'AAA');
  await fillIn('#url-input', 'invalidurl');
  await fillIn('#description-input', 'Too short description');
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
  const submitButton = await find(testSelector('submit-button-disabled'));
  assert.equal(submitButton.length, 1, 'Post a Job button is disabled');
});

test('does not display errors on initial load', async function(assert) {
  localStorage.removeItem('reduxPersist:jobs')
  await visit('/post-a-job');
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
  const submitButton = await find(testSelector('submit-button-disabled'));
  assert.equal(submitButton.length, 1, 'Post a Job button is disabled');
});
