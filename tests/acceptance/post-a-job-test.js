import { test } from 'qunit';
import moduleForAcceptance from 'fronthat/tests/helpers/module-for-acceptance';
import testSelector from 'ember-test-selectors';

moduleForAcceptance('Acceptance | post a job');

test('visiting /post-a-job', async function(assert) {
  await visit('/post-a-job');
  assert.equal(currentURL(), '/post-a-job');
});

test('filling in post a job form', async function(assert) {
  await visit('/post-a-job');
  await fillIn('#name-input', 'Russ Hanneman');
  const nameInputErrors = await find(testSelector('name-input-errors'));
  assert.equal(nameInputErrors.length, 0, 'It does not have input errors');
});

test('filling in post a job form with errors', async function(assert) {
  await visit('/post-a-job');
  await fillIn('#name-input', 'AS');
  const nameInputErrors = await find(testSelector('name-input-errors'));
  assert.equal(nameInputErrors.length, 1, 'It does have input errors');
});

test('does not display errors on initial load', async function(assert) {
  localStorage.removeItem('reduxPersist:jobs')
  await visit('/post-a-job');
  const nameInputErrors = await find(testSelector('name-input-errors'));
  assert.equal(nameInputErrors.length, 0, 'It does not have name input errors');
});
