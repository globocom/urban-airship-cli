var notificationService = require('../services/notification');
var credentialLib = require('../libraries/credential');

var instruction = 'action-url <message> <url>';
var description = 'send notification action to open a url';


function _actionHandler (error, request, body) {
	if (error) return console.log('Error: ', error);

	console.log('Notification sent:', body);
}

function urlAction (message, url) {
	var credential = credentialLib.load();
	var payload = {
		'audience': 'all',
		'device_types': 'all',
		'notification': {
			'alert': message,
			'actions': {
				'open': {
					'type': 'url',
					'content': url,
				},
			},
		},
	};

	console.log('Notifing you app with url action:', message, url);

	try {
		notificationService.send(payload, credential, _actionHandler);
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	action: urlAction,
	instruction: instruction,
	description: description,
};
