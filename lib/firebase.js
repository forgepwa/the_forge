const client = require('firebase-tools');
const pkg = require('../package.json');
const Configstore = require('configstore');
const opn = require('opn');

const conf = new Configstore(pkg.name);

module.exports = {
  getStoredFBToken: () => conf.get('firebase.token'),

  async setFBToken() {
    return new Promise((resolve) => {
      console.log('Launching Firebase authentication in the browser...');
      client.login.ci().then((user) => {
        conf.set('firebase.token', user.tokens.refresh_token);
        console.log('Successfully logged in. 🗝');
        resolve(user.tokens.refresh_token);
      }).catch(() => {
        throw new Error('Unable to store token.');
      });
    });
  },

  async FBLogin() {
    try {
      // Run getStoredFBToken to check for token
      let token = this.getStoredFBToken();
      // setFBToken based on token check
      if (!token) token = await this.setFBToken();
      // assign process env FIREBASE_TOKEN to token
      process.env.FIREBASE_TOKEN = token;
      console.log('Authentication passed. 🔐\n');
      return token;
    } catch (err) {
      throw err;
    }
  },

  async FBLogout() {
    const token = this.getStoredFBToken();
    await client.logout({ token }).then(() => {
      conf.set('firebase.token', '');
      console.log('Logged out of Firebase. 👋 👋 👋\n');
      return true;
    }).catch((err) => {
      throw new Error('Unable to logout.\nError:', err);
    });
  },

  deploy(firebaseName, projectDirName) {
    console.log('Forging 🔨, please wait...');
    client.deploy({
      project: firebaseName,
      token: process.env.FIREBASE_TOKEN,
      cwd: process.cwd()
    }).then(() => {
      console.log(`${projectDirName} has been deployed at: https://${firebaseName}.firebaseapp.com 😊`);
      opn(`https://${firebaseName}.firebaseapp.com`);
      process.exit();
    }).catch((err) => {
      console.log(`Unable to deploy 😔. Please make sure that the firebase project name you entered (${firebaseName}) matches your firebase project name at https://console.firebase.google.com --- Error: ${err}`);
    });
  },
};
