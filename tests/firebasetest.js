var assert = require('assert');
const fb = require('../lib/firebase.js');
const client = require('firebase-tools');
//make sure that the invalid firebase auth will reprompt

describe('#FBLogin', () => {
    it('invalid firebase auth will invoke reprompt', () => {
    fb.setFBToken().then((reply) => {
        
    })
})
})

describe('#duplicate project name', () => {
    let projectDirName = "test";
    fb.deploy("test")
})