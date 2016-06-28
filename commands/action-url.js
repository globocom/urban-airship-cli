var notificationService = require('../services/notification');

var instruction = 'action-url <message> <url> [segment]';
var description = 'send notification action to open a url';


function _actionHandler (error, request, body) {
	if (error) return console.log('Error: ', error);

	console.log('Url action sent:', body);
}

function urlAction (message, url, segment, options) {
	var key = options.parent && options.parent.key;
	var secret = options.parent && options.parent.secret;

	var payload = {
		'audience': segment && {'segment': segment} || 'all',
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

	try {
		notificationService.send(payload, key, secret, _actionHandler);
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	action: urlAction,
	instruction: instruction,
	description: description,
};
