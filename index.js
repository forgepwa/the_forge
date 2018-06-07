#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('./lib/inquirer');

clear();
console.log(chalk.blue(figlet.textSync('PWA Creator', { horizontalLayout: 'full' })));
const run = async () => {
  inquirer.askTemplates();
};
run();
