import Ember from 'ember';

export default Ember.Test.registerAsyncHelper(
  'waitFor', (app, delay) => {
    Ember.Test.promise((resolve) => {
      setTimeout(function() {
        resolve();
      }, delay);
    });
});
