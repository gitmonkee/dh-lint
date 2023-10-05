/**
 * @fileoverview Config initialization wizard.
 * @author Lemuel Vellez
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const fs = require('fs');
const sourceBabelConfigFile = './node_modules/@doghouse/dh-lint/config/babel/babel.config.js';
const destinationBabelConfigFile = './babel.config.js';

//------------------------------------------------------------------------------
// Initialization and Public Interface
//------------------------------------------------------------------------------
module.exports = function generateConfigFile(framework){

  // Read the content of the source file
  fs.readFile(sourceBabelConfigFile, (err, data) => {
    if (err) {
      console.error('Error reading the source babel.config.js file:', err);
      return;
    }

    // Write the content to the destination file
    fs.writeFile(destinationBabelConfigFile, data, (err) => {
      if (err) {
        console.error('Error writing babel.config.js to the destination file:', err);
        return;
      }

      console.log("The babel.config.js file was saved!");
    });
  });
}

