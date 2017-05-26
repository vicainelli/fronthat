import Ember from 'ember';
import connect from 'ember-redux/components/connect';
import hbs from 'htmlbars-inline-precompile';

const stateToComputed = (state) => {
  return {
    name: state.jobs.postAJobForm.name,
    email: state.jobs.postAJobForm.email,
  };
};

const dispatchToActions = (dispatch) => {
  return {
    updateName: (name) => {
      dispatch({type: 'UPDATE_NAME', name});
    },
    updateEmail: (email) => {
      dispatch({type: 'UPDATE_EMAIL', email});
    }
  };
};

const PostAJobAreaComponent = Ember.Component.extend({
  redux: Ember.inject.service(),

  layout: hbs`
    {{yield name (action 'updateName') email (action 'updateEmail')}}
  `

});

export default connect(stateToComputed, dispatchToActions)(PostAJobAreaComponent);
