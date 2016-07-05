var listService = require('../services/list');


var LIST_TYPES = {
	channels: function _channelActionHandler (error, response, body) {
		if (error) return console.log('Error: ', error);

		var responseJSON = JSON.parse(body);
		
		console.log('Channels:', responseJSON);
	},
	segments: function _segmentActionHandler (error, response, body) {
		if (error) return console.log('Error: ', error);

		var responseJSON = JSON.parse(body);
		
		console.log('Segments:', responseJSON);
	},
};

function _getListTypeHandler (type) {
	var handler = LIST_TYPES[type];

	if (!handler) throw new Error('Unsuported type of list: ' + type);

	return handler;
}

function listChannels (type, options) {
	var key = options.parent && options.parent.key;
	var secret = options.parent && options.parent.secret;
	var handler = _getListTypeHandler(type);

	try {
		listService.get(type, key, secret, handler);
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	action: listChannels,
	instruction: 'list <type>',
	description: 'list all application: channels, segments or named_users',
	options: [],
};