import Ember from 'ember';
import JobListActions from '../mixins/job-list-actions';

export default Ember.Controller.extend(JobListActions, {
  redux: Ember.inject.service(),

  setupOnlineListener() {
    const redux = this.get('redux');
    let online = false;
    const stateChanged = () => {
      const newOnlineValue = redux.store.getState().offline.online;
      if (online !== newOnlineValue) {
        online = newOnlineValue;
        const jobsFetched = (jobs) => {
          this.dispatchDerializeJobs(jobs);
          this.dispatchFetchComplete();
        };
        const fetchError = () => {
          this.dispatchFetchError();
        };
        if (online) {
          this.dispatchFetchingJobs();
          this.fetchJobsList().then(jobsFetched, fetchError);
        }
      }
    };
    redux.store.subscribe(stateChanged);
  },

});
