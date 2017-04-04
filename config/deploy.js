/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    build: {}
  };

  ENV.slack = {
    webhookURL: process.env.SLACK_DEPLOY_WEBHOOK,
  };

  ENV.s3 = {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    bucket: process.env.AWS_BUCKET,
    region: process.env.AWS_REGION,
    filePattern: "*",
  }
  ENV['elastic-beanstalk'] = {
    bucket: process.env.AWS_BUCKET,
    key: process.env.AWS_BEANSTALK_KEY,
  }

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
