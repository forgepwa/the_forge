#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const commandLineArgs = require('command-line-args');
const inquirer = require('./lib/inquirer');

const optionDefinitions = [
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'redeploy', alias: 'r', type: Boolean },
];
const options = commandLineArgs(optionDefinitions);

// Help flag entered, print help text
if (options.help) {
  clear();
  console.log(chalk.blue(figlet.textSync('PWA Creator', { horizontalLayout: 'full' })));
  console.log('Welcome to create-pwa! This is the help prompt. 🔥 🔥 🔥\n');
}
// Redeploy flag entered, initiate redeployment
else if (options.redeploy) {
  clear();
  console.log(chalk.blue(figlet.textSync('PWA Creator', { horizontalLayout: 'full' })));
  console.log('Welcome to create-pwa! Launching redeployment prompt. 🔥 🔥 🔥\n');
  const run = async () => {
    await inquirer.redeploy();
  };
  run();
}
// No options, go to standard prompt
else {
  clear();
  console.log(chalk.blue(figlet.textSync('PWA Creator', { horizontalLayout: 'full' })));
  console.log('Welcome to create-pwa! Launching code generator and deployment prompt. 🔥 🔥 🔥\n');
  const run = async () => {
    await inquirer.generateTemplate();
  };
  run();
}
