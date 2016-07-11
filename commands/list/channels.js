function channelActionHandler (error, response, body) {
	if (error) return console.log('Error: ', error);

	var responseJSON = JSON.parse(body);
	
	console.log('Channels:', responseJSON);
}

module.exports = channelActionHandler;