import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    postAJobSuccess() {
      console.log('postAJobSuccess from ROUTE ACTION');
    }
  }
});
