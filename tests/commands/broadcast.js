var assert = require('chai').assert;
var sinon = require('sinon');

var notificationService = require('../../services/notification');
var broadcastCommand = require('../../commands/broadcast');


describe('commands/broadcast', function () {
	describe('instruction', function () {
		it('should have a instruction string', function () {
			assert.typeOf(broadcastCommand.instruction, 'string');
			assert.equal(broadcastCommand.instruction.length > 0, true);
		});
	});

	describe('description', function () {
		it('should have a description string', function () {
			assert.typeOf(broadcastCommand.description, 'string');
			assert.equal(broadcastCommand.description.length > 0, true);
		});
	});

	describe('action', function () {
		it('should have a action function', function () {
			assert.typeOf(broadcastCommand.action, 'function');
		});

		it('should create a broadcast notification', function () {
			var payload = null;
			var notificationSend = sinon.stub(notificationService, 'send');
			var expectedPayload = {
				'audience': 'all',
				'device_types': 'all',
				'notification': {'alert': 'abc'},
			};		
		
			broadcastCommand.action('abc', {});

			payload = notificationSend.getCall(0).args[0];

			assert.equal(payload.audience, expectedPayload.audience);
			assert.equal(payload.device_types, expectedPayload.device_types);
			assert.equal(payload.notification.alert, expectedPayload.notification.alert);
			
			notificationSend.restore();
		});

		it('should define action handler', function () {
			var callbackHandler = null;
			var notificationSend = sinon.stub(notificationService, 'send');
		
			broadcastCommand.action('abc', {});

			callbackHandler = notificationSend.getCall(0).args[3];

			assert.typeOf(callbackHandler, 'function');
			
			notificationSend.restore();
		});

		it('should not define key and secret if no options was passed', function () {
			var key = null;
			var secret = null;
			var notificationSend = sinon.stub(notificationService, 'send');
		
			broadcastCommand.action('abc', {});

			key = notificationSend.getCall(0).args[1];
			secret = notificationSend.getCall(0).args[2];

			assert.equal(key, undefined);
			assert.equal(secret, undefined);
			
			notificationSend.restore();
		});


		it('should define key and secret if options was passed', function () {
			var key = null;
			var secret = null;
			var expectedKey = 'abc';
			var expectedSecret = '123';
			var notificationSend = sinon.stub(notificationService, 'send');
			
			var options = {
				parent: { 
					key: expectedKey, 
					secret: expectedSecret 
				} 
			}

			broadcastCommand.action('abc', options);

			key = notificationSend.getCall(0).args[1];
			secret = notificationSend.getCall(0).args[2];

			assert.equal(key, expectedKey);
			assert.equal(secret, expectedSecret);
			
			notificationSend.restore();
		});
	});
});