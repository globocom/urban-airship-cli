var program = require('commander');
var request = require('request');

var credentialLib = require('../libraries/credential');
var requestHandler = require('../handlers/request');

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

function pushUrlAction (message, url) {
	var credential = null;
	var requestPushData = null;

	console.log('Notifing you app with url action:', message, url);

	try {
		credential = credentialLib.load(program);
		requestPushData = createPushData(message, url, credential);

		request(requestPushData, requestHandler);
	} catch (error) {
		console.log(error);
	}
}

module.exports = pushUrlAction;
