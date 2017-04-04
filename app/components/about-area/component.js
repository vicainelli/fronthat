import Ember from 'ember';
import ScrollToTop from '../../mixins/scroll-to-top';

export default Ember.Component.extend(ScrollToTop, {
  classNames: ['about-page'],
  tagName: 'about'
});
