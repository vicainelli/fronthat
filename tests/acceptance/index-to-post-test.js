import { test } from 'qunit';
import moduleForAcceptance from 'fronthat/tests/helpers/module-for-acceptance';
import testSelector from 'ember-test-selectors';

moduleForAcceptance('Acceptance | index to post');

test('navigating from / to /post-a-job', async function(assert) {
  await visit('/');
  await click(testSelector('post-a-job-button'));
  assert.equal(currentURL(), '/post-a-job');
});
