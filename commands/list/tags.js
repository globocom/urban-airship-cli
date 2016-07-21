function tagsActionHandler (error, response, body) {
	if (error) return console.log('Error: ', error);

	var responseJSON = JSON.parse(body);
	
	console.log('Tags:', responseJSON);
}

module.exports = tagsActionHandler;