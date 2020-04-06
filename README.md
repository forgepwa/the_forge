# the Forge
"**Where code is smithed.**"

Create *and* deploy Progressive Web Apps with one simple command.

<p align='center'>
<img src=https://i.imgur.com/nNPlBhp.png width='600' alt='help screen'>
</p>

## Getting Started:
Be sure to install the Forge with the global -g flag:
```sh
npm install the_forge -g
forge
```
When creating a project, you will be asked how you would like to host it. If you aren't already logged-in, you will be directed to log-in to Firebase or AWS.<br /><br />
After authenticating, answer the questions to select what type of PWA you'd like to create and name your new project directory.<br /><br />
Everything will be generated and deployed for you!<br />

<p align='center'>
<img src=https://i.imgur.com/KL5r05L.gif width='600' alt='forge'>
</p>

### Start smithing your PWA immediately.

Your server and webpack files are pre-configured and ready to go but easy to modify to suit your needs as your app progresses. When you make changes you can run forge -r to redeploy.<br /><br />
**A note about navigating directories**: the Forge scans for directories in your terminal's current working directory, so be sure to run the Forge from one directory above your targeted directory when using redeploy and init flags.

## How to create a new firebase project:
Navigate to https://console.firebase.google.com and look for the **Add project** button ->
<p align='center'>
<img src='https://i.imgur.com/nox73zP.png' width='300' alt='new-project-firebase-console'>
</p>
Follow the instructions to create the new project.<br /><br />
After creating the project, copy its name (the bottom one) for use in the Forge CLI ->
<p align='center'>
<img src=https://media.giphy.com/media/58FObrPmgNqvLYJayZ/giphy.gif width='300' alt='copy-project-name'>
</p>

## How to use the AWS deployment feature:
Before you choose AWS as your deployment method, install the elastic beanstalk command line interface with homebrew. If installing with pip, be sure to configure the command path to work as **eb**.<br />
### **AWS deployment requires these tools.**
```sh
brew install awsebcli
```

### Creating an AWS User Profile
1. Log in to your [AWS Management Console](https://aws.amazon.com/console/).<br />
2. Click on Services and search for [IAM](https://console.aws.amazon.com/iam/home).<br />
3. Click Users and then add a user.<br />
4. Enter a name and select the "Programmatic access" box, then hit Next.<br />
5. Select "Attach existing policies directly" and check the box for "AdministratorAccess", then hit Next again.<br />
6. Click "Create User" and wait a few seconds.<br />
7. You should now see your Access key ID and have the option to view the Secret access key, download these with the "Download .csv" button and have them ready for input into the Forge prompt.

You are now ready to use the Forge to deploy a project to AWS! 👌

Enjoy the Forge! 😊


## Issues / Feedback
Submit issues [here](https://github.com/forgepwa/the_forge/issues). Tell us about any bugs you find or any features you'd like to suggest!<br />
[Website](https://forgepwa.com) | [Github](https://github.com/forgepwa/the_forge) | [NPM](https://npmjs.com/package/the_forge)

## Contributors
[Tiffany Yang](https://github.com/tyang1) | [Christopher Washburn](https://github.com/SKChristopher) | [Jeff Kang](https://github.com/jkang215) | [Kyle Loftin](https://github.com/KALoftin)
