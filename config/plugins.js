module.exports = ({ env }) => ({
  upload: {
    provider: 'aws-s3-ec2metadata',
    providerOptions: {
      region: env('AWS_REGION'),
      params: {
        Bucket: env('AWS_BUCKET'),
      },
      s3PathPrefix: env('S3_PREFIX'),
      cdnUrl: env('S3_CDN')
    },
  },
});