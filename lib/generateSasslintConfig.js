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
  let defaultConfig = {options: {}};
  switch (framework) {
    case 'drupal':
      defaultConfig.options['config-file'] = "./node_modules/dh-lint/config/sasslint/drupal.yml";
    break;
    case 'laravel':
      defaultConfig.options['config-file'] = "./node_modules/dh-lint/config/sasslint/laravel.yml";
    break;
    case 'magento':
      defaultConfig.options['config-file'] = "./node_modules/dh-lint/config/sasslint/magento.yml";
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
  fs.writeFile(sasslintFileName, configData, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The .sass-lint.yml file was saved!");
  });
}

