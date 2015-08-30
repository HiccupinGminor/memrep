app.controller('NewCardController', function($scope, Cards, $location){
  $scope.newCard = {};
  $scope.isCreated = false;
  
  $scope.addCard = function() {
    Cards.addCard($scope.newCard).then(function() {
	    $scope.newCard = '';

	    $scope.isCreated = true;
    });
  };
});