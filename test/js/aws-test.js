const fs = require('fs');
const os = require('os');
const expect = require('expect');
const aws = require('../../lib/aws');

describe('AWS unit tests', () => {
  describe('#AWSLogin', () => {
    it('credentials are read from config file', async () => {
      const homedir = os.homedir();
      const configPath = `${homedir}/.aws/config`;
      const contents = '[profile eb-cli]\naws_access_key_id = tester1\naws_secret_access_key = tester2\n';
      fs.writeFileSync(configPath, contents, 'utf8');
      const run = async () => aws.AWSLogin();
      const answer = await run();
      expect(answer).toEqual(contents);
    });
  });

  describe('#AWSLogout', () => {
    it('removes config file', () => {
      expect(aws.AWSLogout()).toEqual(true);
    });

    it('will error when no config exists', () => {
      expect(aws.AWSLogout()).toEqual(false);
    });
  });
});
