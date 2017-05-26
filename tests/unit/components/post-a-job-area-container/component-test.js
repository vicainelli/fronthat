import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('post-a-job-area-container', 'Unit | Component | post a job area container', {
  needs: ['service:redux'],
  unit: true
});

test('it returns true for disabled when name, title, url, description & email empty', function(assert) {
  let component = this.subject();
  assert.equal(component.get('disabled'), true, 'It has disabled submit');
});

test('it returns false for disabled when name, title, url, description & email are valid', function(assert) {
  let component = this.subject();
  component.actions.updateName('The FrontHAT');
  component.actions.updateEmail('the@fronthat.com');
  component.actions.updateURL('https://fronthat.com');
  component.actions.updateTitle('Some Title Goes Here Which Has To Be More Than 20 Characters');
  const generateStringWithXCharacters = (characters) => {
    let string = '';
    for (let i=0; i < characters; ++i) {
      string += 'A';
    }
    return string;
  };
  component.actions.updateDescription(generateStringWithXCharacters(500));
  assert.equal(component.get('disabled'), false, 'It has enabled submit');
});

test('it returns true for disabled when name, title, url, description & email are invalid', function(assert) {
  let component = this.subject();
  component.actions.updateName('AS');
  component.actions.updateEmail('invalid.mail');
  component.actions.updateURL('notvalidurl');
  component.actions.updateTitle('Too Short');
  component.actions.updateDescription('Too Short');
  assert.equal(component.get('disabled'), true, 'It has disabled submit');
});
