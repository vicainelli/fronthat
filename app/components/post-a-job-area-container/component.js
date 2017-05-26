import Ember from 'ember';
import connect from 'ember-redux/components/connect';
import hbs from 'htmlbars-inline-precompile';

const stateToComputed = (state) => {
  return {
    name: state.jobs.postAJobForm.name,
    email: state.jobs.postAJobForm.email,
    title: state.jobs.postAJobForm.title,
    url: state.jobs.postAJobForm.url,
    description: state.jobs.postAJobForm.description,
  };
};

const dispatchToActions = (dispatch) => {
  return {
    updateName: (name) => {
      dispatch({type: 'UPDATE_POST_A_JOB_FORM', data: {field: 'name', value: name}});
    },
    updateEmail: (email) => {
      dispatch({type: 'UPDATE_POST_A_JOB_FORM', data: {field: 'email', value: email}});
    },
    updateTitle: (title) => {
      dispatch({type: 'UPDATE_POST_A_JOB_FORM', data: {field: 'title', value: title}});
    },
    updateURL: (url) => {
      dispatch({type: 'UPDATE_POST_A_JOB_FORM', data: {field: 'url', value: url}});
    },
    updateDescription: (description) => {
      dispatch({type: 'UPDATE_POST_A_JOB_FORM', data: {field: 'description', value: description}});
    }
  };
};

const PostAJobAreaComponent = Ember.Component.extend({
  redux: Ember.inject.service(),

  layout: hbs`
    {{yield name (action 'updateName') email (action 'updateEmail') title (action 'updateTitle') url (action 'updateURL') description (action 'updateDescription')}}
  `

});

export default connect(stateToComputed, dispatchToActions)(PostAJobAreaComponent);
