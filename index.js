#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const commandLineArgs = require('command-line-args');
const inquirer = require('./lib/inquirer');
const firebase = require('./lib/firebase');
const generator = require('./lib/generator');
const commands = require('./lib/commands');

const optionDefinitions = [
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'redeploy', alias: 'r', type: Boolean },
];
const options = commandLineArgs(optionDefinitions);

// Help flag entered, print help text
if (options.help) {
  clear();
  console.log(chalk.red(figlet.textSync('the Forge', { horizontalLayout: 'full' })));
  console.log('Welcome to the Forge! This is the help prompt. 🔥 🔥 🔥\n');
}
// Redeploy flag entered, initiate redeployment
else if (options.redeploy) {
  clear();
  console.log(chalk.red(figlet.textSync('the Forge', { horizontalLayout: 'full' })));
  console.log('Welcome to the Forge! Launching redeployment prompt. 🔥 🔥 🔥\n');
  const run = async () => {
    firebase.FBLogin();
    console.log('⚠️ Visit https://console.firebase.google.com to create a firebase project (essential to successful deployment).\n');
    const answers = await inquirer.redeploy();
    const firebaseName = answers['firebase-name'];
    const projectChoice = answers['project-choice'];
    console.log(chalk.blue(`Redeploying ${projectChoice}`));
    commands.changeDir(projectChoice);
    firebase.useAdd(projectChoice, firebaseName);
  };
  run();
}
// No options, go to standard prompt
else {
  clear();
  console.log(chalk.red(figlet.textSync('the Forge', { horizontalLayout: 'full' })));
  console.log('Welcome to the Forge! Launching code generator and deployment prompt. 🔥 🔥 🔥\n');
  const run = async () => {
    firebase.FBLogin();
    console.log('⚠️ Visit https://console.firebase.google.com to create a firebase project (essential to successful deployment).\n');
    const answers = await inquirer.askTemplate();
    generator.generateTemplate(answers);
    firebase.useAdd(answers['project-name'], answers['firebase-name']);
  };
  run();
}
