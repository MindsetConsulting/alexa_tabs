'use strict';

const path = require('path');
const env = require('./env').toLowerCase();

const configFile = require(path.join(__dirname, `${env}.json`));
configFile.env = env;

/*******  plugins  *******/
const AWS = require('aws-sdk');
const https = require('https');
const _ = require('lodash');

AWS.config.update(_.merge({
  maxRetries: 8,
  httpOptions: {
    /**
     * See known issue: https://github.com/aws/aws-sdk-js/issues/862
     */
    timeout: 4000,
    agent: new https.Agent({
      keepAlive: false,
      rejectUnauthorized: true,
      secureProtocol: 'TLSv1_method',
      ciphers: 'ALL',
    }),
  },
}, configFile.aws));



/*****  plugins end *****/



module.exports = configFile;
module.exports.asFunction = () => configFile;