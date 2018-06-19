const inquirer = require('inquirer');
const fs = require('fs');

module.exports = {
  askHosting: async (redeploy) => {
    let CHOICES;
    if (!redeploy) CHOICES = ['AWS', 'Firebase', 'Local'];
    else CHOICES = ['AWS', 'Firebase'];
    const QUESTIONS = [
      {
        name: 'hosting',
        type: 'list',
        message: 'How would you like to host your new or existing project?',
        choices: CHOICES,
      },
    ];
    return inquirer.prompt(QUESTIONS);
  },
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
    return inquirer.prompt(QUESTIONS);
  },
  askTemplateWithoutFB: async () => {
    // Grab templates and filter out hidden files
    const CHOICES = fs.readdirSync(`${__dirname}/templates`).filter(file => file[0] !== '.');
    const QUESTIONS = [
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
    return inquirer.prompt(QUESTIONS);
  },
  redeployAWS: async () => {
    // Grab templates and filter out hidden files
    const CHOICES = fs.readdirSync(process.cwd()).filter((file) => {
      if (file[0] === '.') return false;
      const stats = fs.statSync(file);
      return stats.isDirectory();
    });
    const QUESTIONS = [
      {
        name: 'project-choice',
        type: 'list',
        message: 'What project would you like to redeploy?',
        choices: CHOICES,
      },
    ];
    return inquirer.prompt(QUESTIONS);
  },
  redeployFB: async () => {
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
    return inquirer.prompt(QUESTIONS);
  },
};
