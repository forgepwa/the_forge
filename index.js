#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const CLI = require('clui');
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
const inquirer = require('./lib/inquirer');
const firebase = require('./lib/firebase');
const aws = require('./lib/aws');
const generator = require('./lib/generator');
const commands = require('./lib/commands');

const { Spinner } = CLI;
const status = new Spinner('Forging 🔨, please wait...', ['🔥', '🔥', '🔥', '💥', '💥', '💥']);

// Defines commang line option flags
const optionDefinitions = [
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'redeploy', alias: 'r', type: Boolean },
  { name: 'logout', alias: 'o', type: Boolean },
];
const options = commandLineArgs(optionDefinitions);

const welcomeLogo = (welcomeString) => {
  clear();
  console.log(chalk.red(figlet.textSync('\nthe Forge', { font: 'ansi shadow', horizontalLayout: 'full' })));
  console.log(`Welcome to the Forge! ${welcomeString} 🔥 🔥 🔥\n`);
}
// Help flag entered, print help text
if (options.help) {
  welcomeLogo('This is the help prompt.');
  const sections = [
    {
      header: 'the Forge',
      raw: true,
      content: 'Run with {bold forge} to generate and host a Progressive Web App\n\nOr add option flags below.',
    },
    {
      header: 'Options',
      optionList: [
        {
          name: 'logout',
          alias: 'o',
          description: 'Logs out of Firebase on this computer and clears any cached Firebase tokens',
        },
        {
          name: 'help',
          alias: 'h',
          description: 'Print this usage guide.',
        },
        {
          name: 'redeploy',
          alias: 'r',
          description: 'Launches the Forge\'s command line tool to redeploy an existing Firebase project.',
        },
      ],
      tableOptions: {
        columns: [
          {
            name: 'option',
            noWrap: true,
            padding: { left: '🔥  ', right: '' },
            width: 30,
          },
          {
            name: 'description',
            width: 50,
            padding: { left: '', right: '   🔥' },
          },
        ],
      },
    },
    {
      content: 'Project home 🏡 : {underline https://github.com/ProgrammersWitAttitudes/pwa_creator}',
    },
  ];
  const usage = commandLineUsage(sections);
  console.log(usage);
}
// Logout flag entered, initiate logout process
else if (options.logout) {
  firebase.FBLogout();
  aws.AWSLogout();
}
// Redeploy flag entered, initiate redeployment
else if (options.redeploy) {
  welcomeLogo('Launching redeployment prompt.');
  const run = async () => {
    const host = await inquirer.askHosting(true);
    if (host.hosting === 'Firebase') {
      await firebase.FBLogin();
      console.log('Visit https://console.firebase.google.com to view your firebase projects.\n');
      const answers = await inquirer.redeployFB();
      const firebaseName = answers['firebase-name'];
      const projectChoice = answers['project-choice'];
      console.log(chalk.blue(`Redeploying ${projectChoice}`));
      commands.changeDir(projectChoice);
      firebase.deploy(projectChoice, firebaseName);
    } else { // AWS redeploy
      await aws.AWSLogin();
      const answers = await inquirer.redeployAWS();
      const projectChoice = answers['project-choice'];
      console.log(chalk.blue(`Redeploying ${projectChoice}`));
      commands.changeDir(projectChoice);
      aws.deploy();
    }
  };
  run();
}
// No options, go to standard prompt
else {
  welcomeLogo('Launching code generator and deployment prompt.');
  const run = async () => {
    const host = await inquirer.askHosting(false);
    if (host.hosting === 'Firebase') {
      await firebase.FBLogin();
      console.log('⚠️  Visit https://console.firebase.google.com to create a firebase project (essential to successful deployment).\n');
      const answers = await inquirer.askTemplate();
      generator.generateTemplate(answers, host);
      firebase.deploy(answers['project-name'], answers['firebase-name']);
    } else if (host.hosting === 'AWS') {
      console.log('⚠️  Be sure to set up an AWS user in your account\'s IAM Management Console.\n');
      await aws.AWSLogin();
      const answers = await inquirer.askTemplateWithoutFB();
      const projectName = answers['project-name'];
      generator.generateTemplate(answers, host);
      await aws.createCLI(projectName);
    } else { // Local deployment
      const answers = await inquirer.askTemplateWithoutFB();
      generator.generateTemplate(answers, host);
      console.log('Generated template for local hosting!');
      console.log('To run on a localhost, navigate to the project we created for you in the terminal and run:');
      console.log(chalk.blue('npm install'));
      console.log('then run:');
      console.log(chalk.blue('npm start'));
    }
  };
  run();
}
