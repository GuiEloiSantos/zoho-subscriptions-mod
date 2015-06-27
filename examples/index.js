'use strict';

// Create your own credentials.json from the sample
var apiCredentials = JSON.parse(require('fs').readFileSync(__dirname + '/../credentials.json'));

var ZohoSubscriptions = require('../lib');

var subscriptions = new ZohoSubscriptions(apiCredentials);

