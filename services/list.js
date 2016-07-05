var request = require('request');

var credentialLib = require('../libraries/credential');
var services = require('../services');


function get (type, key, secret, callback) {
	var requestListData = null;
	var credential = credentialLib.create(key, secret) || credentialLib.loadFromEnv();
	
	if (!credential) throw new Error('No credential found!');

	requestListData = services.createRequest(type, null, credential);

	request.get(requestListData, callback);
}

module.exports = {
	get: get,
};