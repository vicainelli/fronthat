import { test } from 'qunit';
import moduleForAcceptance from 'fronthat/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | job list scroll');

test('visiting /', function(assert) {
  visit('/');
  // waitFor(1000);
  return wait().then(() => {
    assert.equal(currentURL(), '/');
  });
});
