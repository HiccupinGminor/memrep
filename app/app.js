var app = angular.module('app', ['ChromeStorageModule', 'ngRoute']);

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