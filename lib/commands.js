const util = require('util');
const { exec, execSync } = require('child_process');

const execAsync = util.promisify(exec);

module.exports = {
  changeDir(dir) {
    console.log(`Starting directory: ${process.cwd()}`);
    try {
      process.chdir(`/${dir}`);
      console.log(`New directory: ${process.cwd()}`);
    } catch (err) {
      console.error(`chdir: ${err}`);
    }
    // execSync(`cd ${dir}`, (err, stdout, stderr) => {
    //   if (err) {
    //     // node couldn't execute the command
    //     return;
    //   }
    //   // the *entire* stdout and stderr (buffered)
    //   console.log(`stdout: ${stdout}`);
    //   console.log(`stderr: ${stderr}`);
    //   console.log('Changed directory');
    // });
  },
  async installFB() {
    const { stdout, stderr } = await execAsync('npm install -g firebase-tools');
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  },
};
