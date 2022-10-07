//import { environmentValues } from "../environments/environment-values";

const { environmentValues } = require('../environments/environment-values')

const { writeFile, existsSync, mkdirSync } = require('fs');
const { argv } = require('yargs');
// read environment variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
const environment = argv.environment ?? 'local';
const isProduction = environment === 'prod' || environment === 'pre';
const targetPath = `./libs/refactoring-smartcore-commons-lib/src/environments/environment.ts`;

// Providing path to the `environments` directory
const envDirectory = './libs/refactoring-smartcore-commons-lib/src/environments';

// creates the `environments` directory if it does not exist
if (!existsSync(envDirectory)) {
  mkdirSync(envDirectory);
}

// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   apiKeyServices: '${environmentValues[environment]['apiKeyServices']}',
   urlMicroServices: '${environmentValues[environment]['urlMicroServices']}',
   cognito: {
      userPoolId: 'us-east-1_ZFhpUlx6t',
      userPoolWebClientId: '7hqksg5696uaup6lp4qlcsk1dj',
   },
   productAutosave: false,
   urlParameterizer: '${environmentValues[environment]['urlParameterizer']}'
};
`;

// write the content to the respective file
writeFile(targetPath, environmentFileContent, (err: any) => {

   if (err) {
      console.log(err);
   }
   console.log(`Wrote variables to ${targetPath} --environment=${argv.environment}`);
});
