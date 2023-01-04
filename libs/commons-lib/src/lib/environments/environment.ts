// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  remote: false,
  production: false,
  apiKeyServices: 'YkmEA1FYLQ8316jjoU0PR5gGnbLL8sOA7SrVdCly',
  urlParameterizerMS: 'https://hbk6eaxgcd.execute-api.us-east-1.amazonaws.com/dev/parametrizador/v1/',
  urlPolicyIssuerMS: 'https://hbk6eaxgcd.execute-api.us-east-1.amazonaws.com/dev/emisor/v1/',
  // urlPolicyIssuerMS:'http://localhost:80/emisor/v1/',
  cognito: {
    userPoolId: 'us-east-1_juYNmSqyl',
    userPoolWebClientId: '2mlplq2vpom55e72sjphho6iu0',
  },
  productAutosave: false,
  urlParameterizer: 'https://d1s6tjcltt5c19.cloudfront.net/',
  smartcoreSiteTitle: 'Smartcore'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
