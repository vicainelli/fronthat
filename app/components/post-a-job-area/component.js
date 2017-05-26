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
        }}
        {{#if title.errors}}
          <span data-test-title-input-errors>
            {{title.errors}}
          </span>
        {{/if}}
      </div>

      <div class="input container" data-test-url-input-container>
        <label for="url-input" data-test-url-input-label>URL</label>
        {{one-way-input
          url.value
          id="url-input"
          update=updateURL
        }}
        {{#if url.errors}}
          <span data-test-url-input-errors>
            {{url.errors}}
          </span>
        {{/if}}
      </div>

      <div class="input container" data-test-description-input-container>
        <label for="description-input" data-test-description-input-label>Description</label>
        {{one-way-textarea
          description.value
          id="description-input"
          update=updateDescription
        }}
        {{#if description.errors}}
          <span data-test-description-input-errors>
            {{description.errors}}
          </span>
        {{/if}}
      </div>

      <div class="submit-area">
        {{#if disabled}}
          <input class="nav-button nav-button-dark post-a-job-button" type="submit" name="submit" value="Post a Job" data-test-submit-button-disabled disabled />
        {{else}}
          <input class="nav-button nav-button-dark post-a-job-button disabled" type="submit" name="submit" value="Post a Job" data-test-submit-button />
        {{/if}}
      </div>

    </div>
  `
});
