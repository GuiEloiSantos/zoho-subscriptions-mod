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

  this.request = request.defaults({
    json: true,
    baseUrl: baseUrl,
    headers: {
      'Authorization': 'Zoho-authtoken ' + this.authtoken,
      'X-com-zoho-subscriptions-organizationid': this.organization
    }
  });

};


Subscriptions.prototype.getOrganizations = function (callback) {
  return this.request.get('organizations', callback);
};


Subscriptions.prototype.getProducts = function (callback) {
  return this.request.get('products', callback);
};


Subscriptions.prototype.createCustomer = function (customer, callback) {
  var options = customer;

  if (!_.isString(options.first_name) || !_.isString(options.last_name)) {
    throw new Error('Missing customer name');
  }

  options.display_name = options.first_name + ' ' + options.last_name;

  return this.request.post(
    {
      url: 'customers',
      json: options
    },
    callback
  );
};


Subscriptions.prototype.createHostedPage = function (subscription, callback) {
  var options = subscription;

  // Support a plan code string instead of an object to use default values
  if (_.isString(options.plan)) {
    options.plan = {
      'plan_code': options.plan
    };
  }

  return this.request.post(
    {
      url: 'hostedpages/newsubscription',
      json: options
    },
    callback
  );
};


module.exports = exports = Subscriptions;
