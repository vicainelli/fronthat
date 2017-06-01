import { test } from 'qunit';
import moduleForAcceptance from 'fronthat/tests/helpers/module-for-acceptance';
import testSelector from 'ember-test-selectors';

moduleForAcceptance('Acceptance | index to post');

test('navigating from / to /post-a-job', async function(assert) {
  await visit('/');
  await click(find('.nav-button.ripple', '.post-a-job'));
  assert.equal(currentURL(), '/post-a-job');
  assert.equal(find(testSelector('post-a-job-area-container')).length, 1);
});
