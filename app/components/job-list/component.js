import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
const { computed } = Ember;

export default Ember.Component.extend({
  fastboot: Ember.inject.service(),
  isFastBoot: Ember.computed.reads('fastboot.isFastBoot'),
  redux: Ember.inject.service(),

  didReceiveAttrs() {
    this._super(...arguments);
    // console.log('attrs', this.attrs);
  },

  sortedJobs: computed('jobs', function() {
    const byTimestamp = (x, y) => {
      return y.attributes.timestamp - x.attributes.timestamp;
    };
    const sortedJobs = this.get('jobs')
      .sort(byTimestamp);
    return sortedJobs;
  }),

  /*
  actions: {
    firstVisibleChanged(object, index) {
      console.log('scrollPosition');
      this.set('scrollPosition', index);
    }
  },
  */

  layout: hbs`
    {{#if jobs}}
      {{#if isFastBoot}}
        <div class="vertical-collection">
          {{#each sortedJobs as |job|}}
            {{job-item job=job}}
          {{/each}}
        </div>
      {{else}}
        {{#vertical-collection jobs
          containerSelector="body"
          staticHeight=true
          minHeight=125
          key='@index'
          firstVisibleChanged=firstVisibleChanged
          idForFirstItem=scrollPosition
          as |job index|}}
          {{job-item job=job}}
        {{/vertical-collection}}
      {{/if}}
    {{/if}}
  `
});
