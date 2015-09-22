app.controller('CardListController', function($scope, Cards, Notification){

    Cards.getCards().then(function(cards) {
    	$scope.cards = cards;
    });

    $scope.deleteCard = function(card) {

        Cards.deleteCard(card.front).then(function() {
        	return Cards.getCards();
        })
        .then(function(cards) {
        	$scope.cards = cards;

            Notification.primary('Deleted');
        });
    };

    $scope.editCard = function(card, index) {

        Cards.updateCard(card).then(function() {
            Notification.primary('Edited');
        });
    };
});