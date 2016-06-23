var credentialLib = require('../libraries/credential');

function handleNotificationRequest (error, request, body) {
	if (error) return console.log('Error: ', error);

	console.log('Notification sent:', body);
}

function createNotificationBody (message, url) {
	var notification = {
		'alert': message,
	};
	
	if (url) {
		notification.actions = {
			'open': {
				'type': 'url',
				'content': url,
			},
		}
	}

	return notification;
}

function createNotificationRequest (message, url, credential) {
	var notification = createNotificationBody(message, url);

	var requestPushData = {
		method: 'POST',
		url: 'https://go.urbanairship.com/api/push/',
		
		json: {
			'audience': 'all',
			'device_types': 'all',
			'notification': notification,
		},

		headers: {
			'Authorization': 'Basic ' + credentialLib.encode(credential),
			'Accept': 'application/vnd.urbanairship+json; version=3;',
			'Content-Type': 'application/json',
		},
	}

	return requestPushData;
}

module.exports = {
	handleRequest: handleNotificationRequest,
	createRequest: createNotificationRequest,
};