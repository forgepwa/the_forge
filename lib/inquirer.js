const inquirer = require('inquirer');
const fs = require('fs');

module.exports = {
  askTemplates: () => {
    const CHOICES = fs.readdirSync(`${__dirname}/templates`);
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
      });
  },
};
