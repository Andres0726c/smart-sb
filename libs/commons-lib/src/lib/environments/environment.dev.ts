// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  remote: true,
  production: false,
  apiKeyServices: 'YkmEA1FYLQ8316jjoU0PR5gGnbLL8sOA7SrVdCly',
  urlParameterizerMS: 'https://hbk6eaxgcd.execute-api.us-east-1.amazonaws.com/dev/parametrizador/v1/',
  urlPolicyIssuerMS: 'https://hbk6eaxgcd.execute-api.us-east-1.amazonaws.com/dev/emisor/v1/',
  urlAdapterMS: 'https://hbk6eaxgcd.execute-api.us-east-1.amazonaws.com/dev/adaptador/v1/',
  urlAdapterNodeMS: 'https://hbk6eaxgcd.execute-api.us-east-1.amazonaws.com/dev/adaptador/node/v1/',
  cognito: {
    userPoolId: 'us-east-1_juYNmSqyl',
    userPoolWebClientId: '2mlplq2vpom55e72sjphho6iu0',
  },
  productAutosave: false,
  urlParameterizer: 'https://d1s6tjcltt5c19.cloudfront.net/',
  smartcoreSiteTitle: '(DEV) - Smartcore',
  urlCognitoHostedUI: 'https://refactoring-dev-portal-identity-pool.auth.us-east-1.amazoncognito.com/login?client_id=2mlplq2vpom55e72sjphho6iu0&response_type=code&scope=email+openid&redirect_uri=https%3A%2F%2Fdev-smartcore.bolnet.com.co%2Flogin'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
