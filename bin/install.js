#!/usr/bin/env node

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const inquirer = require("inquirer");
const fs = require('fs');
const path = require('path');
const generateEslintRc = require("../lib/generateEslintConfig");
const generateSasslintRc = require("../lib/generateSasslintConfig");
const generateBabelConfigRc = require("../lib/generateBabelConfig");
const updatePackageJsonScripts = require("../lib/updatePackageJsonScripts");
const appRoot = path.resolve('./');

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Determine if a .eslintrc.yml file exists in the project.
 */
function eslintrcFileExists() {
  return fs.existsSync(appRoot + '/.eslintrc.yml');
}

/**
 * Determine if a .sass-lint.yml file exists in the project.
 */
function sasslintFileExists() {
  return fs.existsSync(appRoot + '/.sass-lint.yml');
}

/**
 * Determine if a babel.config.js file exists in the project.
 */
function babelConfigFileExists() {
  return fs.existsSync(appRoot + '/babel.config.js');
}
//------------------------------------------------------------------------------
// Initialization and Public Interface
//------------------------------------------------------------------------------

/**
 * Ask the user questions to setup linting.
 */
inquirer.prompt([
  {
    type: 'list',
    name: 'framework',
    message: 'What framework is this project using?',
    choices: ['Drupal', 'Laravel', 'Magento'],
    filter: function(val) {
      return val.toLowerCase();
    }
  },
  {
    type: "confirm",
    name: "genEslintRc",
    message: "Would you like to generate an .eslintrc.yaml config file?",
    default: true
  },
  {
    type: "confirm",
    name: 'replaceEslintrc',
    default: true,
    message: 'An .eslintrc.yml already exists, would you like to replace it?',
    when: function(answers) {
      return answers.genEslintRc && eslintrcFileExists();
    }
  },
  {
    type: "confirm",
    name: "genSasslint",
    message: "Would you like to generate an sass-lint config file?",
    default: true
  },
  {
    type: "confirm",
    name: 'replaceSasslint',
    default: true,
    message: 'A .sass-lint.yml already exists, would you like to replace it?',
    when: function(answers) {
      return answers.genSasslint && sasslintFileExists();
    }
  },
  {
    type: "confirm",
    name: "genBabelConfig",
    message: "Would you like to generate a babel config file?",
    default: true
  },
  {
    type: "confirm",
    name: 'replaceBabelConfig',
    default: true,
    message: 'A babel.config.js already exists, would you like to replace it?',
    when: function(answers) {
      return answers.genBabelConfig && babelConfigFileExists();
    }
  },
  {
    type: "confirm",
    name: "updateNpmScripts",
    message: "Would you like to update your package.json file with linting scripts?",
    default: true
  }
]).then( ({framework, genEslintRc, replaceEslintrc, genSasslint, replaceSasslint, genBabelConfig, replaceBabelConfig, updateNpmScripts}) => {
  if (typeof replaceEslintrc === 'undefined') {
    replaceEslintrc = true;
  }

  if (typeof replaceSasslint === 'undefined') {
    replaceSasslint = true;
  }

  if (typeof replaceBabelConfig === 'undefined') {
    replaceBabelConfig = true;
  }

  if (genEslintRc && replaceEslintrc) {
    generateEslintRc(framework);
  }

  if (genSasslint && replaceSasslint) {
    generateSasslintRc(framework);
  }

  if (genBabelConfig && replaceBabelConfig) {
    generateBabelConfigRc();
  }

  if (updateNpmScripts) {
    updatePackageJsonScripts(framework);
  }

});
