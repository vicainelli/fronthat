import Ember from 'ember';

export default Ember.Route.extend({
  fastboot: Ember.inject.service(),

  model() {
    if (this.get('fastboot.isFastBoot')) {
      this.set('fastboot.response.statusCode', 404);
    }
  }
});
