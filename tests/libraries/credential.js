var assert = require('chai').assert;

var credentialLib = require('../../libraries/credential');


describe('libraries/credential', function () {
	var credentialKey = 'abc';
	var credentialSecret = '123';
	var expectedCredential = 'abc:123';
	var expectedEncodedCredential = 'YWJjOjEyMw==';

	describe('encodeCredential', function () {
		it('should encode credential correctly', function () {
			var encodedCredential = credentialLib.encode(expectedCredential);

			assert.equal(expectedEncodedCredential, encodedCredential);
		});
	});

	describe('createCredential', function () {
		it('should create credential', function () {
			var credential = credentialLib.create(credentialKey, credentialSecret);

			assert.equal(expectedCredential, credential);
		});

		it('should return null if invalid key or secret were passed', function () {
			var credential = credentialLib.create();
			var credentialWithOnlyKey = credentialLib.create(credentialKey, null);
			var credentialWithOnlySecret = credentialLib.create(null, credentialSecret);

			assert.equal(credential, null);
			assert.equal(credentialWithOnlyKey, null);
			assert.equal(credentialWithOnlySecret, null);
		});
	});

	describe('loadCredentialFromEnv', function () {
		it('should load credential from environment variables', function () {
			process.env.URBAN_AIRSHIP_KEY = credentialKey;
			process.env.URBAN_AIRSHIP_MASTER_SECRET = credentialSecret;

			var loadedCredential = credentialLib.loadFromEnv();

			assert.equal(expectedCredential, loadedCredential);

			delete process.env.URBAN_AIRSHIP_KEY;
			delete process.env.URBAN_AIRSHIP_MASTER_SECRET;
		});

		it('should return null if no credential environment variables found', function () {
			var loadedCredential = credentialLib.loadFromEnv();

			assert.equal(loadedCredential, null);
		});
	});
});
