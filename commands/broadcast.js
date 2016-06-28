var notificationService = require('../services/notification');

var instruction = 'broadcast <message> [segment]';
var description = 'send push notification to all application devices';


function _actionHandler (error, request, body) {
	if (error) return console.log('Error: ', error);

	console.log('Broadcast sent:', body);
}

function broadcast (message, segment, options) {
	var key = options.parent && options.parent.key;
	var secret = options.parent && options.parent.secret;

	var payload = {
		'audience': segment && {'segment': segment} || 'all',
		'device_types': 'all',
		'notification': {'alert': message},
	};

	try {
		notificationService.send(payload, key, secret, _actionHandler);
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	action: broadcast,
	instruction: instruction,
	description: description,
};
	