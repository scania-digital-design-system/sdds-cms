# strapi-provider-upload-aws-s3-ec2metadata

This package is forked from https://github.com/strapi/strapi/tree/master/packages/strapi-provider-upload-aws-s3.
Set credentials via EC2MetadataCredentials. No need to add AWS Secret Key ID and AWS Access Key. 
This is useful if you have assigned IAM Federated User role, which in this case the AWS credentials is temporary.
Prerequisites: EC2 instance and S3 bucket is running on the same account.


## Configurations

Your configuration is passed down to the provider. (e.g: `new AWS.S3(config)`). You can see the complete list of options [here](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property)

See the [using a provider](https://strapi.io/documentation/developer-docs/latest/development/plugins/upload.html#using-a-provider) documentation for information on installing and using a provider. And see the [environment variables](https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#environment-variables) for setting and using environment variables in your configs.

**Example**

`./config/plugins.js`

```js
module.exports = ({ env }) => ({
  // ...
  upload: {
    provider: 'aws-s3-ec2metadata',
    providerOptions: {
      region: env('AWS_REGION'),
      params: {
        Bucket: env('AWS_BUCKET'),
      },
      s3PathPrefix: '', // If you want to upload files inside specific prefix, for example /Images/files.jpg add 'Images/'
      cdnUrl: 'https://abc1234.cloudfront.net/' // If you expose the bucket through cloudfront, add the cloudfront URL here
    },
  },
  // ...
});
```

## Resources

- [License](LICENSE)

## Links

- [Strapi website](https://strapi.io/)
- [Strapi community on Slack](https://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
