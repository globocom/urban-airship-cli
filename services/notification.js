var request = require('request');
var credentialLib = require('../libraries/credential');

function send (payload, credential, callback) {
	var requestPushData = createRequest(payload, credential);

	request(requestPushData, callback);
}

function createRequest (payload, credential) {
	var requestPushData = {
		method: 'POST',
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