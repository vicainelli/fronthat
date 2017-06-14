import Ember from 'ember';

export default Ember.Route.extend({
  afterModel: function(model) {
    this.setHeadTags(model);
  },
  setHeadTags: function() {
    var headTags = [
      {
        type: 'meta',
        tagId: 'meta-noindex',
        attrs: {
          name: 'robots',
          content: 'noindex',
        }
      },
    ];

    this.set('headTags', headTags);
  },
});
