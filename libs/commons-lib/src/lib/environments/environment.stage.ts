// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  remote: true,
  production: false,
  apiKeyServices: 'UPOrFwRWKC1AJtFfkTYUz69XCWQQ48cBalVJ6A85',
  urlParameterizerMS: 'https://jpl0rkfluj.execute-api.us-east-1.amazonaws.com/stage/parametrizador/v1/',
  urlPolicyIssuerMS: 'https://jpl0rkfluj.execute-api.us-east-1.amazonaws.com/stage/emisor/v1/',
  cognito: {
    userPoolId: 'us-east-1_XXXM3luFv',
    userPoolWebClientId: '1oklgg9mvl2ivba130lag310e0',
  },
  productAutosave: false,
  urlParameterizer: 'https://d1p5ro9c86yefs.cloudfront.net/',
  smartcoreSiteTitle: '(STG) - Smartcore'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
