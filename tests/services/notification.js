var assert = require('chai').assert;
var sinon = require('sinon');
var request = require('request');

var notificationService = require('../../services/notification');


describe('services/notification', function () {
	describe('send', function () {
		var credentialKey = 'abc';
		var credentialSecret = '123';
		var expectedAuthorization = 'Basic YWJjOjEyMw==';

		it('should throw error if no credential found', function () {
			assert.throw(notificationService.send, 'No credential found!');
		});

		it('should use options credential key and secret', function () {
			var authorization = null;
			var postRequest = sinon.stub(request, 'post');

			notificationService.send({}, credentialKey, credentialSecret, function () {});
			authorization = postRequest.getCall(0).args[0].headers['Authorization'];

			assert.equal(authorization, expectedAuthorization);
						
			postRequest.restore();
		});

		it('should use credential from environment variables', function () {
			var authorization = null;
			var postRequest = sinon.stub(request, 'post');

			process.env.URBAN_AIRSHIP_KEY = credentialKey;
			process.env.URBAN_AIRSHIP_MASTER_SECRET = credentialSecret;

			notificationService.send({}, null, null, function () {});
			authorization = postRequest.getCall(0).args[0].headers['Authorization'];

			assert.equal(authorization, expectedAuthorization);

			delete process.env.URBAN_AIRSHIP_KEY;
			delete process.env.URBAN_AIRSHIP_MASTER_SECRET;
		
			postRequest.restore();
		});

		it('options credential should have precendence over environment variables', function () {
			var authorization = null;
			var postRequest = sinon.stub(request, 'post');

			process.env.URBAN_AIRSHIP_KEY = 'env-key';
			process.env.URBAN_AIRSHIP_MASTER_SECRET = 'env-secret';

			notificationService.send({}, credentialKey, credentialSecret, function () {});
			authorization = postRequest.getCall(0).args[0].headers['Authorization'];

			assert.equal(authorization, expectedAuthorization);

			delete process.env.URBAN_AIRSHIP_KEY;
			delete process.env.URBAN_AIRSHIP_MASTER_SECRET;

			postRequest.restore();
		});

		it('should use payload to create request', function () {
			var payload = null;
			var postRequest = sinon.stub(request, 'post');
			var expectedPayload = {test: 'abc'};

			notificationService.send(expectedPayload, credentialKey, credentialSecret, function () {});
			payload = postRequest.getCall(0).args[0].json;

			assert.equal(payload, expectedPayload);

			postRequest.restore();
		});
	});
});