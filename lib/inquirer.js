const inquirer = require('inquirer');
const fs = require('fs');
const chalk = require('chalk');
const commands = require('./commands');

module.exports = {
  generateTemplate: async () => {
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
        message: 'Project name:',
        validate(input) {
          if (/^([A-Za-z\-_\d])+$/.test(input)) return true;
          return 'Project name may only include letters, numbers, underscores and hashes.';
        },
      },
    ];
    const CURR_DIR = process.cwd();

    function createDirectoryContents(templatePath, newProjectPath) {
      const filesToCreate = fs.readdirSync(templatePath);
      filesToCreate.forEach((file) => {
        const origFilePath = `${templatePath}/${file}`;
        // get stats about the current file
        const stats = fs.statSync(origFilePath);
        if (stats.isFile()) {
          const contents = fs.readFileSync(origFilePath, 'utf8');
          const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
          fs.writeFileSync(writePath, contents, 'utf8');
        } else if (stats.isDirectory()) {
          fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
          // recursive call
          createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
        }
      });
    }
    inquirer.prompt(QUESTIONS)
      .then((answers) => {
        const projectChoice = answers['project-choice'];
        const projectName = answers['project-name'];
        const templatePath = `${__dirname}/templates/${projectChoice}`;
        fs.mkdirSync(`${CURR_DIR}/${projectName}`);
        createDirectoryContents(templatePath, projectName);
        console.log(chalk.blue(`Finished building ${projectName}`));
        commands.changeDir(projectName);
        commands.installFB();
      });
  },
};
