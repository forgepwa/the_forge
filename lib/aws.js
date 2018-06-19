const cmd = require('node-cmd');
const pkg = require('../package.json');
const Configstore = require('configstore');
const CLI = require('clui');
const opn = require('opn');
const AWS = require('aws-sdk');

const { Spinner } = CLI;
const conf = new Configstore(pkg.name);
const elasticbeanstalk = new AWS.ElasticBeanstalk();

module.exports = {
  getStoredAWSToken: () => conf.get('aws.token'),

  async setAWSToken(resolve) {

  },

  async AWSLogin() {

  },

  AWSLogout() {

  },

  create(projectDirName, projectName) {
    const params = {
      ApplicationName: projectName,
      CNAMEPrefix: projectName,
      EnvironmentName: projectName,
      SolutionStackName: '64bit Amazon Linux 2015.03 v2.0.0 running Tomcat 8 Java 8',
      VersionLabel: 'v1',
    };
    elasticbeanstalk.createEnvironment(params, (err, data) => {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });
  },

  deploy(projectDirName) {

  },
};
