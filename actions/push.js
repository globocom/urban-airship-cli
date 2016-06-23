var program = require('commander');
var request = require('request');

var credentialLib = require('../libraries/credential');

function createPushData (message, credential) {
	var requestPushData = {
		method: 'POST',
		url: 'https://go.urbanairship.com/api/push/',
		
		json: {
			'audience': 'all',
			'notification': {'alert': message},
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


function pushAction (message) {
	var credential = null;
	var requestPushData = null;

	console.log('Notifing you app with message:', message);

	try {
		credential = credentialLib.load(program);
		requestPushData = createPushData(message, credential);

		request(requestPushData, requestPushHandler);
	} catch (error) {
		console.log(error);
	}
}

module.exports = pushAction;
