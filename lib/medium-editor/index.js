/* eslint-env node */
'use strict';
var path = require('path');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');
const map = require('broccoli-stew').map;

module.exports = {
  name: 'medium-editor',

  isDevelopingAddon: function() {
    return true;
  },

  included() {
    this._super.included.apply(this, arguments);
    this.import('vendor/medium-editor/dist/js/medium-editor.js');
    this.import('vendor/medium-editor/dist/css/medium-editor.css');
    this.import('vendor/medium-editor/dist/css/themes/beagle.css');
  },

  treeForVendor(vendorTree) {
    var mediumEditorJavascriptTree = new Funnel(path.join(this.project.root, 'node_modules', 'medium-editor'), {
      destDir: 'medium-editor',
      files: ['dist/js/medium-editor.js'],
    });
    mediumEditorJavascriptTree = map(mediumEditorJavascriptTree, (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);
    var mediumEditorTreeCSSTree = new Funnel(path.join(this.project.root, 'node_modules', 'medium-editor'), {
      destDir: 'medium-editor',
      files: ['dist/css/medium-editor.css', 'dist/css/themes/beagle.css'],
    });
    var mediumEditorTree = new MergeTrees([mediumEditorJavascriptTree, mediumEditorTreeCSSTree]);
    if (vendorTree) {
      return new MergeTrees([vendorTree, mediumEditorTree]);
    }
    return mediumEditorTree;
  },
};
