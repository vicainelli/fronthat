import { test } from 'qunit';
import moduleForAcceptance from 'fronthat/tests/helpers/module-for-acceptance';
import _ from 'lodash';

moduleForAcceptance('Acceptance | detail title');

test('detail routes have title and company in the title', async function(assert) {
  await visit('/');
  await waitFor(500);
  const firstJob = find('a', '.job-item').first();
  await click(firstJob);
  assert.equal(_.includes(currentURL(), '/jobs'), true);

  const actualTitle = document.title;
  const displayTitle = find('h1', '.job-details-main-toolbar').text().trim();
  const displayCompany = find('.job-company').text().trim();

  assert.equal(_.includes(actualTitle, displayTitle), true);
  assert.equal(_.includes(actualTitle, displayCompany), true);
});
