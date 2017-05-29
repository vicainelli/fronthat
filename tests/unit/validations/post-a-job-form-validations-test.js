import postAJobFormValidator from 'fronthat/validations/post-a-job-form';
import { module, test } from 'qunit';

module('Unit | Validations | post-a-job-form');

test('it returns empty array upon valid name', function(assert) {
  const name = 'Valid Name';
  assert.deepEqual(postAJobFormValidator['name'](name), [], 'It does not return errors for valid name');
});

test('it returns array with 1 error upon too short name', function(assert) {
  const name = 'A';
  assert.deepEqual(postAJobFormValidator['name'](name).length, 1, 'It does return 1 error for valid name');
});

test('it returns array with 1 error upon too long name', function(assert) {
  const name = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
  assert.deepEqual(postAJobFormValidator['name'](name).length, 1, 'It does return errors for invalid name');
});

test('it returns empty array upon valid email', function(assert) {
  const email = 'the@fronthat.com';
  assert.deepEqual(postAJobFormValidator['email'](email), [], 'It does not return errors for valid email');
});

test('it returns array with 1 error upon invalid email', function(assert) {
  const email = 'invalid.email';
  assert.deepEqual(postAJobFormValidator['email'](email).length, 1, 'It does return 1 error for valid email');
});

test('it returns empty array upon valid title', function(assert) {
  const title = 'Valid Title Am I Yes';
  assert.deepEqual(postAJobFormValidator['title'](title), [], 'It does not return errors for valid title');
});

test('it returns array with 1 error upon too short title', function(assert) {
  const title = 'A';
  assert.deepEqual(postAJobFormValidator['title'](title).length, 1, 'It does return errors for invalid title');
});

test('it returns array with 1 error upon too long title', function(assert) {
  const title = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
  assert.deepEqual(postAJobFormValidator['title'](title).length, 1, 'It does return errors for invalid title');
});

test('it returns empty array upon valid url', function(assert) {
  const url = 'https://google.com';
  assert.deepEqual(postAJobFormValidator['url'](url), [], 'It does not return errors for valid url');
});

test('it returns array with 1 error upon invalid URL', function(assert) {
  const url = 'invalidurl';
  assert.deepEqual(postAJobFormValidator['url'](url).length, 1, 'It does return errors for invalid url');
});

test('it returns empty array upon valid description', function(assert) {
  let description = '';
  for (let i = 0; i < 256; i++) {
    description = description + 'A';
  }
  assert.deepEqual(postAJobFormValidator['description'](description), [], 'It does not return errors for valid description');
});

test('it returns array with 1 error upon too short description', function(assert) {
  let description = '';
  for (let i = 0; i < 69; i++) {
    description = description + 'A';
  }
  assert.deepEqual(postAJobFormValidator['description'](description).length, 1, 'It does return errors for too short description');
});

test('it returns array with 1 error upon too long description', function(assert) {
  let description = '';
  for (let i = 0; i < 15001; i++) {
    description = description + 'A';
  }
  assert.deepEqual(postAJobFormValidator['description'](description).length, 1, 'It does return errors for too long description');
});
