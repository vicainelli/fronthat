import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Route.extend({
  fastboot: Ember.inject.service(),
  isFastBoot: Ember.computed.reads('fastboot.isFastBoot'),
  model() {
    if (this.get('isFastBoot')) {
      return this.get('store').findAll('job');
    } else if (this.currentModel) {
      return this.currentModel;
    }
    return {
      loadTask: this.get('fetchJobsTask').perform(),
    };
  },
  setupController(controller) {
    this._super(...arguments);
    let store = this.get('store');
    let jobs = store.peekAll('job');
    controller.set('_loadedJobs', jobs);
  },
  fetchJobsTask: task(function * () {
    return yield this.get('store').findAll('job');
  }),
  afterModel: function(model) {
    this.setHeadTags(model);
  },
  setHeadTags: function() {
    var headTags = [
      {
        type: 'meta',
        tagId: 'meta-og-title',
        attrs: {
          name: 'og:title',
          content: 'Remote Frontend Jobs',
        }
      },
      {
        type: 'meta',
        tagId: 'meta-twitter-title',
        attrs: {
          name: 'twitter:title',
          content: 'Remote Frontend Jobs',
        }
      },
      {
        type: 'meta',
        tagId: 'description',
        attrs: {
          name: 'description',
          content: 'Curated collection of 100% remote frontend jobs'
        }
      },
      {
        type: 'meta',
        tagId: 'meta-og-description',
        attrs: {
          name: 'og:description',
          content: 'Curated collection of 100% remote frontend jobs'
        }
      },
      {
        type: 'meta',
        tagId: 'meta-twitter-description',
        attrs: {
          name: 'twitter:description',
          content: 'Curated collection of 100% remote frontend jobs'
        }
      },
      {
        type: 'meta',
        tagId: 'meta-og-url',
        attrs: {
          name: 'og:url',
          content: 'https://fronthat.com'
        }
      },
      {
        type: 'meta',
        tagId: 'meta-og-siteName',
        attrs: {
          name: 'og:site_name',
          content: 'FrontHAT'
        }
      },
      {
        type: 'meta',
        tagId: 'meta-twitter-site',
        attrs: {
          name: 'twitter:site',
          content: '@thefronthat'
        }
      },
      {
        type: 'meta',
        tagId: 'meta-twitter-card',
        attrs: {
          name: 'twitter:card',
          content: 'summary',
        }
      },
      {
        type: 'meta',
        tagId: 'meta-og-image',
        attrs: {
          name: 'og:image',
          content: 'https://fronthat.com/assets/images/icons/touch-icon-256x256.png',
        }
      },
      {
        type: 'meta',
        tagId: 'meta-twitter-image',
        attrs: {
          name: 'twitter:image',
          content: 'https://fronthat.com/assets/images/icons/touch-icon-256x256.png',
        }
      },
    ];

    this.set('headTags', headTags);
  },
  actions: {
    firstVisibleChanged(scrollPosition) {
      this.controller.set('scrollPosition', scrollPosition.scroll);
    }
  }
});
