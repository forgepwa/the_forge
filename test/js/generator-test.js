const fs = require('fs');
const expect = require('expect');
const generator = require('../../lib/generator');

describe('Generator unit tests', () => {
  describe('#generateTemplate', () => {
    it('Generates the beginners-guide with local hosting', () => {
      console.log(process.cwd());
      generator.generateTemplate('testing1', 'beginners-guide', 'Local');
      const stats = fs.statSync(process.cwd());
      process.chdir('..');
      expect(stats.isDirectory()).toEqual(true);
    });

    it('Generates the react-pwa with firebase hosting', () => {
      console.log(process.cwd());
      generator.generateTemplate('testing2', 'react-pwa', 'Firebase');
      const stats = fs.statSync(process.cwd());
      const files = fs.readdirSync(process.cwd()).filter(file => file[0] !== '.');
      process.chdir('..');
      expect(files).toContain('firebase.json');
      expect(stats.isDirectory()).toEqual(true);
    });
  });

  describe('#generateInits', () => {
    it('Generates AWS init files to testing1 directory', () => {
      console.log(process.cwd());
      generator.generateInits('testing1');
      process.chdir('../testing1');
      const files = fs.readdirSync(process.cwd());
      expect(files).toContain('.ebextensions');
      expect(files).toContain('.elasticbeanstalk');
    });
  });
});
