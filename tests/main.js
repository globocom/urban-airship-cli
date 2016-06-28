var assert = require('chai').assert;
var fs = require('fs');


var main = require('../main');

describe('main', function () {
	it('should have loaded programs', function () {
		var commandsCounter = 0;

		fs.readdirSync(__dirname + '/../commands').forEach(function () {
			commandsCounter++;
		});

		assert.lengthOf(main.commands, commandsCounter);
	});
});