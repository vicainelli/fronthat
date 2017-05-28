import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    postAJobSuccess() {
      this.transitionTo('post-a-job-success');
    }
  }
});
