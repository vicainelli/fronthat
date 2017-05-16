import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import jobs from '../../../unit/reducers/jobs-json';
import _ from 'lodash';

moduleForComponent('job-list', 'Integration | Component | job list', {
  integration: true
});

const fastbootEnabled = {
  isFastBoot: true
};


test('it does not render anything given empty jobs', function(assert) {

  this.render(hbs`{{job-list}}`);
  assert.equal(this.$().text().trim(), '');
});

test('it does render at least 20 jobs given 200 jobs', function(assert) {

  this.set('jobs', jobs.all.data);
  this.render(hbs`{{job-list jobs=jobs}}`);

  const greaterThanTwenty = () => {
    return this.$('.job-item').length >= 20;
  };
  assert.equal(greaterThanTwenty(), true);
});

test('it does render everything in FastBoot mode', function(assert) {
  this.set('jobs', jobs.all.data);
  this.set('fastboot', fastbootEnabled);
  this.render(hbs`{{job-list jobs=jobs fastboot=fastboot}}`);

  assert.equal(this.$('.job-item').length, 200);
});

test('it sorts jobs by timestamp', function(assert) {

  this.set('jobs', jobs.all.data);
  this.set('fastboot', fastbootEnabled);
  this.render(hbs`{{job-list jobs=jobs fastboot=fastboot}}`);


  assert.equal(_.includes(this.$('.job-item').last().text(), '15 May'), false);
});
