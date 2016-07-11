function segmentActionHandler (error, response, body) {
	if (error) return console.log('Error: ', error);

	var responseJSON = JSON.parse(body);
	
	console.log('Segments:', responseJSON);
}

module.exports = segmentActionHandler;