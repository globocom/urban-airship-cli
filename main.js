#!/usr/bin/env node

var program = require('commander');
var arguments = process.argv;

var pushCommand = require('./commands/push');
var listCommand = require('./commands/list');

var package = require('./package');


var commands = [pushCommand, listCommand];

program
	.version(package.version)
	.option('-s, --secret <n>', 'application master secret from urban airship')
	.option('-k, --key <n>', 'application key from urban airship');

commands.forEach(function (command) {
	var _program = program.command(command.instruction)
		   		   .description(command.description)
		           .action(command.action);

	command.options.forEach(function (option) {
		_program.option(option.instruction, option.description);
	});
});

if (require.main === module) {
	var argumentsCount = arguments.slice(2).length;

	if (!argumentsCount) program.outputHelp();

	return program.parse(arguments);
}

module.exports = program;
