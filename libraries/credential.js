function encodeCredential (credential) {
	return new Buffer(credential).toString('base64');
}

function loadCredential (program) {
	var secret = null;
	var key = null;
	var credential = null;

	if (program.secret) secret = program.secret;
	else if (process.env.URBAN_AIRSHIP_MASTER_SECRET) secret = process.env.URBAN_AIRSHIP_MASTER_SECRET;
	else throw new Error('application master key not defined');

	if (program.key) key = program.key;
	else if (process.env.URBAN_AIRSHIP_KEY) key = process.env.URBAN_AIRSHIP_KEY;
	else throw new Error('application key not defined');

	credential = key + ':' + secret;

	return credential;
}

module.exports = {
	encode: encodeCredential,
	load: loadCredential,
};