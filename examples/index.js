'use strict';

// Create your own credentials.json from the sample
var apiCredentials = JSON.parse(require('fs').readFileSync('../credentials.json'));

var ZohoSubscriptions = require('../lib');

var subscriptions = new ZohoSubscriptions(apiCredentials);

