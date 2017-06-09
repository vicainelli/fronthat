/* eslint-env node */
'use strict';
var path = require('path');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'medium-editor',

  isDevelopingAddon: function() {
    return true;
  },

  included() {
    this._super.included.apply(this, arguments);
    if (!process.env.EMBER_CLI_FASTBOOT) {
      this.import('vendor/medium-editor/dist/js/medium-editor.js');
      this.import('vendor/medium-editor/dist/css/medium-editor.css');
      this.import('vendor/medium-editor/dist/css/themes/beagle.css');
    }
  },

  treeForVendor(vendorTree) {
    var mediumEditorTree = new Funnel(path.join(this.project.root, 'node_modules', 'medium-editor'), {
      destDir: 'medium-editor',
      files: ['dist/js/medium-editor.js', 'dist/css/medium-editor.css', 'dist/css/themes/beagle.css'],
    });
    if (vendorTree) {
      return new MergeTrees([vendorTree, mediumEditorTree]);
    }
    return mediumEditorTree;
  },
};
