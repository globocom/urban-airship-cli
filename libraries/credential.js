function encodeCredential (credential) {
	return new Buffer(credential).toString('base64');
}

function createCredential (key, secret) {
	var credential = null;

	if (key && secret) credential = key + ':' + secret;

	return credential;
}

function loadCredentialFromEnv () {
	var credential = null;
	var key = process.env.URBAN_AIRSHIP_KEY;
	var secret = process.env.URBAN_AIRSHIP_MASTER_SECRET;
	
	if (key && secret) credential = key + ':' + secret;

	return credential;
}

module.exports = {
	encode: encodeCredential,
	loadFromEnv: loadCredentialFromEnv,
	create: createCredential,
};