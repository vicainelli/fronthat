import JSONAPIAdapter from 'ember-data/adapters/json-api';
import FetchSupport from 'ember-data-fetch-support/mixins/fetch-support';
import ENV from 'fronthat/config/environment';

export default JSONAPIAdapter.extend(FetchSupport, {
  host: ENV.apiURL,
});
