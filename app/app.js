var app = angular.module('app', ['ChromeStorageModule', 'ngRoute', 'ui-notification', 'StorageModule']);

app.config(['$routeProvider', function($routeProvider){

	$routeProvider
		.when('/cards', {
			templateUrl: 'app/templates/CardListControllerTemplate.html',
			controller: 'CardListController'
		})
		.when('/review', {
			templateUrl: 'app/templates/QuizControllerTemplate.html',
			controller: 'QuizController',
		})
		.when('/new', {
			templateUrl: 'app/templates/NewCardTemplate.html',
			controller: 'NewCardController',
		})
		.otherwise({
			redirectTo: '/cards'
		});
}]);

app.config(function(NotificationProvider) {
	NotificationProvider.setOptions({
		delay: 1000
	});
});