var assert = require('chai').assert;
var sinon = require('sinon');

var notificationService = require('../../services/notification');
var broadcastCommand = require('../../commands/push/broadcast');


describe('commands/broadcast', function () {
	describe('action', function () {
		it('should have a action function', function () {
			assert.typeOf(broadcastCommand, 'function');
		});

		it('should create a broadcast notification', function () {
			var payload = null;
			var notificationSend = sinon.stub(notificationService, 'send');
			var expectedPayload = {
				'audience': 'all',
				'device_types': ['ios', 'android'],
				'notification': {'alert': 'abc'},
			};		
		
			broadcastCommand('abc', {});

			payload = notificationSend.getCall(0).args[0];

			assert.equal(payload.audience, expectedPayload.audience);
			assert.deepEqual(payload.device_types, expectedPayload.device_types);
			assert.equal(payload.notification.alert, expectedPayload.notification.alert);
			
			notificationSend.restore();
		});

		it('should create a broadcast notification with segment', function () {
			var payload = null;
			var notificationSend = sinon.stub(notificationService, 'send');
			var expectedPayload = {
				'audience': { 'segment': 'segment-id' },
				'device_types': ['ios', 'android'],
				'notification': {'alert': 'abc'},
			};
			var options = { audience: 'segment=segment-id' };
		
			broadcastCommand('abc', options);

			payload = notificationSend.getCall(0).args[0];

			assert.equal(payload.audience.segment, expectedPayload.audience.segment);
			assert.deepEqual(payload.device_types, expectedPayload.device_types);
			assert.equal(payload.notification.alert, expectedPayload.notification.alert);
			
			notificationSend.restore();
		});

		it('should create a broadcast notification to target platform', function () {
			var payload = null;
			var notificationSend = sinon.stub(notificationService, 'send');
			var expectedPayload = {
				'audience': 'all',
				'device_types': ['ios'],
				'notification': {'alert': 'abc'},
			};
			var options = { platforms: 'ios' };
		
			broadcastCommand('abc', options);

			payload = notificationSend.getCall(0).args[0];

			assert.equal(payload.audience, expectedPayload.audience);
			assert.deepEqual(payload.device_types, expectedPayload.device_types);
			assert.equal(payload.notification.alert, expectedPayload.notification.alert);
			
			notificationSend.restore();
		});

		it('should define action handler', function () {
			var callbackHandler = null;
			var notificationSend = sinon.stub(notificationService, 'send');
		
			broadcastCommand('abc', {});

			callbackHandler = notificationSend.getCall(0).args[3];

			assert.typeOf(callbackHandler, 'function');
			
			notificationSend.restore();
		});

		it('should not define key and secret if no options was passed', function () {
			var key = null;
			var secret = null;
			var notificationSend = sinon.stub(notificationService, 'send');
		
			broadcastCommand('abc', {});

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

			broadcastCommand('abc', options);

			key = notificationSend.getCall(0).args[1];
			secret = notificationSend.getCall(0).args[2];

			assert.equal(key, expectedKey);
			assert.equal(secret, expectedSecret);
			
			notificationSend.restore();
		});
	});
});