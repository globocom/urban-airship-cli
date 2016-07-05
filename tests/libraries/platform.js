var assert = require('chai').assert;

var platformLib = require('../../libraries/platform');


describe('libraries/platform', function () {
	describe('loadPlatforms', function () {
		it('should load default platforms if no platform passed', function () {
			var expectedPlatforms = ['ios', 'android'];
			var platforms = platformLib.load(null);

			assert.deepEqual(platforms, expectedPlatforms);
		});

		it('should load platforms correctly', function () {
			var expectedPlatforms = ['android', 'amazon', 'ios'];
			var platforms = platformLib.load('android, amazon, ios');

			assert.deepEqual(platforms, expectedPlatforms);
		});

		it('should not permit platforms not supported', function () {
			var expectedError = 'Unsuported platform: windows';

			assert.throws(function () {
				platformLib.load('ios, android, windows');
			}, expectedError);
		});

		it('should permit all supported platforms', function () {
			var expectedPlatforms = ['ios', 'android', 'amazon', 'wns', 'mpns', 'blackberry'];
			var platforms = platformLib.load('ios, android, amazon, wns, mpns, blackberry');

			assert.deepEqual(platforms, expectedPlatforms);
		});
	});
});