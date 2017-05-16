import Ember from 'ember';
import connect from 'ember-redux/components/connect';
import hbs from 'htmlbars-inline-precompile';

const stateToComputed = (state) => {
  return {
    jobs: state.jobs.all,
  };
};

const dispatchToActions = () => {
  return {};
};

const JobListComponent = Ember.Component.extend({
  fastboot: Ember.inject.service(),
  isFastBoot: Ember.computed.reads('fastboot.isFastBoot'),
  redux: Ember.inject.service(),

  /*
  actions: {
    firstVisibleChanged(object, index) {
      this.set('scrollPosition', index);
    }
  },
  */

  layout: hbs`
    {{yield jobs}}
  `

});

export default connect(stateToComputed, dispatchToActions)(JobListComponent);
