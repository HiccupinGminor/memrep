var app = angular.module('app', ['LocalStorageModule', 'ngRoute']);

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
		.when('/', {
			templateUrl: 'app/templates/MenuTemplate.html',
		})
		.otherwise({
			redirectTo: '/'
		});
}]);