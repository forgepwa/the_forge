const util = require('util');
const { exec } = require('child_process');

const execAsync = util.promisify(exec);

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
  installFB() {
    console.log('Installing Firebase...');
    exec('npm install -g firebase-tools', (err, stdout, stderr) => {
      if (stderr) {
        console.error(`exec error: ${stderr}`);
        return;
      }
      console.log('Installed');
    });
  },
};
