import { test } from 'qunit';
import moduleForAcceptance from 'fronthat/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | index list');

test('visiting / shows 5+ jobs', async function(assert) {
  await visit('/');
  await waitFor(500);
  const jobs = find('.job-item');
  const greaterThanTwenty = (jobs) => {
    return jobs.length >= 5;
  };
  assert.equal(currentURL(), '/');
  assert.equal(greaterThanTwenty(jobs), true);
});
