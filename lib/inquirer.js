const inquirer = require('inquirer');
const fs = require('fs');

module.exports = {
  askHosting: (redeploy) => {
    let CHOICES;
    if (!redeploy) CHOICES = ['AWS', 'Firebase', 'Local'];
    else CHOICES = ['AWS', 'Firebase'];
    const QUESTIONS = [
      {
        name: 'hosting',
        type: 'list',
        message: 'How would you like to host your project?',
        choices: CHOICES,
      },
    ];
    return inquirer.prompt(QUESTIONS);
  },
  askTemplateFB: () => {
    // Grab templates and filter out hidden files
    const CHOICES = fs.readdirSync(`${__dirname}/templates`).filter(file => file[0] !== '.');
    const QUESTIONS = [
      {
        name: 'firebaseName',
        type: 'input',
        message: 'What is the name of your Firebase project? (this must match the name on your firebase console)',
        validate(input) {
          if (/^([A-Za-z\-_\d])+$/.test(input)) return true;
          return 'Firebase project name may only include letters, numbers, underscores and hashes.';
        },
      },
      {
        name: 'projectChoice',
        type: 'list',
        message: 'What project template would you like to generate?',
        choices: CHOICES,
      },
      {
        name: 'projectName',
        type: 'input',
        message: 'Name your project:',
        validate(input) {
          if (fs.readdirSync(process.cwd()).indexOf(input) !== -1) return 'Project name must be unique.';
          if (/^([A-Za-z\-_\d])+$/.test(input)) return true;
          return 'Project name may only include letters, numbers, underscores and hashes.';
        },
      },
    ];
    return inquirer.prompt(QUESTIONS);
  },
  askTemplate: async () => {
    // Grab templates and filter out hidden files
    const CHOICES = fs.readdirSync(`${__dirname}/templates`).filter(file => file[0] !== '.');
    const QUESTIONS = [
      {
        name: 'projectChoice',
        type: 'list',
        message: 'What project template would you like to generate?',
        choices: CHOICES,
      },
      {
        name: 'projectName',
        type: 'input',
        message: 'Name your project:',
        validate(input) {
          if (fs.readdirSync(process.cwd()).indexOf(input) !== -1) return 'Project name must be unique.';
          if (/^([A-Za-z\-_\d])+$/.test(input) && input.length >= 4) return true;
          return 'Project name must be over 3 characters long and may only include letters, numbers, underscores and hashes.';
        },
      },
    ];
    return inquirer.prompt(QUESTIONS);
  },
  askFolder: (message) => {
    // Grab templates and filter out hidden files, grab directories only
    const CHOICES = fs.readdirSync(process.cwd()).filter((file) => {
      if (file[0] === '.') return false;
      const stats = fs.statSync(file);
      return stats.isDirectory();
    });
    const QUESTIONS = [
      {
        name: 'projectChoice',
        type: 'list',
        message,
        choices: CHOICES,
      },
    ];
    return inquirer.prompt(QUESTIONS);
  },
  redeployFB: () => {
    // Grab templates and filter out hidden files, grab directories only
    const CHOICES = fs.readdirSync(process.cwd()).filter((file) => {
      if (file[0] === '.') return false;
      const stats = fs.statSync(file);
      return stats.isDirectory();
    });
    const QUESTIONS = [
      {
        name: 'firebaseName',
        type: 'input',
        message: 'What is the name of your firebase project? (this must match the name on your firebase console)',
        validate(input) {
          if (/^([A-Za-z\-_\d])+$/.test(input)) return true;
          return 'Firebase project name may only include letters, numbers, underscores and hashes.';
        },
      },
      {
        name: 'projectChoice',
        type: 'list',
        message: 'What project would you like to redeploy?',
        choices: CHOICES,
      },
    ];
    return inquirer.prompt(QUESTIONS);
  },
  askKeysAWS: () => {
    const QUESTIONS = [
      {
        name: 'ACCESS_KEY_ID',
        type: 'input',
        message: 'Please enter your AWS ACCESS_KEY_ID:',
        validate(input) {
          if (/^([A-Za-z\-_\d])+$/.test(input)) return true;
          return 'Access key may only include letters, numbers, underscores and hashes.';
        },
      },
      {
        name: 'SECRET_ACCESS_KEY',
        type: 'input',
        message: 'Please enter your AWS SECRET_ACCESS_KEY:',
      },
    ];
    return inquirer.prompt(QUESTIONS);
  },
};
