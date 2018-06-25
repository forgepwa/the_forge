const AWS = require("aws-sdk");
const cmd = require("node-cmd");
const fs = require("fs");
const os = require("os");
const CLI = require("clui");
const inquirer = require("./inquirer");

const { Spinner } = CLI;
const status = new Spinner("Forging 🔨, please wait...", [
  "🔥",
  "🔥",
  "🔥",
  "🔥",
  "💥",
  "💥",
  "💥",
  "💥",
  "⚡",
  "⚡",
  "⚡",
  "⚡",
  "🌋",
  "🌋",
  "🌋",
  "🌋"
]);

let that = this;
module.exports = {
  AWSLogin() {
    const homedir = os.homedir();
    configPath = `${homedir}/.aws/config`;
    try {
      // if fs.readFileSync Errors out then it catches
      const config = fs.readFileSync(configPath, "utf8");
      //check to see if config contains the profile eb-cli
      //if not, throw an error
      if (config.includes("profile eb-cli")) {
        console.log("Authentication passed. 🔐\n");
      } else {
        throw error;
      }
      // await this.checkLogin();
      // if (!config.includes('profile eb-cli')) throw 'No eb profile';
    } catch (err) {
      //catch the error from the if/else in the try statement
      return this.CheckLogin();
    }
  },
  async CheckLogin() {
    //
    try {
      answers = await inquirer.askKeysAWS();
      const homedir = os.homedir();
      configPath = `${homedir}/.aws/credentials`;
      const contents = `[default]\naws_access_key_id = ${
        answers.ACCESS_KEY_ID
      }\naws_secret_access_key = ${answers.SECRET_ACCESS_KEY}\n`;
      await fs.writeFileSync(configPath, contents, "utf8");

      //ask for access, stored in env variables
      //if approved, write to profile eb-cli
      //if not, repeat the above steps
      const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
      let that = this;
      s3.listBuckets(function(err, data) {
        if (err) {
          console.log("Error", err);
          console.log("The AWSLogin Information is not correct");
          return that.CheckLogin();
        } else {
          console.log("Log in successfully", data.Buckets);
          const contents = `[profile eb-cli]\naws_access_key_id = ${
            answers.ACCESS_KEY_ID
          }\naws_secret_access_key = ${answers.SECRET_ACCESS_KEY}\n`;
          fs.writeFileSync(configPath, contents, "utf8");
        }
      });
    } catch (err) {
      console.log("The AWSLogin Information is not correct");
      return that.CheckLogin();
    }
  },

  AWSLogout() {
    const homedir = os.homedir();
    const configPath = `${homedir}/.aws/config`;
    fs.unlink(configPath, err => {
      if (err) console.log("");
      else console.log("Logged out of AWS");
    });
  },

  async createCLI(projectName) {
    status.message(
      "Creating Elastic Beanstalk application and environment. This may take a few minutes to complete..."
    );
    status.start();
    try {
      cmd.get(`eb create ${projectName}`, err => {
        if (!err) {
          status.stop();
          console.log("Deployed your project! Opening in your browser...");
          cmd.get("eb open");
        } else {
          status.stop();
          console.log("Error:", err);
          throw new Error(
            "Failed to create EB application and environment",
            err
          );
        }
      });
    } catch (err) {
      throw err;
    }
  },

  deploy() {
    status.message(
      "Redeploying your project to AWS. This may take a few minutes to complete..."
    );
    status.start();
    try {
      cmd.get("eb deploy", err => {
        if (!err) {
          status.stop();
          console.log("Redeployed your project! Opening in your browser...");
          cmd.get("eb open");
        } else {
          status.stop();
          console.log("Error:", err);
          throw new Error("Failed to redeploy project.");
        }
      });
    } catch (err) {
      status.stop();
      throw err;
    }
  }
};
