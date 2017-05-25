import Ember from 'ember';
import connect from 'ember-redux/components/connect';
import hbs from 'htmlbars-inline-precompile';

const stateToComputed = (state) => {
  return {
    name: state.jobs.postAJobForm.name,
  };
};

const dispatchToActions = (dispatch) => {
  return {
    updateName: (name) => dispatch({type: 'UPDATE_NAME', name})
  };
};

const PostAJobAreaComponent = Ember.Component.extend({
  redux: Ember.inject.service(),

  layout: hbs`
    {{yield name (action 'updateName')}}
  `

});

export default connect(stateToComputed, dispatchToActions)(PostAJobAreaComponent);
