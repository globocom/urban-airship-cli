var request = require('request');

var credentialLib = require('../libraries/credential');
var services = require('../services');


function send (payload, key, secret, callback) {
	var requestPushData = null;
	var credential = credentialLib.create(key, secret) || credentialLib.loadFromEnv();
	
	if (!credential) throw new Error('No credential found!');

	requestPushData = services.createRequest('push', payload, credential);

	request.post(requestPushData, callback);
}

module.exports = {
	send: send,
};