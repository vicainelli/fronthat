import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['job-item'],
  itemscope: '',
  itemtype: 'http://schema.org/JobPosting',
  attributeBindings: ['itemscope', 'itemtype'],
  classNameBindings: ['job.attributes.highlighted'],
});
