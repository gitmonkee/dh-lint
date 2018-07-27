/**
 * @fileoverview Config initialization wizard.
 * @author Carl Bradshaw
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const fs = require('fs');
const eslintrcFileName = './.eslintrc.yml';
const YAML = require('json2yaml');

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function generateConfigObject(framework) {
  let defaultConfig = {};
  switch (framework) {
    case 'drupal':
      defaultConfig.extends = "./node_modules/dh-lint/config/eslint/drupal.yml";
    break;
    case 'laravel':
      defaultConfig.extends = "./node_modules/dh-lint/config/eslint/laravel.yml";
    break;
    case 'magento':
      defaultConfig.extends = "./node_modules/dh-lint/config/eslint/magento.yml";
    break;
  }
  return defaultConfig;
}

//------------------------------------------------------------------------------
// Initialization and Public Interface
//------------------------------------------------------------------------------

module.exports = function generateConfigFile(framework){
  let defaultConfig = generateConfigObject(framework);
  let configData = YAML.stringify(defaultConfig, null, 2);
  fs.writeFile(eslintrcFileName, configData, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The .eslintrc.yml file was saved!");
  });
}

