app.controller('CardListController', function($scope, Cards){

    Cards.getCards().then(function(cards) {
    	$scope.cards = cards;
    });

    $scope.deleteCard = function(card) {

        Cards.deleteCard(card.front).then(function() {
        	return Cards.getCards();
        })
        .then(function(cards) {
        	$scope.cards = cards;
        });

    };
});