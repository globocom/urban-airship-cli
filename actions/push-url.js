var program = require('commander');
var request = require('request');

var credentialLib = require('../libraries/credential');

function createPushData (message, url, credential) {
	var requestPushData = {
		method: 'POST',
		url: 'https://go.urbanairship.com/api/push/',
		
		json: {
			'audience': 'all',
			'notification': {
				'alert': message,
				'actions': {
					'open': {
						'type': 'url',
						'content': url,
					},
				},
			},
			'device_types': 'all',
		},

		headers: {
			'Authorization': 'Basic ' + credentialLib.encode(credential),
			'Accept': 'application/vnd.urbanairship+json; version=3;',
			'Content-Type': 'application/json',
		},
	}

	return requestPushData;
}

function requestPushHandler (error, request, body) {
	if (error) return console.log('Error: ', error);

	console.log('Notification sent:', body);
}

function pushUrlAction (message, url) {
	var credential = null;
	var requestPushData = null;

	console.log('Notifing you app with url action:', message, url);

	try {
		credential = credentialLib.load(program);
		requestPushData = createPushData(message, url, credential);

		request(requestPushData, requestPushHandler);
	} catch (error) {
		console.log(error);
	}
}

module.exports = pushUrlAction;
