import Ember from 'ember';
import connect from 'ember-redux/components/connect';
import hbs from 'htmlbars-inline-precompile';

const stateToComputed = (/* state */) => {
  return {};
};

const dispatchToActions = () => {
  return {};
};

const PostAJobAreaComponent = Ember.Component.extend({
  redux: Ember.inject.service(),

  layout: hbs`
    {{yield}}
  `

});

export default connect(stateToComputed, dispatchToActions)(PostAJobAreaComponent);
