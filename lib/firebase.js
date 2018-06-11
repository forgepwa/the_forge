const client = require('firebase-tools');
const { exec } = require('child_process');
const cmd = require('node-cmd');
const conf = require('configstore');
const CLI = require('clui');

const { Spinner } = CLI;

module.exports = {
  getStoredFBToken: () => conf.get('firebase.token'),
  setFBToken() {
    console.log('Launching Firebase authentication in the browser...');
    cmd.get('firebase login:ci --interactive', (err, data, stderr) => {
      if (!err) {
        const token = data.slice(data.indexOf('server:') + 8, data.indexOf('Example')).trim();
        console.log('Your token:', token);
        conf.set('firebase.token', token);
        return token;
      }
      console.log('Error:', err);
      return undefined;
    });
  },
  installFB() { // TODO: check if FB installed first
    const status = new Spinner('Installing/Updating Firebase...');
    status.start();
    exec('npm install -g firebase-tools', (err, stdout, stderr) => {
      if (stderr) {
        console.error(`exec error: ${stderr}`);
        return;
      }
      status.stop();
      console.log('Installed Firebase');
      this.FBLogin();
    });
  },
  async FBLogin(projectName) {
    // Run getStoredFBToken to check for token
    let token = this.getStoredFBToken();
    // setFBToken based on token check
    if (!token) token = await this.setFBToken();
    // assign process env FIREBASE_TOKEN to token
    process.env.FIREBASE_TOKEN = token;
    this.deploy(projectName);
  },
  deploy(projectDirName) {
    client.deploy({
      project: projectDirName,
      token: process.env.FIREBASE_TOKEN,
      cwd: process.cwd()
    }).then(function() {
      console.log(`${projectDirName} has been deployed!`)
    }).catch(function(err) {
      // handle error
      console.log(`Unable to deploy. 😔 Error: ${err}`);
    });
  },
};
