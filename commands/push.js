var notificationService = require('../services/notification');
var credentialLib = require('../libraries/credential');

var instruction = 'push <message>';
var description = 'send push notification to all application devices';


function _actionHandler (error, request, body) {
	if (error) return console.log('Error: ', error);

	console.log('Notification sent:', body);
}

function pushAction (message) {
	var credential = credentialLib.load();
	var payload = {
		'audience': 'all',
		'device_types': 'all',
		'notification': {'alert': message},
	};

	console.log('Notifing you app with message:', message);

	try {
		notificationService.send(payload, credential, _actionHandler);
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	action: pushAction,
	instruction: instruction,
	description: description,
};
	