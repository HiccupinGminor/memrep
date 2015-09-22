app.controller('NewCardController', function($scope, Cards, $location, Notification){
  $scope.newCard = {};
  $scope.isCreated = false;
  
  $scope.addCard = function() {
    Cards.addCard($scope.newCard).then(function() {
	    $scope.newCard = '';

	    $scope.isCreated = true;

        Notification.primary('Created');
    });
  };
});