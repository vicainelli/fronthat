import Ember from 'ember';
import ScrollToTop from '../../mixins/scroll-to-top';

export default Ember.Component.extend(ScrollToTop, {
  classNames: ['job-details', 'fadeIn'],
  tagName: 'job-posting',
  itemscope: '',
  itemtype: 'http://schema.org/JobPosting',
  attributeBindings: ['itemscope', 'itemtype'],
});
