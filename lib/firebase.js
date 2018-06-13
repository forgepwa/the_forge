const client = require('firebase-tools');
const cmd = require('node-cmd');
const pkg = require('../package.json');
const Configstore = require('configstore');
const CLI = require('clui');
const opn = require('opn');

const { Spinner } = CLI;
const conf = new Configstore(pkg.name);

module.exports = {
  getStoredFBToken: () => conf.get('firebase.token'),

  async setFBToken(resolve) {
    console.log('Launching Firebase authentication in the browser...');
    await cmd.get('firebase login:ci --interactive', (err, data) => {
      if (!err) {
        const token = data.slice(data.indexOf('server:') + 8, data.indexOf('Example')).trim();
        console.log('Successfully logged in. 🗝');
        conf.set('firebase.token', token);
        resolve(token);
      } else console.log('Error:', err);
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
  },

  useAdd(projectDirName, firebaseName) {
    const status = new Spinner('Smithing files ⚔️ ...');
    status.start();
    cmd.get(`yes | firebase use --add --interactive -P ${firebaseName}`, (err) => {
      if (!err) {
        status.stop();
        this.deploy(projectDirName, firebaseName);
      } else console.log('Error:', err);
    });
  },

  deploy(projectDirName, firebaseName) {
    // const status = new Spinner('Deploying project to Firebase...');
    // status.start();
    console.log('Forging 🔨, please wait...');
    client.deploy({
      project: firebaseName,
      token: process.env.FIREBASE_TOKEN,
      cwd: process.cwd(),
    }).then(() => {
      // status.stop();
      console.log(`${projectDirName} has been deployed at: https://${firebaseName}.firebaseapp.com 😊`);
      opn(`https://${firebaseName}.firebaseapp.com`);
      process.exit();
    }).catch((err) => {
      // handle error
      console.log(`Unable to deploy 😔. Error: ${err}`);
    });
  },
};
