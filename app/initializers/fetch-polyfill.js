import _fetch from 'ember-network/fetch';

if (!window.fetch) {
  window.fetch = _fetch;
}

export function initialize() {}

export default {
  name: 'fetch-polyfill',
  initialize
};
