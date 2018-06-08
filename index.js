#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('./lib/inquirer');
const commands = require('./lib/commands');

clear();
console.log(chalk.blue(figlet.textSync('PWA Creator', { horizontalLayout: 'full' })));
const run = async () => {
  await inquirer.generateTemplate();
};
run();
