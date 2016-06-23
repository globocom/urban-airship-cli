var program = require('commander');
var request = require('request');

function encodeCredential (credential) {
	return new Buffer(credential).toString('base64');
}

function loadCredential (program) {
	var secret = null;
	var key = null;
	var credential = null;

	if (program.secret) secret = program.secret;
	else if (process.env.URBAN_AIRSHIP_MASTER_SECRET) secret = process.env.URBAN_AIRSHIP_MASTER_SECRET;
	else throw new Error('application master key not defined');

	if (program.key) key = program.key;
	else if (process.env.URBAN_AIRSHIP_KEY) key = process.env.URBAN_AIRSHIP_KEY;
	else throw new Error('application key not defined');

	credential = key + ':' + secret;

	return credential;
}

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
			'Authorization': 'Basic ' + encodeCredential(credential),
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
		credential = loadCredential(program);
		requestPushData = createPushData(message, credential);

		request(requestPushData, requestPushHandler);
	} catch (error) {
		console.log(error);
	}
}

module.exports = pushAction;
