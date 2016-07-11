var listService = require('../../services/list');
var listChannelsHandler = require('./channels');
var listSegmentsHandler = require('./segments');
var listNamedUsersHandler = require('./named-users');


var LIST_TYPES = {
	channels: listChannelsHandler,
	segments: listSegmentsHandler,
	named_users: listNamedUsersHandler,
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