var audienceLib = require('../../libraries/audience');
var platformLib = require('../../libraries/platform');
var notificationService = require('../../services/notification');

 
function _actionHandler (error, request, body) {
	if (error) return console.log('Error: ', error);

	console.log('Broadcast sent:', body);
}

function broadcast (message, options) {
	var key = options.parent && options.parent.key;
	var secret = options.parent && options.parent.secret;

	var payload = {
		'audience': audienceLib.load(options.audience),
		'device_types': platformLib.load(options.platforms),
		'notification': {'alert': message},
	};

	try {
		notificationService.send(payload, key, secret, _actionHandler);
	} catch (error) {
		console.log(error);
	}
}

module.exports = broadcast;