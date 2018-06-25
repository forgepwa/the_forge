const cmd = require('node-cmd');
const fs = require('fs');
const os = require('os');
const CLI = require('clui');
const inquirer = require('./inquirer');

const { Spinner } = CLI;
const status = new Spinner('Forging 🔨, please wait...', ['🔥', '🔥', '🔥', '🔥', '💥', '💥', '💥', '💥', '⚡', '⚡', '⚡', '⚡', '🌋', '🌋', '🌋', '🌋']);

module.exports = {
  async AWSLogin() {
    const homedir = os.homedir();
    const configPath = `${homedir}/.aws/config`;
    try {
      // if fs.readFileSync Errors out then it catches
      const config = fs.readFileSync(configPath, 'utf8');
      // if (!config.includes('profile eb-cli')) throw 'No eb profile';
      console.log('Authentication passed. 🔐\n');
      return config;
    } catch (err) {
      console.log('⚠️  Be sure to set up an AWS user in your account\'s IAM Management Console.\n');
      const { ACCESS_KEY_ID, SECRET_ACCESS_KEY } = await inquirer.askKeysAWS();
      // NOTE: Potential problem if user has multiple profiles
      const contents = `[profile eb-cli]\naws_access_key_id = ${ACCESS_KEY_ID}\naws_secret_access_key = ${SECRET_ACCESS_KEY}\n`;
      fs.writeFileSync(configPath, contents, 'utf8');
      console.log('Authentication credentials set. 🔐\n');
    }
  },

  AWSLogout() {
    const homedir = os.homedir();
    const configPath = `${homedir}/.aws/config`;
    try {
      fs.unlinkSync(configPath);
      console.log('\nLogged out of AWS. ✌️ ✌️ ✌️\n');
      return true;
    } catch (err) {
      console.log('\nNo AWS Login credentials found.\n');
      return false;
    }
  },

  async createCLI(projectName) {
    status.message('Creating Elastic Beanstalk application and environment. This may take a few minutes to complete...');
    status.start();
    try {
      cmd.get(`eb create ${projectName}`, (err) => {
        if (!err) {
          status.stop();
          console.log('Deployed your project! Opening in your browser...');
          cmd.get('eb open');
        } else {
          status.stop();
          console.log('Error:', err);
          throw new Error('Failed to create EB application and environment');
        }
      });
    } catch (err) {
      throw err;
    }
  },

  deploy() {
    status.message('Redeploying your project to AWS. This may take a few minutes to complete...');
    status.start();
    try {
      cmd.get('eb deploy', (err) => {
        if (!err) {
          status.stop();
          console.log('Redeployed your project! Opening in your browser...');
          cmd.get('eb open');
        } else {
          status.stop();
          console.log('Error:', err);
          throw new Error('Failed to redeploy project.');
        }
      });
    } catch (err) {
      status.stop();
      throw err;
    }
  },
};