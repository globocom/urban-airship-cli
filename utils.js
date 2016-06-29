var colors = require('colors');
var program = require('commander');
var exec = require('child_process').exec;
var fs = require('fs');
var Q = require('q');

var arguments = process.argv;
var package = require('./package');

var stages = {
	pumpVersion: {
		action: function (data) {
			var deferred = Q.defer();
			var packageRaw = JSON.stringify(package, null, 2); 

			fs.writeFile('package.json', packageRaw.replace(data.oldVersion, data.newVersion), function (error) {
				if (error) deferred.reject({stage: stages.pumpVersion, data: data, message: error});

				console.log('version up:'.green, 'ok'.bold);
				
				deferred.resolve(data);
			});

			return deferred.promise;
		},

		onFailure: function (data) {
			var deferred = Q.defer();
			var packageRaw = JSON.stringify(package, null, 2); 

			fs.writeFile('package.json', packageRaw.replace(data.newVersion, data.oldVersion), function (error) {
				console.log('version revert:'.red, 'ok'.bold);
				
				deferred.resolve(data);
			});

			return deferred.promise;	
		},
	},

	commitVersion: {
		action: function (data) {
			var deferred = Q.defer();

			exec('git commit -m "version: pump version to ' + data.newVersion + '" package.json', function (error, stdout, stderr) {
				if (error) deferred.reject({stage: stages.commitVersion, data: data, message: error});
				
				console.log('commit package:'.green, 'ok'.bold);
				
				deferred.resolve(data);
			});

			return deferred.promise;	
		},

		onFailure: function (data) {
			var deferred = Q.defer();

			exec('git reset --soft HEAD~', function (error, stdout, stderr) {
				console.log('revert commit:'.red, 'ok'.bold);
				
				deferred.resolve(data);
			});

			return deferred.promise;	
		},
	},

	tagVersion: {
		action: function (data) {
			var deferred = Q.defer();
			var tagVersion = 'v' + data.newVersion;

			exec('git tag -m "' + tagVersion + '" ' + tagVersion, function (error, stdout, stderr) {
				if (error) deferred.reject({stage: stages.tagVersion, data: data, message: error});

				console.log('tag:'.green, 'ok'.bold);

				deferred.resolve(data);
			});

			return deferred.promise;	
		},

		onFailure: function (data) {
			var deferred = Q.defer();
			var tagVersion = 'v' + data.newVersion;

			exec('git tag --delete ' + tagVersion, function (error, stdout, stderr) {
				console.log('revert tag:'.red, 'ok'.bold);
				
				deferred.resolve(data);
			});

			return deferred.promise;
		},
	},

	pushRelease: {
		action: function (data) {
			var deferred = Q.defer();

			exec('git push origin --tags', function (error, stdout, stderr) {
				if (error) deferred.reject({stage: stages.pushRelease, data: data, message: error});

				console.log('push:'.green, 'ok'.bold);

				deferred.resolve(data);
			});

			return deferred.promise;	
		},

		onFailure: function (data) {
			var deferred = Q.defer();
			var tagVersion = 'v' + data.newVersion;
			
			exec('git push --delete origin ' + tagVersion, function (error, stdout, stderr) {
				console.log('pop release:'.red, 'ok'.bold);
				
				deferred.resolve(data);
			});

			return deferred.promise;
		},
	},

	publishVersion: {
		action: function (data) {
			var deferred = Q.defer();

			exec('npm publish', function (error, stdout, stderr) {
				if (error) deferred.reject({stage: stages.publishVersion, data: data, message: error});
		
				console.log('publish:'.green, 'ok'.bold);

				deferred.resolve(data);
			});

			return deferred.promise;
		},

		onFailure: function (data) {
			var deferred = Q.defer();
			
			exec('npm unpublish urban-airship-cli@' + data.newVersion, function (error, stdout, stderr) {
				console.log('unpublish:'.red, 'ok'.bold);
				
				deferred.resolve(data);
			});

			return deferred.promise;
		}
	},
};

function deployFailureHandler (error) {
	if (!error) return console.log('deploy success!');

	console.log('\nDeploy failed: reverting'.bold.red,
				error.data.oldVersion,
				'~>'.bold.red,
				error.data.newVersion,
				error.message,
				'\n');

	switch (error.stage) {
		case stages.pumpVersion:
				stages.pumpVersion.onFailure(error.data);
			break;

		case stages.commitVersion:
				stages.pumpVersion.onFailure(error.data)
					.then(stages.commitVersion.onFailure);
			break;
		
		case stages.tagVersion:
				stages.pumpVersion.onFailure(error.data)
					.then(stages.commitVersion.onFailure)
					.then(stages.tagVersion.onFailure);
			break;
			
		case stages.pushRelease:
				stages.pumpVersion.onFailure(error.data)
					.then(stages.commitVersion.onFailure)
					.then(stages.tagVersion.onFailure)
					.then(stages.pushRelease.onFailure);
			break;

		case stages.publishVersion:
				stages.pumpVersion.onFailure(error.data)
					.then(stages.commitVersion.onFailure)
					.then(stages.tagVersion.onFailure)
					.then(stages.pushRelease.onFailure)
					.then(stages.publishVersion.onFailure);
			break;
	}
}

program
	.command('deploy <version>')
	.description('version format: <major>.<minor>.<patch>')
	.action(function deploy (version) {
		var data = {};

		if (!version.match(/^[0-9]{1,2}.[0-9]{1,2}.[0-9]{1,2}$/)) {
			console.log('Invalid version format:'.bold.red, version);

			return program.outputHelp();
		}

		data.newVersion = version;
		data.oldVersion = package.version;
		data.newVersionNumber = Number(data.newVersion.split('.').join(''));
		data.oldVersionNumber = Number(data.oldVersion.split('.').join(''));
		
		if (data.oldVersionNumber > data.newVersionNumber) {
			return console.log('Invalid version: Old version is greater than the new version - '.bold.red,
								data.oldVersion,
								'>'.bold.red,
								data.newVersion);
		}

		console.log('Deploying:'.bold.green,
					data.oldVersion,
					'~>'.bold.green,
					data.newVersion,
					'\n');

		stages.pumpVersion.action(data)
			.then(stages.commitVersion.action)
			.then(stages.tagVersion.action)
			.then(stages.pushRelease.action)
			.then(stages.publishVersion.action)
			.catch(deployFailureHandler)
			.done();
	})

program.parse(arguments);
