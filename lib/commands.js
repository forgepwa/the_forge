const { exec } = require('child_process');
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
    exec('firebase login:ci', (err, stdout, stderr) => {
      if (stderr) {
        console.error(`exec error: ${stderr}`);
        return;
      }
      console.log('Login done');
    });
  },
};
