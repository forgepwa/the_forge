const client = require('firebase-tools');
const pkg = require('../package.json');
const Configstore = require('configstore');
const opn = require('opn');
const CLI = require('clui');

const { Spinner } = CLI;
const status = new Spinner('Forging 🔨, please wait...', ['🔥', '🔥', '🔥', '💥', '💥', '💥']);

const conf = new Configstore(pkg.name);

module.exports = {
  getStoredFBToken: () => conf.get('firebase.token'),

  async setFBToken(resolve) {
    console.log('Launching Firebase authentication in the browser...');
    client.login.ci().then((token) => {
      conf.set('firebase.token', token.tokens.refresh_token);
      console.log('Successfully logged in. 🗝');
      resolve(token.tokens.refresh_token);
    }).catch((err) => {
      console.log('Unable to store token. Error:', err);
    });
  },

  async FBLogin() {
    // Run getStoredFBToken to check for token
    let token = this.getStoredFBToken();
    // setFBToken based on token check
    if (!token) {
      const promise = new Promise((resolve) => {
        this.setFBToken(resolve);
      });
      token = await promise;
    }
    // assign process env FIREBASE_TOKEN to token
    process.env.FIREBASE_TOKEN = token;
    console.log('Authentication passed. 🔐\n');
  },

  FBLogout() {
    const token = this.getStoredFBToken();
    client.logout({ token }).then(() => {
      conf.set('firebase.token', '');
      console.log('Logged out of Firebase. 👋 👋 👋');
    }).catch((err) => {
      console.log('Unable to logout. Error:', err);
    });
  },

  // ⚰ RIP useAdd 😢

  deploy(projectDirName, firebaseName) {
    status.start();
    // console.log('Forging 🔨, please wait...');
    client.deploy({
      project: firebaseName,
      token: process.env.FIREBASE_TOKEN,
      cwd: process.cwd(),
    }).then(() => {
      console.log(`\n${projectDirName} has been deployed at: https://${firebaseName}.firebaseapp.com 😊`);
      opn(`https://${firebaseName}.firebaseapp.com`);
      status.stop();
      process.exit();
    }).catch((err) => {
      status.stop();
      console.log(`Unable to deploy 😔. Please make sure that the firebase project name you entered (${firebaseName}) matches your firebase project name at https://console.firebase.google.com --- Error: ${err}`);
    });
  },
};
