module.exports = {
  changeDir(dir) {
    try {
      process.chdir(`${dir}`);
      console.log(`Navigated to directory: ${process.cwd()}`);
    } catch (err) {
      console.error(err);
    }
  },
};
