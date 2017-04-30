import Ember from 'ember';
import { task } from 'ember-concurrency';
const { computed } = Ember;
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
        this.notifyPropertyChange('jobFetchStatus');
      }
    };
    redux.store.subscribe(stateChanged);
  },

  jobFetchStatus: computed(function() {
    return this.get('loadAllJobsTask').perform();
  }),

  loadAllJobsTask: task(function * () {
    const online = this.get('redux').store.getState().offline.online;
    const shouldNotFetch = () => {
      if (typeof FastBoot !== 'undefined' || !online) {
        return true;
      }
      return false;
    };
    if (shouldNotFetch()) { return; }
    try {
      const jobs = yield this.fetchJobsList();
      this.dispatchDerializeJobs(jobs);
    } catch(e) {
      throw new Error(e);
    }
  }).drop(),

});
