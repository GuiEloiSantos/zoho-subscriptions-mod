'use strict';

var qs      = require('qs'),
    _       = require('lodash'),
    debug   = require('debug')('zoho-subscriptions'),
    request = require('superagent');

var baseUrl = 'https://subscriptions.zoho.com/api/v1/';


var Subscriptions = function (options) {
  options = options || {};

  if (!options.authtoken) {
    throw new Error('Zoho Subscriptions requires a valid auth token.');
  }

  this.authtoken = options.authtoken;
  this.organization = options.organization;
};


Subscriptions.prototype.getProducts = function (callback) {
  return [];
};


module.exports = exports = Subscriptions;
