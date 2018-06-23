const cmd = require("node-cmd");
const fs = require("fs");
const os = require("os");
const CLI = require("clui");
const AWS = require("aws-sdk");
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
// AWS.config.update({ region: 'us-west-2' });
// const elasticbeanstalk = new AWS.ElasticBeanstalk();

module.exports = {
  async AWSLogin() {
    const homedir = os.homedir();
    const configPath = `${homedir}/.aws/config`;
    try {
      // if fs.readFileSync Errors out then it catches
      const config = fs.readFileSync(configPath, "utf8");
      return true;
      // if (!config.includes('profile eb-cli')) throw 'No eb profile';
    } catch (err) {
      const answers = await inquirer.askKeysAWS();
      await this.checkLogin();
      await cmd.get('aws ec2 describe-instances', (err) => {
        if(!err){
          console.log("login successful!!")
        }else{
          console.log("The AWSLogin Information is not correct",err);
          await this.AWSLogin();
        }
      })
      // NOTE: Potential problem if user has multiple profiles
      const contents = `[profile eb-cli]\naws_access_key_id = ${
        answers.ACCESS_KEY_ID
      }\naws_secret_access_key = ${answers.SECRET_ACCESS_KEY}\n`;
      fs.writeFileSync(configPath, contents, "utf8");
    }
  },
  // checkLogin() {
  //   try {
  //     const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
  //     s3.listBuckets(function(err, data) {
  //       if (err) {
  //         console.log("Error", err);
  //         console.log("The AWSLogin Information is not correct");
  //         this.AWSLogin();
  //       } else {
  //         console.log("Log in successfully", data.Buckets);
  //       }
  //     });
  //   } catch (err) {
  //     console.log("The AWSLogin Information is not correct");
  //     this.AWSLogin();
  //   }
  // },

  AWSLogout() {
    const homedir = os.homedir();
    const configPath = `${homedir}/.aws/config`;
    fs.unlink(configPath, err => {
      if (err) console.log("Error:", err);
      else console.log("Logged out of AWS");
    });
  },

  async createCLI(projectName) {
    status.message(
      "Creating Elastic Beanstalk application and evironment. This may take a few minutes to complete..."
    );
    status.start();
    try {
      cmd.get(`eb create ${projectName}`, (err, data) => {
        if (!err) {
          status.stop();
          console.log("Deployed your project! Opening in your browser...");
          cmd.get("eb open");
        } else {
          status.stop();
          console.log("Error:", err);
          throw new Error("Failed to create EB application and environment", err);
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
