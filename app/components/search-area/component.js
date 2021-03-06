import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

export default Ember.Component.extend({

  actions: {
    updateSearchQuery(searchQuery) {
      this.get('searchChanged')(searchQuery);
    }
  },

  layout: hbs`
    <div class="search-area">
      {{input
        value=searchQuery
        key-up='updateSearchQuery'
        class="search-box"
        placeholder="Search"
      }}
    </div>
  `

});
