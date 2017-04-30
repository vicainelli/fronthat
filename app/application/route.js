import Ember from 'ember';
import JobListActions from '../mixins/job-list-actions';

export default Ember.Route.extend(JobListActions, {
  model() {
    // Make model hook blocking in order to render
    // everything in FastBoot mode.
    if (typeof FastBoot !== 'undefined') {
      return this.fetchJobsList()
        .then(this.dispatchDerializeJobs.bind(this));
    }
  },
  setupController(controller) {
    this._super(...arguments);
    controller.setupOnlineListener();
  },
});
