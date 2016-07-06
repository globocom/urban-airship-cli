var assert = require('chai').assert;

var audienceLib = require('../../libraries/audience');


describe('libraries/audience', function () {
	describe('loadAudience', function () {
		var defaultAudience = 'all';

		it('should load default audience if nothing passed', function () {
			var audience = audienceLib.load(null);

			assert.equal(audience, defaultAudience);
		});

		it('should load default audience if invalid parameter passed', function () {
			var audience = audienceLib.load('invalid');

			assert.equal(audience, defaultAudience);
		});

		it('should load default audience if no segment id passed', function () {
			assert.throws(function () {
				audienceLib.load('segment=');
			}, 'Invalid audience value: ');
		});

		it('should load default audience if no android channel value passed', function () {
			assert.throws(function () {
				audienceLib.load('android_channel=');
			}, 'Invalid audience value: ');
		});

		it('should load default audience if no ios channel value passed', function () {
			assert.throws(function () {
				audienceLib.load('ios_channel=');
			}, 'Invalid audience value: ');
		});

		it('should load default audience if no named user id passed', function () {
			assert.throws(function () {
				audienceLib.load('named_user=');
			}, 'Invalid audience value: ');
		});

		it('should load audience with segment', function () {
			var expectedAudience = { segment: 'segment-id' };
			var audience = audienceLib.load('segment=segment-id');

			assert.deepEqual(audience, expectedAudience);
		});

		it('should load audience with android channel', function () {
			var expectedAudience = { android_channel: 'android-channel-id' };
			var audience = audienceLib.load('android_channel=android-channel-id');

			assert.deepEqual(audience, expectedAudience);
		});

		it('should load audience with ios channel', function () {
			var expectedAudience = { ios_channel: 'ios-channel-id' };
			var audience = audienceLib.load('ios_channel=ios-channel-id');

			assert.deepEqual(audience, expectedAudience);
		});

		it('should load audience with named user', function () {
			var expectedAudience = { named_user: 'named-user-id' };
			var audience = audienceLib.load('named_user=named-user-id');

			assert.deepEqual(audience, expectedAudience);
		});
	});
});