import reducer from 'fronthat/reducers/index';
import { module, test } from 'qunit';
import jobs from './jobs-json';

module('Unit | Reducers | jobs');

const initialState = {
  all: []
};

test('the initial state is empty', function(assert) {
  const result = reducer.jobs(undefined, {});
  assert.deepEqual(result, initialState);
});

test('deserialize jobs actions parses fetched API response', function(assert) {
  const result = reducer.jobs(initialState, {
    type: 'DESERIALIZE_JOBS',
    response: [jobs.job1, jobs.job2, jobs.job3]
  });
  assert.deepEqual(result, {
    all: [jobs.job1, jobs.job2, jobs.job3]
  });
});

/*
test('deserialize jobs action sorts items by timestamp', function(assert) {
  const result = reducer.jobs(initialState, {
    type: 'DESERIALIZE_JOBS',
    response: jobs.all.data
  });
  assert.equal(result.all.length, 200);
  assert.deepEqual(result.all[199], jobs.all.data[198]);
});
*/
