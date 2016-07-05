var assert = require('chai').assert;
var sinon = require('sinon');
var request = require('request');

var listService = require('../../services/list');


describe('services/list', function () {
	describe('get', function () {
		var credentialKey = 'abc';
		var credentialSecret = '123';
		var expectedAuthorization = 'Basic YWJjOjEyMw==';

		it('should throw error if no credential found', function () {
			assert.throw(listService.get, 'No credential found!');
		});

		it('should use options credential key and secret', function () {
			var authorization = null;
			var getRequest = sinon.stub(request, 'get');

			listService.get(null, credentialKey, credentialSecret, function () {});
			authorization = getRequest.getCall(0).args[0].headers['Authorization'];

			assert.equal(authorization, expectedAuthorization);
						
			getRequest.restore();
		});

		it('should use credential from environment variables', function () {
			var authorization = null;
			var getRequest = sinon.stub(request, 'get');

			process.env.URBAN_AIRSHIP_KEY = credentialKey;
			process.env.URBAN_AIRSHIP_MASTER_SECRET = credentialSecret;

			listService.get(null, null, null, function () {});
			authorization = getRequest.getCall(0).args[0].headers['Authorization'];

			assert.equal(authorization, expectedAuthorization);

			delete process.env.URBAN_AIRSHIP_KEY;
			delete process.env.URBAN_AIRSHIP_MASTER_SECRET;

			getRequest.restore();
		});

		it('options credential should have precendence over environment variables', function () {
			var authorization = null;
			var getRequest = sinon.stub(request, 'get');

			process.env.URBAN_AIRSHIP_KEY = 'env-key';
			process.env.URBAN_AIRSHIP_MASTER_SECRET = 'env-secret';

			listService.get(null, credentialKey, credentialSecret, function () {});
			authorization = getRequest.getCall(0).args[0].headers['Authorization'];

			assert.equal(authorization, expectedAuthorization);

			delete process.env.URBAN_AIRSHIP_KEY;
			delete process.env.URBAN_AIRSHIP_MASTER_SECRET;

			getRequest.restore();
		});

		it('should use type to create request', function () {
			var url = null;
			var expectedUrl = 'https://go.urbanairship.com/api/channels';
			var getRequest = sinon.stub(request, 'get');

			listService.get('channels', credentialKey, credentialSecret, function () {});
			url = getRequest.getCall(0).args[0].url;

			assert.equal(url, expectedUrl);

			getRequest.restore();
		});
	});
});