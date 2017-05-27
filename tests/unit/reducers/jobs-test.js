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
  posting: false,
  postAJobForm: {
    name: {
      value: '',
      errors: []
    },
    email: {
      value: '',
      errors: []
    },
    url: {
      value: '',
      errors: []
    },
    title: {
      value: '',
      errors: []
    },
    description: {
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


test('UPDATE_POST_A_JOB_FORM action updates name value', function(assert) {
  const result = reducer.jobs(initialState, {
    type: 'UPDATE_POST_A_JOB_FORM',
    data: {field: 'name', value: 'Peter Gregory'}
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

test('UPDATE_POST_A_JOB_FORM action updates name value errors', function(assert) {
  const result = reducer.jobs(initialState, {
    type: 'UPDATE_POST_A_JOB_FORM',
    data: {field: 'name', value: 'AS'}
  });

  const postAJobForm = {
    name: {
      value: 'AS',
      errors: ['Name must be at least 3 characters.'],
    }
  };
  const newPostAJobForm = assign({}, initialState.postAJobForm, postAJobForm);
  const expected = assign({}, initialState, {postAJobForm: newPostAJobForm});
  assert.deepEqual(result, expected);
});

test('UPDATE_POST_A_JOB_FORM action updates email value', function(assert) {
  const result = reducer.jobs(initialState, {
    type: 'UPDATE_POST_A_JOB_FORM',
    data: {field: 'email', value: 'the@fronthat.com'}
  });

  const postAJobForm = {
    email: {
      value: 'the@fronthat.com',
      errors: [],
    }
  };
  const newPostAJobForm = assign({}, initialState.postAJobForm, postAJobForm);
  const expected = assign({}, initialState, {postAJobForm: newPostAJobForm});
  assert.deepEqual(result, expected);
});

test('UPDATE_POST_A_JOB_FORM action updates email value errors', function(assert) {
  const result = reducer.jobs(initialState, {
    type: 'UPDATE_POST_A_JOB_FORM',
    data: {field: 'email', value: 'invalid.email'}
  });

  const postAJobForm = {
    email: {
      value: 'invalid.email',
      errors: ['Please enter a valid email address.'],
    }
  };
  const newPostAJobForm = assign({}, initialState.postAJobForm, postAJobForm);
  const expected = assign({}, initialState, {postAJobForm: newPostAJobForm});
  assert.deepEqual(result, expected);
});

test('UPDATE_POST_A_JOB_FORM action email does not overwrite name data', function(assert) {
  const previous = reducer.jobs(initialState, {
    type: 'UPDATE_POST_A_JOB_FORM',
    data: {field: 'email', value: 'invalid.email'}
  });

  deepFreeze(previous);

  const result = reducer.jobs(previous, {
    type: 'UPDATE_POST_A_JOB_FORM',
    data: {field: 'name', value: 'Gavin'}
  });

  const postAJobForm = {
    name: {
      value: 'Gavin',
      errors: [],
    },
    email: {
      value: 'invalid.email',
      errors: ['Please enter a valid email address.'],
    },
  };

  const newPostAJobForm = assign({}, initialState.postAJobForm, postAJobForm);
  const expected = assign({}, initialState, {postAJobForm: newPostAJobForm});
  assert.deepEqual(result, expected);
});

test('UPDATE_POST_A_JOB_FORM action updates title value', function(assert) {
  const result = reducer.jobs(initialState, {
    type: 'UPDATE_POST_A_JOB_FORM',
    data: {field: 'title', value: 'Some Title Goes Here'}
  });

  const postAJobForm = {
    title: {
      value: 'Some Title Goes Here',
      errors: [],
    }
  };
  const newPostAJobForm = assign({}, initialState.postAJobForm, postAJobForm);
  const expected = assign({}, initialState, {postAJobForm: newPostAJobForm});
  assert.deepEqual(result, expected);
});

test('UPDATE_POST_A_JOB_FORM action updates title value errors', function(assert) {
  const result = reducer.jobs(initialState, {
    type: 'UPDATE_POST_A_JOB_FORM',
    data: {field: 'title', value: 'INV'}
  });

  const postAJobForm = {
    title: {
      value: 'INV',
      errors: ['Title must be at least 20 characters.'],
    }
  };
  const newPostAJobForm = assign({}, initialState.postAJobForm, postAJobForm);
  const expected = assign({}, initialState, {postAJobForm: newPostAJobForm});
  assert.deepEqual(result, expected);
});

test('UPDATE_POST_A_JOB_FORM action updates url value', function(assert) {
  const result = reducer.jobs(initialState, {
    type: 'UPDATE_POST_A_JOB_FORM',
    data: {field: 'url', value: 'https://google.com'}
  });

  const postAJobForm = {
    url: {
      value: 'https://google.com',
      errors: [],
    }
  };
  const newPostAJobForm = assign({}, initialState.postAJobForm, postAJobForm);
  const expected = assign({}, initialState, {postAJobForm: newPostAJobForm});
  assert.deepEqual(result, expected);
});

test('UPDATE_POST_A_JOB_FORM action updates url value errors', function(assert) {
  const result = reducer.jobs(initialState, {
    type: 'UPDATE_POST_A_JOB_FORM',
    data: {field: 'url', value: 'invalidurl'}
  });

  const postAJobForm = {
    url: {
      value: 'invalidurl',
      errors: ['Please enter a valid URL.'],
    }
  };
  const newPostAJobForm = assign({}, initialState.postAJobForm, postAJobForm);
  const expected = assign({}, initialState, {postAJobForm: newPostAJobForm});
  assert.deepEqual(result, expected);
});

test('UPDATE_POST_A_JOB_FORM action updates description value', function(assert) {
  let description = '';
  for (let i = 0; i < 255; i++) {
    description = description + 'A';
  }
  const result = reducer.jobs(initialState, {
    type: 'UPDATE_POST_A_JOB_FORM',
    data: {field: 'description', value: description}
  });

  const postAJobForm = {
    description: {
      value: description,
      errors: [],
    }
  };
  const newPostAJobForm = assign({}, initialState.postAJobForm, postAJobForm);
  const expected = assign({}, initialState, {postAJobForm: newPostAJobForm});
  assert.deepEqual(result, expected);
});

test('UPDATE_POST_A_JOB_FORM action updates description value errors', function(assert) {
  let invalidDescription = '';
  for (let i = 0; i < 15001; i++) {
    invalidDescription = invalidDescription + 'A';
  }
  const result = reducer.jobs(initialState, {
    type: 'UPDATE_POST_A_JOB_FORM',
    data: {field: 'description', value: invalidDescription}
  });

  const postAJobForm = {
    description: {
      value: invalidDescription,
      errors: ['Description is too long. Maximum 15000 characters allowed.'],
    }
  };
  const newPostAJobForm = assign({}, initialState.postAJobForm, postAJobForm);
  const expected = assign({}, initialState, {postAJobForm: newPostAJobForm});
  assert.deepEqual(result, expected);
});

test('POSTING_A_JOB action sets a true flag', function(assert) {
  const result = reducer.jobs(initialState, {
    type: 'POSTING_A_JOB',
  });
  const expected = assign({}, initialState, {posting: true});
  assert.deepEqual(result, expected);
});

test('POSTING_A_JOB_COMPLETE complete action sets a false flag', function(assert) {
  const previous = reducer.jobs(initialState, {
    type: 'POSTING_A_JOB',
  });

  deepFreeze(previous);

  const result = reducer.jobs(previous, {
    type: 'POSTING_A_JOB_COMPLETE',
  });

  const expected = assign({}, previous, {posting: false});
  assert.deepEqual(result, expected);
});

test('POSTING_A_JOB_ERROR error action sets postAJobForm errors', function(assert) {
  const previous = reducer.jobs(initialState, {
    type: 'POSTING_A_JOB',
  });

  deepFreeze(previous);

  const error1 = 'Email invalid';
  const error2 = 'Something else';

  const result = reducer.jobs(previous, {
    type: 'POSTING_A_JOB_ERROR',
    errors: [error1, error2],
  });

  const postAJobForm = {
    errors: [error1, error2]
  };
  const newPostAJobForm = assign({}, initialState.postAJobForm, postAJobForm);
  const expected = assign({}, previous, {postAJobForm: newPostAJobForm});
  assert.deepEqual(result, expected);
});
