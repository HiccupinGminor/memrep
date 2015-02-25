app.controller('NewCardController', function($scope, Cards){

    $scope.newCard = {};

    $scope.addCard = function() {

        $scope.$parent.cards = Cards.addCard($scope.newCard);

        $scope.newCard = '';
    };
});