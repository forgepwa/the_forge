const client = require('firebase-tools');
const cmd = require('node-cmd');
const pkg = require('../package.json');
const Configstore = require('configstore');
const CLI = require('clui');
const opn = require('opn');
const sdk = require('aws-sdk');
const inquirer = require('./inquirer');

const { Spinner } = CLI;
const conf = new Configstore(pkg.name);

module.exports = {
  // getStoredAWSToken: () => conf.get('aws.token'),

  async setAWSKeys() {
    const answers = await inquirer.askKeysAWS();
    process.env.ACCESS_KEY_ID = answers.ACCESS_KEY_ID;
    process.env.SECRET_ACCESS_KEY = answers.SECRET_ACCESS_KEY;
  },

  // async AWSLogin() {
    
  // },

  AWSLogout() {
    
  },

  create(projectDirName, firebaseName) {
    
  },

  deploy(projectDirName) {

  },
};
