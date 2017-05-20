import reducer from 'fronthat/reducers/index';
import { module, test } from 'qunit';
import jobs from './jobs-json';
import invalidJobs from './jobs-invalid-state';
import deepFreeze from 'fronthat/tests/helpers/deep-freeze';


module('Unit | Reducers | jobs');

const initialState = {
  all: [],
  fetching: false
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
    all: [jobs.job1, jobs.job2, jobs.job3],
    fetching: false
  });
});

test('fetching jobs action sets a true flag', function(assert) {
  const result = reducer.jobs(initialState, {
    type: 'FETCHING_JOBS',
  });
  assert.deepEqual(result, {
    all: [],
    fetching: true
  });
});

test('fetching complete action sets a false flag', function(assert) {
  const previous = reducer.jobs(initialState, {
    type: 'FETCHING_JOBS',
  });

  deepFreeze(previous);

  const result = reducer.jobs(previous, {
    type: 'FETCHING_COMPLETE',
  });

  assert.deepEqual(result, {
    all: [],
    fetching: false
  });
});

test('fetching error action sets an error flag', function(assert) {
  const previous = reducer.jobs(initialState, {
    type: 'FETCHING_JOBS',
  });

  deepFreeze(previous);

  const result = reducer.jobs(previous, {
    type: 'FETCHING_ERROR',
  });

  assert.deepEqual(result, {
    all: [],
    fetching: 'error'
  });
});

test('it removes offline jobs without timestamp', function(assert) {
  const result = reducer.jobs(invalidJobs, {
    type: 'DESERIALIZE_JOBS',
    response: jobs.all.data
  });
  let withoutTimeStamp = 0;
  result.all.forEach((job) => {
    if (!job.attributes.timestamp) {
      withoutTimeStamp++;
    }
  });
  assert.equal(withoutTimeStamp, 0);
});
