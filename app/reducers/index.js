import _ from 'lodash';
import Ember from 'ember';
import postAJobFormValidator from 'fronthat/validations/post-a-job-form';

const { assign } = Ember;

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

const jobs = ((state, action) => {
  if (action.type === 'DESERIALIZE_JOBS') {
    const currentState = state.all
      .filter((job) => {
        return !!job.attributes.timestamp;
      });
    const equalId = (job) => { return job.id; };
    const merged = _.uniqBy(_.concat(currentState, action.response), equalId);
    return assign({}, state, {all: merged});
  }

  if (action.type === 'FETCHING_JOBS') {
    return assign({}, state, {fetching: true});
  }

  if (action.type === 'FETCHING_COMPLETE') {
    return assign({}, state, {fetching: false});
  }

  if (action.type === 'FETCHING_ERROR') {
    return assign({}, state, {fetching: 'error'});
  }

  if (action.type === 'POSTING_A_JOB') {
    return assign({}, state, {posting: true});
  }

  if (action.type === 'POSTING_A_JOB_COMPLETE') {
    return assign({}, state, {posting: false});
  }

  if (action.type === 'POSTING_A_JOB_ERROR') {
    const postAJobForm = {errors: action.errors};
    const newPostAJobForm = assign({}, state.postAJobForm, postAJobForm);
    return assign({}, state, {postAJobForm: newPostAJobForm});
  }

  if (action.type === 'UPDATE_POST_A_JOB_FORM') {
    const field = action.data.field;
    const postAJobForm = {};
    postAJobForm[field] = {
      value: action.data.value,
      errors: postAJobFormValidator[field](action.data.value),
    };
    const newPostAJobForm = assign({}, state.postAJobForm, postAJobForm);
    return assign({}, state, {postAJobForm: newPostAJobForm});
  }

  return state || initialState;
});

export default {
  jobs
}

