'use strict';

const config = require('../config');
const AWS = require('aws-sdk');
const debug = require('debug')('skill');
const moment = require('moment-timezone');

class UserStorage {
  constructor() {
    this.client = new AWS.DynamoDB.DocumentClient();
    this.table = config.dynamoDB.tables.users;
    debug('UserStorage Table: %s', this.table);
  }

  get(user) {
    debug('get', user);
    const userId = user.userId;
    return this.client.get({
      TableName: this.table,
      Key: { userId },
    }).promise()
      .then(item => item.Item);
  }

  put(data) {
    data = data || {};
    debug('put', JSON.stringify(data, null, 2));
    if (!data.createdDate) {
      data.createdDate = moment().toISOString();
    }

    data.modifiedDate = moment().toISOString();

    return this.client.put({
      TableName: this.table,
      Item: data,
    }).promise();
  }
}

module.exports = UserStorage;
