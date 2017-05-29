import Ember from 'ember';

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),
  jobFetchStatus: Ember.computed.alias('applicationController.jobFetchStatus'),
  actions: {
    firstVisibleChanged(object, index) {
      this.set('scrollPosition', index.toString());
    }
  },
});
