const { exec } = require('child_process');
const cmd = require('node-cmd');
const CLI = require('clui');

const { Spinner } = CLI;

module.exports = {
  changeDir(dir) {
    console.log(`Starting directory: ${process.cwd()}`);
    try {
      process.chdir(`${dir}`);
      console.log(`New directory: ${process.cwd()}`);
    } catch (err) {
      console.error(`${err}`);
    }
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
    console.log('Launching Firebase authentication in the browser...');
    cmd.get('firebase login:ci --interactive', (err, data, stderr) => {
      if (!err) {
        console.log('typeof data', typeof data);
        const token = data.slice(data.indexOf('server:') + 8, data.indexOf('Example')).trim();
        console.log('Your token:', token);
      } else console.log('Error:', err);
    });
  },
};
