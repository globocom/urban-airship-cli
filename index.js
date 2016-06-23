var program = require('commander');
var request = require('request');

var pushAction = require('./actions/push');
var pushUrlAction = require('./actions/push-url');

program
	.option('-s, --secret <n>', 'application master secret from urban airship')
	.option('-k, --key <n>', 'application key from urban airship')
	.command('push <message>')
	.description('send push notification to all application devices')
	.action(pushAction);

program
	.option('-s, --secret <n>', 'application master secret from urban airship')
	.option('-k, --key <n>', 'application key from urban airship')
	.command('push-url <message> <url>')
	.description('send notification action to open a url')
	.action(pushUrlAction);

program.parse(process.argv);
