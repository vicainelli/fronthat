import Ember from 'ember';
import connect from 'ember-redux/components/connect';
import hbs from 'htmlbars-inline-precompile';

const stateToComputed = (state) => {
  const name = state.jobs.postAJobForm.name;
  const email = state.jobs.postAJobForm.email;
  const title = state.jobs.postAJobForm.title;
  const url = state.jobs.postAJobForm.url;
  const description = state.jobs.postAJobForm.description;
  const isReadyToSubmit = (field) => {
    return !!field.value && field.errors.length === 0;
  };
  const disabled = () => {
    return !(isReadyToSubmit(name) &&
      isReadyToSubmit(email) &&
      isReadyToSubmit(title) &&
      isReadyToSubmit(url) &&
      isReadyToSubmit(description));
  };
  return {name, email, title, url, description, disabled: disabled()};
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
    {{yield name (action 'updateName') email (action 'updateEmail') title (action 'updateTitle') url (action 'updateURL') description (action 'updateDescription') disabled}}
  `

});

export default connect(stateToComputed, dispatchToActions)(PostAJobAreaComponent);
