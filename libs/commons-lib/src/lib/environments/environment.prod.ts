// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  remote: true,
  production: false,
  apiKeyServices: 'UPOrFwRWKC1AJtFfkTYUz69XCWQQ48cBalVJ6A85',
  urlParameterizerMS: 'https://ohcne9kyt2.execute-api.us-east-1.amazonaws.com/prod/parametrizador/v1/',
  urlPolicyIssuerMS: 'https://ohcne9kyt2.execute-api.us-east-1.amazonaws.com/prod/emisor/v1/',
  cognito: {
    userPoolId: 'us-east-1_UH2hsr9wx',
    userPoolWebClientId: '23fhisvmnsa9i120i9i945pr2h',
  },
  productAutosave: false,
  urlParameterizer: 'https://d1p5ro9c86yefs.cloudfront.net/',
  smartcoreSiteTitle: '(PRD) - Smartcore'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
