import Ember from 'ember';
import connect from 'ember-redux/components/connect';
import hbs from 'htmlbars-inline-precompile';
import fetch from 'fetch';
import ENV from 'fronthat/config/environment';
const { Promise } = Ember.RSVP;

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
  const errors = () => {
    if (state.jobs.posting) { return []; }
    return state.jobs.postAJobForm.errors;
  };
  return {
    name, email, title, url, description,
    disabled: disabled(),
    errors: errors(),
    loading: state.jobs.posting,
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
    },
    postAJobRequest: () => {
      return new Promise((resolve, reject) => {
        const jobsFetched = (response) => {
          if (response.status === 200) {
            return resolve();
          }
          return reject('failed to get a response');
        };
        const fetchOptions = {
          method: "POST",
          body: JSON.stringify({}),
        };
        fetch(`${ENV.apiURL}/jobs`, fetchOptions)
          .then(jobsFetched, reject)
      });
    },
    postAJob: function() {
      console.log('before this is');
      console.log('this is', this.get('postAJobSuccess')());
      console.log('after this is');
      this.actions.postingAJob();
      this.actions.postAJobRequest()
        .then(this.actions.postingAJobComplete.bind(this), this.actions.postingAJobError);
    },
    postingAJob: () => {
      dispatch({type: 'POSTING_A_JOB'});
    },
    postingAJobComplete: () => {
      console.log('complete');
      dispatch({type: 'POSTING_A_JOB_COMPLETE'});
    },
    postingAJobError: (errors) => {
      dispatch({type: 'POSTING_A_JOB_ERROR', errors});
    },
  };
};

const PostAJobAreaComponent = Ember.Component.extend({
  redux: Ember.inject.service(),

  layout: hbs`
    {{yield
      name
      (action 'updateName')
      email
      (action 'updateEmail')
      title
      (action 'updateTitle')
      url
      (action 'updateURL')
      description
      (action 'updateDescription')
      disabled
      errors
      loading
      (action 'postAJob')
    }}
  `

});

export default connect(stateToComputed, dispatchToActions)(PostAJobAreaComponent);
