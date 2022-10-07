exports.environmentValues = {
  "stage": {
    "apiKeyServices":'UPOrFwRWKC1AJtFfkTYUz69XCWQQ48cBalVJ6A85',
    "urlMicroServices":'https://jpl0rkfluj.execute-api.us-east-1.amazonaws.com/stage/emisor/v1/',
    "cognito": {
      "userPoolId": 'us-east-1_ZFhpUlx6t',
      "userPoolWebClientId": '7hqksg5696uaup6lp4qlcsk1dj',
    },
    "productAutosave": false,
    "urlParameterizer": 'https://d1p5ro9c86yefs.cloudfront.net/'
  },
  "dev": {
    "apiKeyServices": 'YkmEA1FYLQ8316jjoU0PR5gGnbLL8sOA7SrVdCly',
    "urlMicroServices": 'https://hbk6eaxgcd.execute-api.us-east-1.amazonaws.com/dev/emisor/v1/',
    "cognito": {
      "userPoolId": 'us-east-1_ZFhpUlx6t',
      "userPoolWebClientId": '7hqksg5696uaup6lp4qlcsk1dj',
    },
    "productAutosave": false,
    "urlParameterizer": 'https://d1s6tjcltt5c19.cloudfront.net/'
  },
  "local": {
    "apiKeyServices": 'YkmEA1FYLQ8316jjoU0PR5gGnbLL8sOA7SrVdCly',
    "urlMicroServices": 'https://hbk6eaxgcd.execute-api.us-east-1.amazonaws.com/dev/emisor/v1/',
    "cognito": {
      "userPoolId": 'us-east-1_ZFhpUlx6t',
      "userPoolWebClientId": '7hqksg5696uaup6lp4qlcsk1dj',
    },
    "productAutosave": false,
    "urlParameterizer": 'https://d1s6tjcltt5c19.cloudfront.net/'
  }
};