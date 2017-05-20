import { test } from 'qunit';
import moduleForAcceptance from 'fronthat/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | index list');

test('visiting / shows 5+ jobs', function(assert) {
  visit('/');
  waitFor(500);
  return andThen(() => {
    const jobs = find('.job-item');
    const greaterThanTwenty = (jobs) => {
      return jobs.length >= 5;
    };
    assert.equal(currentURL(), '/');
    assert.equal(greaterThanTwenty(jobs), true);
  });
});
