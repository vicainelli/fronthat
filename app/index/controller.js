import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  fastboot: Ember.inject.service(),
  isFastBoot: Ember.computed.reads('fastboot.isFastBoot'),
  _loadedJobs: [],

  jobs: computed('model.loadTask.{isFinished,value}',
                 '_loadedJobs', function() {
    if (this.get('model.loadTask.isFinished')) {
      return this.get('model.loadTask.value');
    }
    return this.get('_loadedJobs');
  }),
});
