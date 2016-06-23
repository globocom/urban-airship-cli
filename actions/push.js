var program = require('commander');
var request = require('request');

var credentialLib = require('../libraries/credential');
var notification = require('../services/notification');

function pushAction (message) {
	var credential = null;
	var requestPushData = null;

	console.log('Notifing you app with message:', message);

	try {
		credential = credentialLib.load(program);
		requestPushData = notification.createRequest(message, null, credential);

		request(requestPushData, notification.handleRequest);
	} catch (error) {
		console.log(error);
	}
}

module.exports = pushAction;
