'use strict';

var qs      = require('qs'),
    _       = require('lodash'),
    debug   = require('debug')('zoho-subscriptions'),
    request = require('request');

var baseUrl = 'https://subscriptions.zoho.com/api/v1/';


var Subscriptions = function ZohoSubscriptions (options) {
  options = options || {};

  if (!options.authtoken) {
    throw new Error('Zoho Subscriptions requires a valid auth token.');
  }

  if (!options.organization) {
    throw new Error('Zoho Subscriptions requires a valid organization id.');
  }

  this.authtoken = options.authtoken;
  this.organization = options.organization;

  this._apiRequest = request.defaults({
    json: true,
    baseUrl: baseUrl,
    headers: {
      'Authorization': 'Zoho-authtoken ' + this.authtoken,
      'X-com-zoho-subscriptions-organizationid': this.organization
    }
  });

};

Subscriptions.prototype.getOrganizations = function (callback) {
  return this._apiRequest.get('organizations', callback);
};


Subscriptions.prototype.getProducts = function (callback) {
  return this._apiRequest.get('products', callback);
};


module.exports = exports = Subscriptions;
