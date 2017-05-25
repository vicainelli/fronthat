import _ from 'lodash';
import Ember from 'ember';

const { assign } = Ember;

const initialState = {
  all: [],
  fetching: false,
  postAJobForm: {
    name: {
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

  if (action.type === 'UPDATE_NAME') {
    const errors = [];
    if (action.name.length < 3) {
      errors.push('Name must be at least 3 characters.')
    }
    return assign({}, state, {
      postAJobForm: {
        name: {
          value: action.name,
          errors: errors,
        }
      }
    });
  }

  if (action.type === 'UPDATE_EMAIL') {
    const errors = [];
    const isInvalidEmail = () => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return !re.test(action.email);
    };
    if (isInvalidEmail()) {
      errors.push('Please enter a valid email address.')
    }
    return assign({}, state, {
      postAJobForm: {
        email: {
          value: action.email,
          errors: errors,
        }
      }
    });
  }

  return state || initialState;
});

export default {
  jobs
}
