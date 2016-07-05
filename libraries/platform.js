var PLATFORMS = ['ios', 'android', 'amazon', 'wns', 'mpns', 'blackberry'];
var DEFAULT_PLATFORMS = ['ios', 'android'];


function _parsePlatformsSource (source) {
	var platforms = [];
	var platform = null;
	var regexPlatforms = new RegExp(/(\w)+/g);   

	while((platform = regexPlatforms.exec(source)) !== null) {
		var platformName = platform[0];

		if (PLATFORMS.indexOf(platformName) >= 0) platforms.push(platformName);
		else throw new Error('Unsuported platform: ' + platformName);
	}

	return platforms;
}

function loadPlatforms (platforms_source) {
	if (!platforms_source) return DEFAULT_PLATFORMS;

	var platforms = _parsePlatformsSource(platforms_source);

	if (platforms.length) return platforms;

	return DEFAULT_PLATFORMS;
}

module.exports = {
	load: loadPlatforms,
};