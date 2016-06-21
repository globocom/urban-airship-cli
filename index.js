var program = require('commander');
var request = require('request');

program
	.command('notify [message]')
	.description('send notification to all application devices')
	.action(function (message) {
		console.log('Notifing:', message);

		request({
			method: 'POST',
			url: 'https://go.urbanairship.com/api/push/',
			
			json: {
				'audience': 'all',
				'notification': {'alert': message},
				'device_types': ['android'],
			},

			headers: {
				'Authorization': 'Basic ' + new Buffer('w9rweopTR869zt5jjHzgiA:8816ZB4GQ7aJokhT9CUIcA').toString('base64'),
				'Accept': 'application/vnd.urbanairship+json; version=3;',
				'Content-Type': 'application/json',
			},
		},
		
		function (e, r, body) {
			if (e) return console.log('Error: ', e);

			console.log('Notification sent:', body);
		});
	});

program.parse(process.argv);
