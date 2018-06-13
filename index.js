#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
const inquirer = require('./lib/inquirer');
const firebase = require('./lib/firebase');
const generator = require('./lib/generator');
const commands = require('./lib/commands');

// Defines commang line option flags
const optionDefinitions = [
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'redeploy', alias: 'r', type: Boolean },
  { name: 'local', alias: 'l', type: Boolean },
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
      content: 'Generates Progressive Web App code AND hosts it on Firebase.\n\nRun with {bold forge}',
    },
    {
      header: 'Options',
      optionList: [
        {
          name: 'local',
          alias: 'l',
          description: 'Launches the Forge\'s command line tool to generate a template without hosting it.',
        },
        {
          name: 'redeploy',
          alias: 'r',
          description: 'Launches the Forge\'s command line tool to redeploy an existing Firebase project.',
        },
        {
          name: 'help',
          alias: 'h',
          description: 'Print this usage guide.',
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
// Redeploy flag entered, initiate redeployment
else if (options.redeploy) {
  welcomeLogo('Launching redeployment prompt.');
  const run = async () => {
    firebase.FBLogin();
    console.log('Visit https://console.firebase.google.com to view your firebase projects.\n');
    const answers = await inquirer.redeploy();
    const firebaseName = answers['firebase-name'];
    const projectChoice = answers['project-choice'];
    console.log(chalk.blue(`Redeploying ${projectChoice}`));
    commands.changeDir(projectChoice);
    firebase.useAdd(projectChoice, firebaseName);
  };
  run();
}
// Local flag entered, generate template without deployment
else if (options.local) {
  welcomeLogo('Launching code generator prompt.');
  const run = async () => {
    const answers = await inquirer.askTemplateWithoutDeploy();
    generator.generateTemplate(answers);
  }
  run();
}
// No options, go to standard prompt
else {
  welcomeLogo('Launching code generator and deployment prompt.');
  const run = async () => {
    firebase.FBLogin();
    console.log('⚠️ Visit https://console.firebase.google.com to create a firebase project (essential to successful deployment).\n');
    const answers = await inquirer.askTemplate();
    generator.generateTemplate(answers);
    firebase.useAdd(answers['project-name'], answers['firebase-name']);
  };
  run();
}
