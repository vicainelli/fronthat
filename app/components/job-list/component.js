import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
const { computed } = Ember;
import _ from 'lodash';

export default Ember.Component.extend({
  fastboot: Ember.inject.service(),
  isFastBoot: computed.reads('fastboot.isFastBoot'),

  sortedJobs: computed('jobs', 'search', function() {
    const searchQuery = this.get('search');
    if (searchQuery) {
      const bySearchQuery = (job) => {
        return _.includes(job.attributes.title.toUpperCase(), searchQuery.toUpperCase());
      };
      return this.get('jobs')
        .filter(bySearchQuery)
    }
    return this.get('jobs');
  }),

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
      {{search-area
        searchQuery=search
        searchChanged=filterBySearch
      }}
      {{#if isFastBoot}}
        <div class="vertical-collection">
          {{#each sortedJobs as |job|}}
            {{job-item job=job}}
          {{/each}}
        </div>
      {{else}}
        {{#if sortedJobs}}
          {{#vertical-collection sortedJobs
            containerSelector="body"
            staticHeight=true
            minHeight=125
            key='@index'
            firstVisibleChanged=firstVisibleChanged
            idForFirstItem=scrollPosition
            as |job index|}}
            {{job-item job=job}}
          {{/vertical-collection}}
        {{else}}
          <center>
            <h1>Sorry, no results matching your query.</h1>
          </center>
        {{/if}}
      {{/if}}
    {{/if}}
  `
});
