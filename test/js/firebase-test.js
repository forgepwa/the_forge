const expect = require('expect');
const Configstore = require('configstore');
const firebase = require('../../lib/firebase');
const pkg = require('../../package.json');

const conf = new Configstore(pkg.name);

describe('Firebase unit tests', () => {
  describe('#FBLogin', () => {
    it('Firebase credentials are read from configstore', async () => {
      conf.set('firebase.token', 'testingtesting');
      const run = async () => firebase.FBLogin();
      const answer = await run();
      expect(answer).toEqual('testingtesting');
    });
  });

  describe('#getStoredFBToken', () => {
    it('Token is found in configstore', () => {
      expect(firebase.getStoredFBToken()).toEqual('testingtesting');
    });
  });

  describe('#FBLogout', () => {
    it('removes configstore token', async () => {
      await firebase.FBLogout();
      expect(firebase.getStoredFBToken()).toEqual('');
    });
  });
});
