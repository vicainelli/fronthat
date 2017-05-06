import Ember from 'ember';
import fetch from 'fetch';
import ENV from 'fronthat/config/environment';

const { Promise } = Ember.RSVP;

export default Ember.Mixin.create({
  redux: Ember.inject.service(),

  fetchJobsList() {
    return new Promise((resolve, reject) => {
      const jobsJson = (json) => {
        return resolve(json.data);
      };
      const jobsFetched = (response) => {
        if (response.status === 200) {
          return response.json();
        }
        return reject('failed to get a response');
      };
      fetch(`${ENV.apiURL}/jobs`)
        .then(jobsFetched, reject)
        .then(jobsJson, reject)
    });
  },

  dispatchDerializeJobs(jobs) {
    const dispatch = this.get('redux.store.dispatch');
    dispatch({
      type: 'DESERIALIZE_JOBS',
      response: jobs,
    });
  },
});
