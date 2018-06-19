const client = require('firebase-tools');
const cmd = require('node-cmd');
const pkg = require('../package.json');
const Configstore = require('configstore');
const CLI = require('clui');
const opn = require('opn');

const { Spinner } = CLI;
const conf = new Configstore(pkg.name);

module.exports = {
  getStoredAWSToken: () => conf.get('aws.token'),

  async setAWSToken(resolve) {
    
  },

  async AWSLogin() {
    
  },

  AWSLogout() {
    
  },

  create(projectDirName, firebaseName) {
    
  },

  deploy(projectDirName) {

  },
};
