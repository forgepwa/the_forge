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

  async setAWSKeys(resolve) {
    console.log("setting the user keys to the process.env");
    let answers = await inquirer.askKeysAWS();
    // console.log("here are the answers", answers);
    let access_key = answers['ACCESS_KEY_ID'];
    let secret_key = answers['SECRET_ACCESS_KEY'];
    process.env.ACCESS_KEY_ID = access_key;
    process.env.SECRET_ACCESS_KEY = secret_key;

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
