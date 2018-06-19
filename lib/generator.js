const fs = require('fs');
const chalk = require('chalk');
const commands = require('./commands');


module.exports = {
  generateTemplate: (answers) => {
    const CURR_DIR = process.cwd();

    function createDirectoryContents(templatePath, newProjectPath) {
      const filesToCreate = fs.readdirSync(templatePath);
      filesToCreate.forEach((file) => {
        const origFilePath = `${templatePath}/${file}`;
        // get stats about the current file
        const stats = fs.statSync(origFilePath);
        // Read/write files without encoding for images
        if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
          const image = fs.readFileSync(origFilePath);
          const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
          fs.writeFileSync(writePath, image);
        } else if (stats.isFile()) {
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
    const projectChoice = answers['project-choice'];
    const projectName = answers['project-name'];
    const templatePath = `${__dirname}/templates/${projectChoice}`;
    fs.mkdirSync(`${CURR_DIR}/${projectName}`);
    createDirectoryContents(templatePath, projectName);
    console.log(chalk.blue(`Finished building ${projectName}`));
    commands.changeDir(projectName);
  }
}