var request = require('request');

var credentialLib = require('../libraries/credential');


function send (payload, key, secret, callback) {
	var requestPushData = null;
	var credential = credentialLib.create(key, secret) || credentialLib.loadFromEnv();
	
	if (!credential) throw new Error('No credential found!');

	requestPushData = createRequest(payload, credential);

	request.post(requestPushData, callback);
}

function createRequest (payload, credential) {
	var requestPushData = {
		url: 'https://go.urbanairship.com/api/push/',
		json: payload,
		headers: {
			'Authorization': 'Basic ' + credentialLib.encode(credential),
			'Accept': 'application/vnd.urbanairship+json; version=3;',
			'Content-Type': 'application/json',
		},
	}

	return requestPushData;
}

module.exports = {
	send: send,
};