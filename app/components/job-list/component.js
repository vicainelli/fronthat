import Ember from 'ember';

export default Ember.Component.extend({
  fastboot: Ember.inject.service(),
  isFastBoot: Ember.computed.reads('fastboot.isFastBoot'),
  actions: {
    firstVisibleChanged(object, index) {
      this.sendAction('firstVisibleChanged', index); }
  }
});
