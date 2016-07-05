var assert = require('chai').assert;

var audienceLib = require('../../libraries/audience');


describe('libraries/audience', function () {
	describe('loadAudience', function () {
		var defaultAudience = 'all';

		it('should load default audience if no segment passed', function () {
			var audience = audienceLib.load(null);

			assert.equal(audience, defaultAudience);
		});

		it('should load default audience if invalid parameter passed', function () {
			var audience = audienceLib.load('segment-id');

			assert.equal(audience, defaultAudience);
		});

		it('should load default audience if no segment id passed', function () {
			assert.throws(function () {
				audienceLib.load('segment=');
			}, 'Invalid audience value: ');
		});

		it('should load audience with segment', function () {
			var expectedAudience = { segment: 'segment-id' };
			var audience = audienceLib.load('segment=segment-id');

			assert.deepEqual(audience, expectedAudience);
		});
	});
});