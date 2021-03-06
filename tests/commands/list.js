var assert = require('chai').assert;
var sinon = require('sinon');

var listCommand = require('../../commands/list');
var listService = require('../../services/list');


describe('commands/list', function () {
	describe('instruction', function () {
		it('should have a instruction string', function () {
			assert.typeOf(listCommand.instruction, 'string');
			assert.equal(listCommand.instruction.length > 0, true);
		});
	});

	describe('description', function () {
		it('should have a description string', function () {
			assert.typeOf(listCommand.description, 'string');
			assert.equal(listCommand.description.length > 0, true);
		});
	});

	describe('action', function () {
		it('should have an action function', function () {
			assert.typeOf(listCommand.action, 'function');
		});

		it('should create request to list channels correctly', function () {
			var type = null;
			var channelsHandler = null
			var expectedType = 'channels'
			var listGet = sinon.stub(listService, 'get');

			listCommand.action('channels', {});

			type = listGet.getCall(0).args[0];
			channelsHandler = listGet.getCall(0).args[3];

			assert.equal(type, expectedType);
			assert.equal(channelsHandler.name, 'channelActionHandler');

			listGet.restore();
		});

		it('should create request to list segments correctly', function () {
			var type = null;
			var segmentsHandler = null
			var expectedType = 'segments'
			var listGet = sinon.stub(listService, 'get');

			listCommand.action('segments', {});

			type = listGet.getCall(0).args[0];
			segmentsHandler = listGet.getCall(0).args[3];

			assert.equal(type, expectedType);
			assert.equal(segmentsHandler.name, 'segmentActionHandler');

			listGet.restore();
		});

		it('should create request to list named users correctly', function () {
			var type = null;
			var namedUsersHandler = null
			var expectedType = 'named_users'
			var listGet = sinon.stub(listService, 'get');

			listCommand.action('named_users', {});

			type = listGet.getCall(0).args[0];
			namedUsersHandler = listGet.getCall(0).args[3];

			assert.equal(type, expectedType);
			assert.equal(namedUsersHandler.name, 'namedUsersActionHandler');

			listGet.restore();
		});

		it('should create request to list tags correctly', function () {
			var type = null;
			var tagsHandler = null
			var expectedType = 'tags'
			var listGet = sinon.stub(listService, 'get');

			listCommand.action('tags', {});

			type = listGet.getCall(0).args[0];
			tagsHandler = listGet.getCall(0).args[3];

			assert.equal(type, expectedType);
			assert.equal(tagsHandler.name, 'tagsActionHandler');

			listGet.restore();
		});

		it('should throw error if unsuported type passed', function () {
			assert.throws(function () {
				listCommand.action('unsuported', {});
			}, 'Unsuported type of list: unsuported');
		});

		it('should not define key and secret if no options was passed', function () {
			var key = null;
			var secret = null;
			var listGet = sinon.stub(listService, 'get');
		
			listCommand.action('channels', {});

			key = listGet.getCall(0).args[1];
			secret = listGet.getCall(0).args[2];

			assert.equal(key, undefined);
			assert.equal(secret, undefined);
			
			listGet.restore();
		});

		it('should define key and secret if options passed', function () {
			var key = null;
			var secret = null;
			var expectedKey = 'abc';
			var expectedSecret = '123';
			var listGet = sinon.stub(listService, 'get');

			var options = {
				parent: { 
					key: expectedKey, 
					secret: expectedSecret 
				} 
			}
		
			listCommand.action('channels', options);

			key = listGet.getCall(0).args[1];
			secret = listGet.getCall(0).args[2];

			assert.equal(key, expectedKey);
			assert.equal(secret, expectedSecret);
			
			listGet.restore();
		});
	});
});