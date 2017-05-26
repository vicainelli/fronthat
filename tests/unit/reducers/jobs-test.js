import reducer from 'fronthat/reducers/index';
import { module, test } from 'qunit';
import jobs from 'fronthat/mirage/json/jobs';
import invalidJobs from './jobs-invalid-state';
import deepFreeze from 'fronthat/tests/helpers/deep-freeze';
import Ember from 'ember';
const { assign } = Ember;

module('Unit | Reducers | jobs');

const initialState = {
  all: [],
  fetching: false,
  postAJobForm: {
    name: {
      value: '',
      errors: []
    },
    email: {
      value: '',
      errors: []
    }
  }
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
  const expected = assign({}, initialState, {all: [jobs.job1, jobs.job2, jobs.job3]});
  assert.deepEqual(result, expected);
});

test('fetching jobs action sets a true flag', function(assert) {
  const result = reducer.jobs(initialState, {
    type: 'FETCHING_JOBS',
  });
  const expected = assign({}, initialState, {fetching: true});
  assert.deepEqual(result, expected);
});

test('fetching complete action sets a false flag', function(assert) {
  const previous = reducer.jobs(initialState, {
    type: 'FETCHING_JOBS',
  });

  deepFreeze(previous);

  const result = reducer.jobs(previous, {
    type: 'FETCHING_COMPLETE',
  });

  const expected = assign({}, previous, {fetching: false});
  assert.deepEqual(result, expected);
});

test('fetching error action sets an error flag', function(assert) {
  const previous = reducer.jobs(initialState, {
    type: 'FETCHING_JOBS',
  });

  deepFreeze(previous);

  const result = reducer.jobs(previous, {
    type: 'FETCHING_ERROR',
  });

  const expected = assign({}, previous, {fetching: 'error'});
  assert.deepEqual(result, expected);
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


test('UPDATE_NAME action updates name value', function(assert) {
  const result = reducer.jobs(initialState, {
    type: 'UPDATE_NAME',
    name: 'Peter Gregory',
  });

  const postAJobForm = {
    name: {
      value: 'Peter Gregory',
      errors: [],
    }
  };
  const newPostAJobForm = assign({}, initialState.postAJobForm, postAJobForm);
  const expected = assign({}, initialState, {postAJobForm: newPostAJobForm});
  assert.deepEqual(result, expected);

});

test('UPDATE_NAME action updates errors', function(assert) {
  const result = reducer.jobs(initialState, {
    type: 'UPDATE_NAME',
    name: 'A',
  });

  const postAJobForm = {
    name: {
      value: 'A',
      errors: ['Name must be at least 3 characters.'],
    },
  };
  const newPostAJobForm = assign({}, initialState.postAJobForm, postAJobForm);
  const expected = assign({}, initialState, {postAJobForm: newPostAJobForm});
  assert.deepEqual(result, expected);

});

test('UPDATE_EMAIL action updates email value', function(assert) {
  const result = reducer.jobs(initialState, {
    type: 'UPDATE_EMAIL',
    email: 'the@fronthat.com',
  });

  const postAJobForm =  assign({}, initialState.postAJobForm, {
    email: {
      value: 'the@fronthat.com',
      errors: [],
    },
  });
  const expected = assign({}, initialState, {postAJobForm});
  assert.deepEqual(result, expected);

});

test('UPDATE_EMAIL action updates errors', function(assert) {
  const result = reducer.jobs(initialState, {
    type: 'UPDATE_EMAIL',
    email: 'invalid.email',
  });

  const postAJobForm = assign({}, initialState.postAJobForm, {
    email: {
      value: 'invalid.email',
      errors: ['Please enter a valid email address.'],
    },
  });
  const expected = assign({}, initialState, {postAJobForm});
  assert.deepEqual(result, expected);

});


test('UPDATE_EMAIL action does not overwrite UPDATE_NAME data', function(assert) {
  const previous = reducer.jobs(initialState, {
    type: 'UPDATE_NAME',
    name: 'AA',
  });

  deepFreeze(previous);

  const result = reducer.jobs(previous, {
    type: 'UPDATE_EMAIL',
    email: 'invalid.email',
  });

  const expected = assign({}, initialState, {
    postAJobForm: {
      name: {
        value: 'AA',
        errors: ['Name must be at least 3 characters.'],
      },
      email: {
        value: 'invalid.email',
        errors: ['Please enter a valid email address.'],
      },
    }
  });
  assert.deepEqual(result, expected);
});


test('UPDATE_NAME action does not overwrite UPDATE_EMAIL data', function(assert) {
  const previous = reducer.jobs(initialState, {
    type: 'UPDATE_EMAIL',
    email: 'gavin@hooli.xyz',
  });

  deepFreeze(previous);

  const result = reducer.jobs(previous, {
    type: 'UPDATE_NAME',
    name: 'Gavin',
  });

  const expected = assign({}, initialState, {
    postAJobForm: {
      name: {
        value: 'Gavin',
        errors: [],
      },
      email: {
        value: 'gavin@hooli.xyz',
        errors: [],
      },
    }
  });
  assert.deepEqual(result, expected);
});
