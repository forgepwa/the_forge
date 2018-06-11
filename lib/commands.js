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
};
