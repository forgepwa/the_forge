const client = require('firebase-tools');
const { exec } = require('child_process');
const cmd = require('node-cmd');
const config = require('configstore');
const CLI = require('clui');

const { Spinner } = CLI;

module.exports = {
  getStoredFBToken() {

  },
  setFBToken() {
    console.log('Launching Firebase authentication in the browser...');
    cmd.get('firebase login:ci --interactive', (err, data, stderr) => {
      if (!err) {
        const token = data.slice(data.indexOf('server:') + 8, data.indexOf('Example')).trim();
        console.log('Your token:', token);
      } else console.log('Error:', err);
    });
    config.set('firebase.token', token);
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
  FBLogin() {
    // Run getStoredFBToken to check for token

    // setFBToken based on token check

  },
  deploy() {

  },
};
