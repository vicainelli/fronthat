import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('search-area', 'Integration | Component | search area', {
  integration: true
});

test('it triggers searchChanged action with designer parameter', function(assert) {
  const actualSearchQuery = 'designer';
  const searchChanged = (searchQuery) => {
    assert.equal(searchQuery, actualSearchQuery, 'Search query equals to designer');

  };
  this.set('searchChanged', searchChanged);

  this.render(hbs`{{search-area searchChanged=searchChanged}}`);

  this.$('input').val(actualSearchQuery);
  this.$('input').trigger('keyup');
});
