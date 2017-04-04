import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    let fullSlug = params.day + "/" + params.month + "/" + params.year + "/" + params.slug;
    let peekedJobs = this.get('store').peekAll('job');
    let peekQuery = peekedJobs.filterBy('slug', fullSlug);
    if (peekQuery.length > 0) {
      return peekQuery.get('firstObject');
    }
    let returnFirstObject = (jobs) => {
      if (jobs.content.length > 0) {
        return jobs.get("firstObject");
      }
      this.transitionTo('/not-found');
    };
    return this.get('store').query('job', {
      slug: fullSlug
    }).then(returnFirstObject);
  },
  afterModel: function(model) {
    this.setHeadTags(model);
  },

  setHeadTags: function(model) {
    var headTags = [
      {
        type: 'meta',
        tagId: 'meta-twitter-title',
        attrs: {
          name: 'twitter:title',
          content: model.get('title'),
        }
      },
      {
        type: 'meta',
        tagId: 'meta-og-title',
        attrs: {
          name: 'og:title',
          content: model.get('title'),
        }
      },
      {
        type: 'meta',
        tagId: 'description',
        attrs: {
          name: 'description',
          content: model.get('seoDescription')
        }
      },
      {
        type: 'meta',
        tagId: 'meta-og-description',
        attrs: {
          name: 'og:description',
          content: model.get('seoDescription')
        }
      },
      {
        type: 'meta',
        tagId: 'meta-twitter-description',
        attrs: {
          name: 'twitter:description',
          content: model.get('seoDescription')
        }
      },
      {
        type: 'meta',
        tagId: 'meta-og-url',
        attrs: {
          name: 'og:url',
          content: 'https://fronthat.com/jobs/' + model.get('slug')
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
  }
});
