import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

export default Ember.Component.extend({
  classNames: ['first-eye-contact-area-container'],

  layout: hbs`
    <div class="first-eye-contact-area">
      Remote frontend development and design jobs
    </div>
    <div class="second-focus-point">
      <form action="https://www.getdrip.com/forms/64302472/submissions" method="post">
        <div class="subscribe-container">
          <input class="email-input" type="email" placeholder="Email" name="fields[email]" value="" />
          <input class="nav-button nav-button-dark subscribe-button" type="submit" name="submit" value="Subscribe to Updates" />
        </div>
      </form>
    </div>
    <div class="post-a-job">
      {{#link-to 'post-a-job'
        data-test-post-a-job-button
        class="nav-button ripple"
      }}
        Post a Job
      {{/link-to}}
    </div>
  `
});
