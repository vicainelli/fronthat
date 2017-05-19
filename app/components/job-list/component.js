import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
const { computed } = Ember;
import _ from 'lodash';

export default Ember.Component.extend({
  bufferSize: 20,
  fastboot: Ember.inject.service(),
  isFastBoot: Ember.computed.reads('fastboot.isFastBoot'),
  redux: Ember.inject.service(),

  sortedJobs: computed('jobs', 'search', function() {
    const byTimestamp = (x, y) => {
      return y.attributes.timestamp - x.attributes.timestamp;
    };
    const searchQuery = this.get('search');

    const bySearchQuery = (job) => {
      return _.includes(job.attributes.title.toUpperCase(), searchQuery.toUpperCase());
    };

    console.time('filterSearch');
    if (searchQuery) {
      return this.get('jobs')
        .filter(bySearchQuery)
        .sort(byTimestamp);
    }
    console.timeEnd('filterSearch');

    return this.get('jobs')
      .sort(byTimestamp);
  }),

  actions: {
    filterBySearch(searchQuery) {
      this.set('search', searchQuery);
    }
  },

  layout: hbs`
    {{#if (eq fetching true)}}
      {{loading-indicator loadingText='Updating...'}}
    {{/if}}
    {{#if (eq fetching 'error')}}
      <div class="job-load-error-text">
        <p>Oh, snap. Something went wrong while trying to download new content.</p>
        <p>Please reload the application, sorry.</p>
      </div>
    {{/if}}
    {{#if jobs}}
      {{search-area searchChanged=(action 'filterBySearch')}}
      {{#if isFastBoot}}
        <div class="vertical-collection">
          {{#each sortedJobs as |job|}}
            {{job-item job=job}}
          {{/each}}
        </div>
      {{else}}
        {{#vertical-collection sortedJobs
          bufferSize=bufferSize
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
