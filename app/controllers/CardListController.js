app.controller('CardListController', function($scope, Cards){

    $scope.cards = Cards.getCards();

    $scope.deleteCard = function(card) {
        var cards = Cards.deleteCard(card);

        $scope.cards = cards;
    };
});