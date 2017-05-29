import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

export default Ember.Component.extend({
  layout: hbs`
    <div data-test-post-a-job-area-container class="post-a-job-area">

      <form {{action postAJob on='submit'}}>
        <div class="input container" data-test-title-input-container>
          <div class="label-and-error">
            <label for="title-input" data-test-title-input-label>Title</label>
            {{#if title.errors}}
              <span data-test-title-input-errors>
                {{title.errors}}
              </span>
            {{/if}}
          </div>
          {{one-way-input
            title.value
            id="title-input"
            update=updateTitle
            placeholder="Job Title"
          }}
        </div>

        <div class="input container" data-test-url-input-container>
          <div class="label-and-error">
            <label for="url-input" data-test-url-input-label>URL</label>
            {{#if url.errors}}
              <span data-test-url-input-errors>
                {{url.errors}}
              </span>
            {{/if}}
          </div>
          {{one-way-input
            url.value
            id="url-input"
            update=updateURL
            placeholder="URL to apply: https://yourcompany.com/careers/apply"
          }}
        </div>

        <div class="input container" data-test-description-input-container>
          <div class="label-and-error">
            <label for="description-input" data-test-description-input-label>Description</label>
            {{#if description.errors}}
              <span data-test-description-input-errors>
                {{description.errors}}
              </span>
            {{/if}}
          </div>
          {{one-way-textarea
            description.value
            id="description-input"
            update=updateDescription
          }}
        </div>

        <div class="input container" data-test-name-input-container>
          <div class="label-and-error">
            <label for="name-input" data-test-name-input-label>Name</label>
            {{#if name.errors}}
              <span data-test-name-input-errors>
                {{name.errors}}
              </span>
            {{/if}}
          </div>
          {{one-way-input
            name.value
            id="name-input"
            update=updateName
            placeholder="Personal or company name"
          }}
        </div>

        <div class="input container" data-test-email-input-container>
          <div class="label-and-error">
            <label for="email-input" data-test-email-input-label>Email</label>
            {{#if email.errors}}
              <span data-test-email-input-errors>
                {{email.errors}}
              </span>
            {{/if}}
          </div>
          {{one-way-input
            email.value
            id="email-input"
            update=updateEmail
            type='email'
            placeholder="Email for receipt and confirmation email"
          }}
        </div>

        {{#if errors}}
          <div class="general-errors-area" data-test-general-errors-area>
            {{#each errors as |error|}}
              <div class="general-error" data-test-general-error>
                {{error}}
              </div>
            {{/each}}
          </div>
        {{/if}}

        <div class="submit-area">
          {{#if disabled}}
            <input class="nav-button nav-button-dark post-a-job-button disabled" type="submit" name="submit" value="Post a Job" data-test-submit-button-disabled disabled />
          {{else if loading}}
            <input class="nav-button nav-button-dark post-a-job-button loading" type="submit" name="submit" value="Posting..." data-test-submit-button-loading disabled />
          {{else}}
            <input class="nav-button nav-button-dark post-a-job-button" type="submit" name="submit" value="Post a Job" data-test-submit-button />
          {{/if}}
        </div>
      </form>

    </div>
  `
});
