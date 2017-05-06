import _ from 'lodash';

const initialState = {
  all: []
};

const jobs = ((state, action) => {
  if (action.type === 'DESERIALIZE_JOBS') {
    const equalId = (job) => { return job.id; };
    const merged = _.uniqBy(_.concat(state.all, action.response), equalId);
    return Object.assign({}, state, {all: merged});
  }

  return state || initialState;
});

export default {
  jobs
}
