'use strict';

angular.module('StorageModule', ['ChromeStorageModule', 'LocalStorageModule'])
    .service('LocalStorageAdapter', function($q, localStorageService) {
        var storage = localStorageService;

        this.all = function() {
            var results, deferred;
            var keys = storage.keys();
            deferred = $q.defer();

            results = keys.map(function(key) {
                return storage.get(key);
            });

            deferred.resolve(results);

            return deferred.promise;
        };

        this.get = function(key) {
            var deferred = $q.defer();

            deferred.resolve(storage.get(key));

            return deferred.promise;
        }

        this.set = function(key, value) {
            var deferred = $q.defer();

            deferred.resolve(storage.set(key, value));

            return deferred.promise;
        };

        this.delete = function(key) {
            var deferred = $q.defer();

            deferred.resolve(storage.remove(key));

            return deferred.promise;
        }
        //
        //this.addTo = store.addTo(key, newValue);
    })
    .service('StorageService', function(ChromeStorageService, LocalStorageAdapter) {
        var store;

        try {
            chrome && chrome.storage.sync;
            store = ChromeStorageService; // If chrome storage is available, use chrome
        }
        catch(error) {
            store = LocalStorageAdapter; // Else back up to angular local storage
        }

        this.all = function() {
            return store.all();
        };

        this.get = function(key) {
            return store.get(key);
        };

        this.set = function(key, value) {
            return store.set(key, value);
        };

        this.addTo = function(key, newValue) {
            return store.addTo(key, newValue);
        };

        this.delete = function(key) {
            return store.delete(key);
        };
    });