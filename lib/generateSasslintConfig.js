/**
 * @fileoverview Config initialization wizard.
 * @author Carl Bradshaw
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const fs = require('fs');
const sasslintFileName = './.sass-lint.yml';
const YAML = require('json2yaml');

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function generateConfigObject(framework) {
  let defaultConfig = {options: {
    "config-file": `./node_modules/@doghouse/dh-lint/config/sasslint/${framework}.yml`
  }};
  return defaultConfig;
}

//------------------------------------------------------------------------------
// Initialization and Public Interface
//------------------------------------------------------------------------------

module.exports = function generateConfigFile(framework){
  let defaultConfig = generateConfigObject(framework);
  let configData = YAML.stringify(defaultConfig, null, 2);
  fs.writeFile(sasslintFileName, configData, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The .sass-lint.yml file was saved!");
  });
}

