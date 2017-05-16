import _ from 'lodash';
import Ember from 'ember';

const { assign } = Ember;

const initialState = {
  all: []
};

const jobs = ((state, action) => {
  if (action.type === 'DESERIALIZE_JOBS') {
    const equalId = (job) => { return job.id; };
    const byTimestamp = (x, y) => {
      return y.attributes.timestamp - x.attributes.timestamp;
    };
    const merged = _.uniqBy(_.concat(state.all, action.response), equalId)
      .sort(byTimestamp);
    return assign({}, state, {all: merged});
  }

  return state || initialState;
});

export default {
  jobs
}
