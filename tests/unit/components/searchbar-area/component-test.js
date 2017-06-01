import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('search-area', 'Unit | Component | search area', {
  unit: true
});

test('it triggers updateSearchQuery action with engineer parameter', function(assert) {
  let component = this.subject();

  const actualSearchQuery = 'engineer';
  const searchChanged = (searchQuery) => {
    assert.equal(searchQuery, actualSearchQuery, 'searchChanged is triggered with engineer parameter');
  };

  component.set('searchChanged', searchChanged);

  component.actions.updateSearchQuery.bind(component)(actualSearchQuery);
});
