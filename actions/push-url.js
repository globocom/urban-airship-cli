var program = require('commander');
var request = require('request');

var credentialLib = require('../libraries/credential');
var notification = require('../services/notification');

function pushUrlAction (message, url) {
	var credential = null;
	var requestPushData = null;

	console.log('Notifing you app with url action:', message, url);

	try {
		credential = credentialLib.load(program);
		requestPushData = notification.createRequest(message, url, credential);

		request(requestPushData, notification.handleRequest);
	} catch (error) {
		console.log(error);
	}
}

module.exports = pushUrlAction;
