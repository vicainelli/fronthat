import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
const { computed } = Ember;

export default Ember.Component.extend({
  fastboot: Ember.inject.service(),
  isFastBoot: computed.reads('fastboot.isFastBoot'),

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
      {{#if isFastBoot}}
        <div class="vertical-collection">
          {{#each jobs as |job|}}
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
