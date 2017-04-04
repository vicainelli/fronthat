import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('job-details', 'Integration | Component | job details', {
  integration: true
});

test('it displays the title', function(assert) {

  const job = Ember.Object.create({
    title: 'Random Title'
  });
  this.set('job', job);

  this.render(hbs`{{job-details job=job}}`);

  assert.equal(this.$('.job-details-main-toolbar').first().text().trim(), job.get('title'));
});
