'use strict';

angular.module('ChromeStorageModule', [])
	.service('ChromeStorageService', function($q) {

		try {
			var store = chrome.storage.sync;
		}
		catch(error) {
			// console.log(error);
		}


		this.all = function(key) {
			var deferred = $q.defer();

			store.get(null, function(items) {
				deferred.resolve(items);
			});

			return deferred.promise;
		};

		this.get = function(key) {
			
			var deferred = $q.defer();

			store.get(key, function(items) {
				deferred.resolve(items[key]);
			});

			return deferred.promise;
		};

		this.delete = function(key) {

			var deferred = $q.defer();

			store.remove(key, function() {
				deferred.resolve();
			});

			return deferred.promise;
		};

		this.set = function(key, value) {
			var data = {};
			data[key] = value;

			var deferred = $q.defer();

			store.set(data, function() {
				deferred.resolve();
			});

			return deferred.promise;
		};

		this.addTo = function(key, newValue) {
			
			var deferred = $q.defer();

			store.get(key, function(items) {

				if(typeof items[key] == 'undefined' || !Array.isArray(items[key])) { // Reset to an array
					items[key] = [];
				}

				items[key].push(newValue);

				store.set(items, function() {
					var lastError = chrome.runtime.lastError;
					// Callback on success or failure
					if(typeof lastError != 'undefined') {
						console.log(lastError);
					}
					else {
						deferred.resolve();
					}
				});
			});

			return deferred.promise;
		}
	});