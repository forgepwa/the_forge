const cmd = require('node-cmd');
const fs = require('fs');
const os = require('os');
const CLI = require('clui');
// const AWS = require('aws-sdk');
const inquirer = require('./inquirer');

const { Spinner } = CLI;
// AWS.config.update({ region: 'us-west-2' });
// const elasticbeanstalk = new AWS.ElasticBeanstalk();

module.exports = {
  async AWSLogin() {
    const homedir = os.homedir();
    const configPath = `${homedir}/.aws/config`;
    try {
      const config = fs.readFileSync(configPath, 'utf8');
      // if (!config.includes('profile eb-cli')) throw 'No eb profile';
      console.log('Found authentication credentials.\n', config);
    } catch (err) {
      const answers = await inquirer.askKeysAWS();
      // NOTE: Potential problem if user has multiple profiles
      const contents = `[profile eb-cli]\naws_access_key_id = ${answers.ACCESS_KEY_ID}\naws_secret_access_key = ${answers.SECRET_ACCESS_KEY}\n`;
      fs.writeFileSync(configPath, contents, 'utf8');
    }
  },

  AWSLogout() {
    const homedir = os.homedir();
    const configPath = `${homedir}/.aws/config`;
    fs.unlink(configPath, (err) => {
      if (err) console.log('Error:', err);
      else console.log('Logged out of AWS');
    });
  },
  
  async createCLI(projectName) {
    const status = new Spinner('Creating Elastic Beanstalk application and evironment. This may take a few minutes to complete...');
    status.start();
    try {
      cmd.get(`eb create ${projectName}`, (err, data) => {
        if (!err) {
          console.log('Created your project!');
          console.log(data);
          cmd.get('eb open');
        } else {
          console.log('Error:', err);
          throw new Error('Failed to create EB application and environment');
        }
      });
    } catch (err) {
      throw err;
    } finally {
      status.stop();
    }
  },

  // createApplication(projectName) {
  //   const params = {
  //     ApplicationName: projectName,
  //     Description: 'progressive web app',
  //   };
  //   elasticbeanstalk.createApplication(params, (err, data) => {
  //     if (err) console.log(err, err.stack);
  //     else console.log(data);
  //   });
  // },

  // createEnvironment(projectName) {
  //   const params = {
  //     ApplicationName: projectName,
  //     EnvironmentName: projectName,
  //     SolutionStackName: '64bit Amazon Linux 2018.03 v4.5.0 running Node.js',
  //   };
  //   elasticbeanstalk.createEnvironment(params, (err, data) => {
  //     if (err) console.log(err, err.stack);
  //     else console.log(data);
  //   });
  // },

  deploy(projectName) {

  },
};
