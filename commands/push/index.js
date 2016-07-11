var pushBroadcast = require('./broadcast');
var pushActionUrl = require('./action-url');


var LIST_ACTIONS = {
	action_url: pushActionUrl,
	broadcast: pushBroadcast,
};

function _getPushTypeAction (type) {
	var handler = LIST_ACTIONS[type];

	if (!handler) throw new Error('Unsuported type of push: ' + type);

	return handler;
}

function push (type, message, url, options) {
	var handler = _getPushTypeAction(type);

	if (type === 'broadcast') handler(message, options);
	else handler(message, url, options);
}

module.exports = {
	action: push,
	instruction: 'push <type> <message> [url]',
	description: 'send push notification: broadcast or action_url',
	options: [{
		instruction: '-P, --platforms <platforms>',
		description: 'platforms to send notification - ios, android, amazon, wns, mpns and blackberry'
	},{
		instruction: '-A, --audience <audience>',
		description: 'audience to send notification'
	}],
};