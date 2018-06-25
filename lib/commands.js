module.exports = {
  changeDir(dir) {
    try {
      process.chdir(`${dir}`);
      console.log(`Navigated to directory: ${process.cwd()}`);
    } catch (err) {
      throw new Error(`Could not navigate to directory.\nError: ${err}`);
    }
  },
};
