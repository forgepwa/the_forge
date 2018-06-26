#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
const inquirer = require('./lib/inquirer');
const firebase = require('./lib/firebase');
const aws = require('./lib/aws');
const generator = require('./lib/generator');
const commands = require('./lib/commands');

// Defines command line option flags
const optionDefinitions = [
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'init', alias: 'i', type: Boolean },
  { name: 'redeploy', alias: 'r', type: Boolean },
  { name: 'logout', alias: 'o', type: Boolean },
];
const options = commandLineArgs(optionDefinitions);

// Print welcome banner and welcome string
const welcomeLogo = (welcomeString) => {
  clear();
  console.log(chalk.red(figlet.textSync('\nthe Forge', { font: 'ANSI Shadow', horizontalLayout: 'full' })));
  console.log(`Welcome to the Forge! ${welcomeString} 🔥 🔥 🔥\n`);
};

if (options.help) { // Help flag entered, print help text
  welcomeLogo('This is the help prompt.');
  const sections = [
    {
      header: 'the Forge',
      raw: true,
      content: 'Run with {bold forge} to generate and host a Progressive Web App\n\nOr add one of the option flags below.',
    },
    {
      header: 'Options',
      optionList: [
        {
          name: 'help',
          alias: 'h',
          description: 'Print this usage guide.\n',
        },
        {
          name: 'init',
          alias: 'i',
          description: `Launches the Forge's command line tool to deploy an existing project to AWS. ${chalk.yellow('NOTE')}: Project must have npm start script & user must have an AWS account.\n`,
        },
        {
          name: 'redeploy',
          alias: 'r',
          description: 'Launches the Forge\'s command line tool to redeploy an existing project.\n',
        },
        {
          name: 'logout',
          alias: 'o',
          description: 'Logs out of Firebase and AWS on this computer and clears any cached authentication tokens.\n',
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
      header: 'Templates',
      content: [
        'Here is a summary of the available templates you can generate with the Forge:',
        '',
        '  • {bold beginners-guide}: A very simple PWA that contains a basic webpage with HTML and CSS. Generate this template to read a handy guide through what PWA\'s are and how to navigate the codebase.\n',
        '  • {bold starter-pwa}: A more functional PWA that lets you store a message and cache it with service workers. Try going offline and refreshing this PWA to see service workers in action.\n',
        '  • {bold react-pwa}: A barebones React enabled PWA. This is for developers looking for a quick launching point on a React PWA. Contains a ready-to-go webpack for easy building and redeployment.\n',
      ],
    },
    {
      content: 'Project home 🏡 : {underline https://forgepwa.com}\n\n Project repository: {underline https://github.com/forgepwa/the_forge}\n',
    },
  ];
  const usage = commandLineUsage(sections);
  console.log(usage);
} else if (options.logout) { // Logout flag entered, initiate logout process
  try {
    aws.AWSLogout();
    firebase.FBLogout();
  } catch (err) {
    console.log(err);
  }
} else if (options.redeploy) { // Redeploy flag entered, initiate redeployment
  welcomeLogo('Launching redeployment prompt.');
  const run = async () => {
    const host = await inquirer.askHosting(true);
    if (host.hosting === 'Firebase') {
      await firebase.FBLogin();
      console.log('Visit https://console.firebase.google.com to view your Firebase projects.\n');
      const { firebaseName, projectChoice } = await inquirer.redeployFB();
      console.log(chalk.blue(`Redeploying ${projectChoice}`));
      commands.changeDir(projectChoice);
      firebase.deploy(firebaseName, projectChoice);
      console.log('*** Please refresh your loaded page to see your updates ***');
    } else { // AWS redeploy
      await aws.AWSLogin();
      const { projectChoice } = await inquirer.askFolder('What project would you like to redeploy?');
      console.log(chalk.blue(`Redeploying ${projectChoice}`));
      commands.changeDir(projectChoice);
      aws.deploy();
    }
  };
  try {
    run();
  } catch (err) {
    console.log(err);
  }
} else if (options.init) { // Init flag entered, Deploy an existing project
  welcomeLogo('Launching AWS deployment prompt.');
  console.log('For successful deployment to AWS, please make sure your project has a npm start script set up.\n');
  const run = async () => {
    const { projectChoice } = await inquirer.askFolder('What existing project would you like to deploy to AWS?');
    await aws.AWSLogin();
    await generator.generateInits(projectChoice);
    aws.createCLI(projectChoice);
  };
  try {
    run();
  } catch (err) {
    console.log(err);
  }
} else { // No options, go to standard prompt
  welcomeLogo('Launching code generator and deployment prompt.');
  const run = async () => {
    const host = await inquirer.askHosting(false);
    if (host.hosting === 'Firebase') {
      await firebase.FBLogin();
      console.log('⚠️  Visit https://console.firebase.google.com to create a firebase project (essential to successful deployment).\n');
      const { firebaseName, projectName, projectChoice } = await inquirer.askTemplateFB();
      generator.generateTemplate(projectName, projectChoice, host.hosting);
      firebase.deploy(firebaseName, projectName);
    } else if (host.hosting === 'AWS') {
      await aws.AWSLogin();
      const { projectName, projectChoice } = await inquirer.askTemplate();
      generator.generateTemplate(projectName, projectChoice, host.hosting);
      await aws.createCLI(projectName);
    } else { // Local deployment
      const { projectName, projectChoice } = await inquirer.askTemplate();
      generator.generateTemplate(projectName, projectChoice, host.hosting);
      console.log('Generated template for local hosting! 🔥');
      console.log('To run on a localhost, navigate to the project we created for you in the terminal and run:\n');
      console.log(chalk.green('npm install\n'));
      console.log('Then:\n');
      console.log(chalk.green('npm start\n'));
      console.log('After your server starts up, you can go to http://localhost:8081 to see your PWA!\n');
      console.log('If you\'d like to host the project we forged for you on an AWS account, run forge -i\n');
    }
  };
  try {
    run();
  } catch (err) {
    console.log(err);
  }
}
