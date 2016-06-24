var program = require('commander');

var commands = [require('./commands/push'), 
				require('./commands/push-url')];


commands.forEach(function (command) {
	program
		.command(command.instruction)
		.description(command.description)
		.action(command.action);
});

program
	.option('-s, --secret <n>', 'application master secret from urban airship')
	.option('-k, --key <n>', 'application key from urban airship');

module.exports = program;
