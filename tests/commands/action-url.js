var assert = require('chai').assert;
var sinon = require('sinon');

var notificationService = require('../../services/notification');
var actionUrlCommand = require('../../commands/push/action-url');


describe('commands/action-url', function () {
	describe('action', function () {
		it('should have a action function', function () {
			assert.typeOf(actionUrlCommand, 'function');
		});

		it('should create a url action notification', function () {
			var payload = null;
			var notificationSend = sinon.stub(notificationService, 'send');
			var expectedPayload = {
				'audience': 'all',
				'device_types': ['ios', 'android'],
				'notification': {
					'alert': 'abc',
					'actions': {
						'open': {
							'type': 'url',
							'content': 'url',
						},
					},
				},
			};		

			actionUrlCommand('abc', 'url', {});

			payload = notificationSend.getCall(0).args[0];


			assert.equal(payload.audience, expectedPayload.audience);
			assert.deepEqual(payload.device_types, expectedPayload.device_types);
			assert.equal(payload.notification.alert, expectedPayload.notification.alert);
			assert.equal(payload.notification.actions.open.type,
						 expectedPayload.notification.actions.open.type);
			assert.equal(payload.notification.actions.open.content,
						 expectedPayload.notification.actions.open.content);
			
			notificationSend.restore();
		});

		it('should create a url action notification with segment', function () {
			var payload = null;
			var notificationSend = sinon.stub(notificationService, 'send');
			var expectedPayload = {
				'audience': { 'segment': 'segment-id' },
				'device_types': ['ios', 'android'],
				'notification': {
					'alert': 'abc',
					'actions': {
						'open': {
							'type': 'url',
							'content': 'url',
						},
					},
				},
			};	
			var options = { audience: 'segment=segment-id' };
		
			actionUrlCommand('abc', 'url', options);

			payload = notificationSend.getCall(0).args[0];


			assert.equal(payload.audience.segment, expectedPayload.audience.segment);
			assert.deepEqual(payload.device_types, expectedPayload.device_types);
			assert.equal(payload.notification.alert, expectedPayload.notification.alert);
			assert.equal(payload.notification.actions.open.type,
						 expectedPayload.notification.actions.open.type);
			assert.equal(payload.notification.actions.open.content,
						 expectedPayload.notification.actions.open.content);
			
			notificationSend.restore();
		});

		it('should create a url action notification to target platform', function () {
			var payload = null;
			var notificationSend = sinon.stub(notificationService, 'send');
			var expectedPayload = {
				'audience': 'all',
				'device_types': ['android'],
				'notification': {
					'alert': 'abc',
					'actions': {
						'open': {
							'type': 'url',
							'content': 'url',
						},
					},
				},
			};
			var options = { platforms: 'android' };
		
			actionUrlCommand('abc', 'url', options);

			payload = notificationSend.getCall(0).args[0];


			assert.equal(payload.audience, expectedPayload.audience);
			assert.deepEqual(payload.device_types, expectedPayload.device_types);
			assert.equal(payload.notification.alert, expectedPayload.notification.alert);
			assert.equal(payload.notification.actions.open.type,
						 expectedPayload.notification.actions.open.type);
			assert.equal(payload.notification.actions.open.content,
						 expectedPayload.notification.actions.open.content);
			
			notificationSend.restore();
		});

		it('should not define key and secret if no options was passed', function () {
			var key = null;
			var secret = null;
			var notificationSend = sinon.stub(notificationService, 'send');
		
			actionUrlCommand('abc', 'url', {});

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
			};

			actionUrlCommand('abc', 'url', options);

			key = notificationSend.getCall(0).args[1];
			secret = notificationSend.getCall(0).args[2];

			assert.equal(key, expectedKey);
			assert.equal(secret, expectedSecret);
			
			notificationSend.restore();
		});
	});
});