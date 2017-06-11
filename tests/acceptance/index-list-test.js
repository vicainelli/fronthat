import { test } from 'qunit';
import moduleForAcceptance from 'fronthat/tests/helpers/module-for-acceptance';
import _ from 'lodash';

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

test('search bar filters results', async function(assert) {
  await visit('/');
  await waitFor(500);
  const searchQuery = 'frontend';
  await fillIn('.search-box', searchQuery);
  await waitFor(100);
  const jobs = find('.job-item');
  const includesSearchTermInTitle = (jobs) => {
    for (let job of jobs) {
      assert.equal(_.includes(job.textContent.toUpperCase(), searchQuery.toUpperCase()), true);
    }
  };
  includesSearchTermInTitle(jobs);
});
