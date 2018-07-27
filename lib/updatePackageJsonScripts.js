/**
 * @fileoverview Config initialization wizard.
 * @author Carl Bradshaw
 */

 "use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const fs = require('fs');

//------------------------------------------------------------------------------
// Settings
//------------------------------------------------------------------------------

let frameworkLintPaths = {
  drupal: 'docroot/themes/custom',
  laravel: 'app/modules',
  magento: ''
};

//------------------------------------------------------------------------------
// Initialization and Public Interface
//------------------------------------------------------------------------------
module.exports = function updateScripts(framework) {

  var dhLintPackage = require('../package.json');
  dhLintPackage.scripts['lint:js'] = dhLintPackage.scripts['lint:js'].replace('%PATH%', frameworkLintPaths[framework])
  dhLintPackage.scripts['lint:js-fix'] = dhLintPackage.scripts['lint:js'].replace('%PATH%', frameworkLintPaths[framework])

  fs.readFile('./package.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    let appPackage = JSON.parse(data);
    Object.assign(appPackage.scripts, dhLintPackage.scripts);

    let newJson = JSON.stringify(appPackage, null, 2);

    fs.writeFile('./package.json', newJson, function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("package.json file was saved!");
    });

  });
}
