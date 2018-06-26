# the Forge
"**Where code is smithed.**"

Create *and* deploy PWAs with one simple command.

<p align='center'>
<img src=https://i.imgur.com/Bch4gAK.png width='600' alt='help screen'>
</p>

## Quick run-down:
```sh
npm install the_forge -g
forge
```
If you aren't already logged-in, you will be redirected to log-in to firebase. After authenticating, create a new firebase project.
Answer the questions to select what type of PWA you'd like to create and name your new project.
Everything will be created and deployed for you! Enjoy.

<p align='center'>
<img src=https://media.giphy.com/media/2YnBCupyqeqIgwP9yd/giphy.gif width='600' alt='forge'>
</p>

### Start smithing your PWA immediately.

Your webpack etc is pre-configured for you and ready to go but available and easy to modify to suit your needs as your app progresses.

## How to create a new firebase project:
Navigate to https://console.firebase.google.com and look for the **Add project** button ->
<p align='center'>
<img src='https://i.imgur.com/nox73zP.png' width='300' alt='new-project-firebase-console'>
</p>
Follow the instructions to create the new project.<br />
After creating the project, copy its name for use in the Forge CLI ->
<p align='center'>
<img src=https://media.giphy.com/media/58FObrPmgNqvLYJayZ/giphy.gif width='300' alt='copy-project-name'>
</p>
Enjoy the Forge! 😊

## How to use the AWS deployment feature:
Before you choose AWS as your deployment method, install the elastic beanstalk command line interface.
```sh
brew install awsebcli
```
1. Log in to your [AWS Management Console](https://aws.amazon.com/console/).<br />
2. Click on Services and search for [IAM](https://console.aws.amazon.com/iam/home).<br />
3. Click Users and then add a user.<br />
4. Enter a name and select the "Programmatic access" box, then hit Next.<br />
5. Select "Attach existing policies directly" and check the box for "AdministratorAccess", then hit Next again.<br />
6. Click "Create User" and wait a few seconds.<br />
7. You should now see your Access key ID and have the option to view the Secret access key, download these with the "Download .csv" button and have them ready for inputing into the Forge.

You are now ready to use the Forge to deploy a project to AWS! 👌

Enjoy the Forge! 😊


## Issues / Feedback
Submit any [issues](https://github.com/forgepwa/the_forge/issues) you have, any bug you find or any suggestions you'd like.

## Contributors
[Tiffany Yang](https://github.com/tyang1) | [Christopher Washburn](https://github.com/SKChristopher) | [Jeff Kang](https://github.com/jkang215) | [Kyle Loftin](https://github.com/KALoftin)
