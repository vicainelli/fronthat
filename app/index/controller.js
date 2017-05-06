import Ember from 'ember';

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),
  jobFetchStatus: Ember.computed.alias('applicationController.jobFetchStatus')
});
