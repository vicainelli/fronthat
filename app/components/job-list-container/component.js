import Ember from 'ember';
import { connect } from 'ember-redux';
import hbs from 'htmlbars-inline-precompile';

const stateToComputed = (state) => {
  return {
    jobs: state.jobs.all,
    fetching: state.jobs.fetching,
  };
};

const dispatchToActions = () => {
  return {};
};

const JobListComponent = Ember.Component.extend({
  fastboot: Ember.inject.service(),
  isFastBoot: Ember.computed.reads('fastboot.isFastBoot'),
  redux: Ember.inject.service(),

  layout: hbs`
    {{yield jobs fetching}}
  `

});

export default connect(stateToComputed, dispatchToActions)(JobListComponent);
