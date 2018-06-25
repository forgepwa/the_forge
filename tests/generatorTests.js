// var assert = require('assert');
const fb = require("../lib/firebase.js");
const client = require("firebase-tools");
const gen = require("../lib/generator.js");
const bddStdin = require('bdd-stdin');
//when duplicate project name, should reprompt user to enter new project name
//
describe("#duplicate project name", () => {
  let host = { hosting: "Firebase" };
  const answers = [
    { "project-choice": "beginners-guide" },
    { "project-name": "test1" }
  ];
  it("get the project name", () => {
    let result = gen.generateTemplate(answers, host);
    expect(result).toEqual(true);
  });
  it("should get false for duplicate project name"), () => {
    let result = gen.generateTemplate(answers.host);
    expect(result).toEqual(false);
  }
});
