function namedUsersActionHandler (error, response, body) {
	if (error) return console.log('Error: ', error);

	var responseJSON = JSON.parse(body);
	
	console.log('Named Users:', responseJSON);
}

module.exports = namedUsersActionHandler;