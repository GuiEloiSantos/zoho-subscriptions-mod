'use strict';

var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var assert = chai.assert;

var ZohoSubscriptions = require('../lib');

var credentials = JSON.parse(require('fs').readFileSync(__dirname + '/../credentials.json'));


describe('zoho-subscriptions', function () {

  describe('constructor', function () {

    it('should fail without an authtoken', function () {
      (function () {
        new ZohoSubscriptions({
          organization: '1234'
        });
      }).should.throw()
    });

    it('should fail without an organization', function () {
      (function () {
        new ZohoSubscriptions({
          authtoken: '1234'
        });
      }).should.throw()
    });

    it('should succeed with an authtoken and an organization', function () {
      (function () {
        new ZohoSubscriptions({
          authtoken: '1234',
          organization: '1234'
        });
      }).should.not.throw()
    });

    it('should succeed with a valid credentials.json', function () {
      (function () {
        new ZohoSubscriptions(credentials);
      }).should.not.throw()
    });

  });


  var testApi = new ZohoSubscriptions(credentials);

  var checkApiResponse = function (err, response, body) {
    assert.ifError(err);

    body.should.be.an('object');
    body.code.should.equal(0, 'bad api response code');
    body.message.should.equal('success');

    response.statusCode.should.satisfy(function (code) {
      console.log('code', code)
      return [200, 201].indexOf(code) !== -1;
    }, 'bad http status code');
  };


  describe('getOrganizations', function () {

    it('should return a list of organizations', function (done) {
      testApi.getOrganizations(function (err, response, body) {
        checkApiResponse(err, response, body);

        body.organizations.should.be.an('array');

        done();
      });
    });

  });

  describe('getProducts', function () {

    it('should return a list of products', function (done) {
      testApi.getProducts(function (err, response, body) {
        checkApiResponse(err, response, body);

        body.products.should.be.an('array');

        done();
      });
    });

  });

});
