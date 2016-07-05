var credentialLib = require('../libraries/credential');


var HOST = 'https://go.urbanairship.com/api/';

function createRequest (url, payload, credential) {
	var requestData = {
		url: HOST + url,
		json: payload,
		headers: {
			'Authorization': 'Basic ' + credentialLib.encode(credential),
			'Accept': 'application/vnd.urbanairship+json; version=3;',
			'Content-Type': 'application/json',
		},
	}

	return requestData;
}

module.exports = {
	createRequest: createRequest,
};