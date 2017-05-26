import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

export default Ember.Component.extend({

  layout: hbs`
    <div data-test-post-a-job-area-container>

      <div class="input container" data-test-name-input-container>
        <label for="name-input" data-test-name-input-label>Name</label>
        {{one-way-input
          name.value
          id="name-input"
          update=updateName
        }}
        {{#if name.errors}}
          <span data-test-name-input-errors>
            {{name.errors}}
          </span>
        {{/if}}
      </div>

      <div class="input container" data-test-email-input-container>
        <label for="email-input" data-test-email-input-label>Email</label>
        {{one-way-input
          email.value
          id="email-input"
          update=updateEmail
          type='email'
        }}
        {{#if email.errors}}
          <span data-test-email-input-errors>
            {{email.errors}}
          </span>
        {{/if}}
      </div>

      <div class="input container" data-test-title-input-container>
        <label for="title-input" data-test-title-input-label>Title</label>
        {{one-way-input
          title.value
          id="title-input"
          update=updateTitle
          type='title'
        }}
        {{#if title.errors}}
          <span data-test-title-input-errors>
            {{title.errors}}
          </span>
        {{/if}}
      </div>

    </div>
  `
});
