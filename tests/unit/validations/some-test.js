import postAJobFormValidator from 'fronthat/validations/post-a-job-form';
import { module, test } from 'qunit';

module('Unit | Validations | post-a-job-form');

test('it returns empty array upon valid name', function(assert) {
  const name = 'Valid Name';
  assert.deepEqual(postAJobFormValidator['name'](name), [], 'It does not return errors for valid name');
});

test('it returns array with 1 error upon invalid name', function(assert) {
  const name = 'A';
  assert.deepEqual(postAJobFormValidator['name'](name).length, 1, 'It does return 1 error for valid name');
});

test('it returns empty array upon valid email', function(assert) {
  const email = 'the@fronthat.com';
  assert.deepEqual(postAJobFormValidator['email'](email), [], 'It does not return errors for valid email');
});

test('it returns array with 1 error upon invalid email', function(assert) {
  const email = 'invalid.email';
  assert.deepEqual(postAJobFormValidator['email'](email).length, 1, 'It does return 1 error for valid email');
});
