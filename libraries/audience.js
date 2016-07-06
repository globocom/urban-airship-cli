var DEFAULT_AUDIENCE = 'all';

function _parseAudienceSource (source) {
	var audienceObject = source.split('=');
	
	return {
		type: audienceObject[0],
		value: audienceObject[1]
	};
}

function _validateAudienceValue (value) {
	if (!value || !value.length) throw new Error('Invalid audience value: ' + value);

	return value;
}

function loadAudience (audience_source) {
	var audience = null;
	
	if (!audience_source) return DEFAULT_AUDIENCE;

	audience = _parseAudienceSource(audience_source);

	switch (audience.type) {
		case 'segment':
			return {'segment': _validateAudienceValue(audience.value)};
			break;

		case 'android_channel':
			return {'android_channel': _validateAudienceValue(audience.value)};
			break;

		case 'ios_channel':
			return {'ios_channel': _validateAudienceValue(audience.value)};
			break;

		case 'named_user':
			return {'named_user': _validateAudienceValue(audience.value)};
			break;

		case 'all':
			return DEFAULT_AUDIENCE;
			break;

		default:
			return DEFAULT_AUDIENCE;
			break;
	}
}

module.exports = {
	load: loadAudience,
};