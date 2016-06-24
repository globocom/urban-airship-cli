#!/usr/bin/env node

var program = require('commander');
var arguments = process.argv;

var broadcastCommand = require('./commands/broadcast');
var actionUrlCommand = require('./commands/action-url');


var commands = [broadcastCommand,
				actionUrlCommand];

commands.forEach(function (command) {
	program
		.command(command.instruction)
		.description(command.description)
		.action(command.action);
});

program
	.option('-s, --secret <n>', 'application master secret from urban airship')
	.option('-k, --key <n>', 'application key from urban airship');

if (require.main === module) {
	var argumentsCount = arguments.slice(2).length;

	if (!argumentsCount) program.outputHelp();

	return program.parse(arguments);
}

module.exports = program;
