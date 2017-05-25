import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

export default Ember.Component.extend({

  layout: hbs`
    <div data-test-post-a-job-area-container>
      <div class="input container" data-test-name-input-container>
        <label for="name-input">Name</label>
        {{one-way-input
          name.value
          id="name-input"
          updateName=updateName
        }}
        {{#if name.errors}}
          <span data-test-name-input-errors>
            {{name.errors}}
          </span>
        {{/if}}
      </div>
    </div>
  `
});
