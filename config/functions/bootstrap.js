'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/3.0.0-beta.x/concepts/configurations.html#bootstrap
 */

  //Setting the env variables for development
  if(process.env.NODE_ENV !== 'production') {
    console.log('Devlopment: reading local .env file');
    const result = require('dotenv').config();
    if (result.error) {
      throw result.error;
    }
    console.log(`Success connection to DB: ${result.parsed.DATABASE_HOST}:${result.parsed.DATABASE_PORT}`)
  }


module.exports = () => {};
