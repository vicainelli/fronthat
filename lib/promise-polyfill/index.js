/* eslint-env node */
'use strict';
const path = require('path');
const mergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');

module.exports = {
  name: 'promise-polyfill',

  isDevelopingAddon: function() {
    return true;
  },

  included: function(app, parentAddon) {
    this._super.included.apply(this, arguments);
    const ENV = app.env;
    if (ENV === 'development' || ENV === 'test') {
      app.import('vendor/es6-promise/es6-promise.auto.js');
    }
  },

  treeForVendor: function(tree) {
    const packagePath = path.dirname(require.resolve('es6-promise'));
    const packageTree = new Funnel(this.treeGenerator(packagePath), {
      srcDir: '/',
      destDir: 'es6-promise'
    });
    if (tree) {
      return mergeTrees([tree, faTree]);
    }
    return packageTree;
  },

};
