import Ember from 'ember';

export default Ember.Mixin.create({
  didInsertElement() {
    this._super(...arguments);
    Ember.$('body').scrollTop(0);
  }
});
