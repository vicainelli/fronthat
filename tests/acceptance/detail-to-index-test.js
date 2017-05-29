import { test } from 'qunit';
import moduleForAcceptance from 'fronthat/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | detail to index');

test('when visiting detail route and then index', async function(assert) {
  localStorage.removeItem('reduxPersist:jobs')
  await visit('jobs/15/05/2017/senior-interactive-designer');
  assert.equal(currentURL(), 'jobs/15/05/2017/senior-interactive-designer');
  await visit('/');
  await waitFor(500);
  const jobs = find('.job-item');
  const greaterThanOne = (jobs) => {
    return jobs.length >= 5;
  };
  assert.equal(currentURL(), '/');
  assert.equal(greaterThanOne(jobs), true, 'It has more than 5 jobs');
});
