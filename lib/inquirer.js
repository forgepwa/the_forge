const inquirer = require('inquirer');
const fs = require('fs');
const chalk = require('chalk');
const commands = require('./commands');
const firebase = require('./firebase');

module.exports = {
  askTemplate: async () => {
    // Grab templates and filter out hidden files
    const CHOICES = fs.readdirSync(`${__dirname}/templates`).filter(file => file[0] !== '.');
    const QUESTIONS = [
      {
        name: 'firebase-name',
        type: 'input',
        message: 'What is the name of your firebase project (this must match the name on your firebase console)?',
      },
      {
        name: 'project-choice',
        type: 'list',
        message: 'What project template would you like to generate?',
        choices: CHOICES,
      },
      {
        name: 'project-name',
        type: 'input',
        message: 'Name your project:',
        validate(input) {
          if (/^([A-Za-z\-_\d])+$/.test(input)) return true;
          return 'Project name may only include letters, numbers, underscores and hashes.';
        },
      },
    ];
    
    return inquirer.prompt(QUESTIONS)
  },
  redeploy: async () => {
    // Grab templates and filter out hidden files
    const CHOICES = fs.readdirSync(process.cwd()).filter((file) => {
      if (file[0] === '.') return false;
      const stats = fs.statSync(file);
      return stats.isDirectory();
    });
    const QUESTIONS = [
      {
        name: 'firebase-name',
        type: 'input',
        message: 'What is the name of your firebase project?',
      },
      {
        name: 'project-choice',
        type: 'list',
        message: 'What project would you like to redeploy?',
        choices: CHOICES,
      },
    ];
    return inquirer.prompt(QUESTIONS)
  },
};
